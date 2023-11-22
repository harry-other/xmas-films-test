import os

from django.apps import apps
from django.conf import settings
from django.core import management
from django.core.management.base import BaseCommand

from .utils import get_fixture_models

forward_relations = [
    "ForeignKey",
    "OneToOneField",
    "ParentalKey",
]
reverse_relations = [
    "OneToOneRel",
    "ManyToOneRel",
    "ManyToManyRel",
]


def get_model_class_from_label(label):
    label_split = label.split(".")
    app_label = label_split[0]
    model_name = label_split[1]
    model_class = apps.get_model(app_label=app_label, model_name=model_name)
    return model_class


def get_fixture_model_classes():
    results = []
    for label in get_fixture_models():
        model_class = get_model_class_from_label(label)
        results.append(model_class)

    return results


def field_is_forward_relation(field):
    return type(field).__name__ in forward_relations


def field_is_reverse_relation(field):
    return type(field).__name__ in reverse_relations


def field_is_relation(field):
    return field_is_forward_relation(field) or field_is_reverse_relation(field)


def get_dependency_graph(model_class, include_third_party=False):
    """
    Returns a dependancy graph featuring the supplied model_class and anything it depends on
    """

    def crawl(model_class, tree, cyclical=False):
        if include_third_party or model_class in model_classes:
            label = model_class._meta.label
            tree[label] = {}
            for field in model_class._meta.get_fields():
                if field_is_forward_relation(field):
                    if not cyclical:
                        crawl(
                            field.related_model,
                            tree[label],
                            cyclical=field.related_model == model_class,
                        )

    tree = {}
    model_classes = get_fixture_model_classes()
    crawl(model_class, tree)
    return tree


def dependency_graph_items_to_list(graph):
    """
    Adds the items in a dependency graph to the supplied list, in order
    (so dependent items first, followed by items with the dependecies)
    """

    def crawl(graph):
        keys = sorted(graph.keys())
        for key in keys:
            if key not in seen_keys:
                value = graph[key]
                # For models that have a relation to themselves, the dependancy
                # graph will look like this:

                # {
                #     "ModelA": {
                #         "ModelB": {
                #             "ModelC": {},
                #         },
                #         "ModelA": {},
                #     }
                # }
                # Note the inner ModelA has no further dependencies, as recursion is
                # halted at a single repetition via the cyclical flag in get_dependency_graph
                # seen_keys is used to keep a track of encountered models BEFORE
                # recursion occurs, enabling us to forgoe consideration of any
                # inner instances should they present themselves, and instead use
                # outer instance - plus its attendant depdencies - to drive ordering of
                # the results

                seen_keys.append(key)
                if value.keys():
                    crawl(value)

                if key not in results:
                    results.append(key)

    seen_keys = []
    results = []
    crawl(graph)
    return results


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        results = []
        model_classes = get_fixture_model_classes()
        for model_class in model_classes:
            dependency_graph = get_dependency_graph(model_class)
            graph_items_as_list = dependency_graph_items_to_list(dependency_graph)
            graph_items_deduped = [item for item in graph_items_as_list if item not in results]
            results.extend(graph_items_deduped)

        failed = []
        skipped = []

        for result in results:
            file_name = result.lower()
            file_path = f"{settings.BACKEND_DIR}/project/fixtures/{file_name}.json"
            if os.path.exists(file_path):
                self.stdout.write(file_name)
                try:
                    management.call_command("loaddata", file_path)
                except Exception as exc:
                    print(exc)
                    failed.append(file_name)
            else:
                skipped.append(file_name)

        if skipped:
            self.stdout.write(f"No fixtures files found for : {', '.join(skipped)}")
        if failed:
            self.stdout.write(self.style.ERROR(f"Fixture failed for : {', '.join(failed)}"))
