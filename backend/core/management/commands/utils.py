from django.apps import apps
from django.conf import settings


def get_fixture_models():
    model_labels = []
    exclude = [
        "core.reservation",
    ]

    for app in settings.LOCAL_APPS:
        models = apps.get_app_config(app).get_models()
        for model in models:
            label = model._meta.label_lower
            if label not in exclude:
                model_labels.append(label)
    return model_labels
