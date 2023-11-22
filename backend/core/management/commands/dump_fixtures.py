import os
from io import StringIO

from django.conf import settings
from django.core import management
from django.core.management.base import BaseCommand

from core.management.commands.load_fixtures import get_model_class_from_label

from .utils import get_fixture_models


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        fixture_models = get_fixture_models()
        for model_label in fixture_models:
            model_class = get_model_class_from_label(model_label)
            if model_class.objects.count():
                buffer = StringIO()
                management.call_command(
                    "dumpdata",
                    "--indent=4",
                    "--natural-foreign",
                    model_label,
                    stdout=buffer,
                )
                buffer.seek(0)
                path = os.path.join(
                    settings.BACKEND_DIR, "project", "fixtures", f"{model_label}.json"
                )
                with open(path, "w", encoding="utf-8") as file:
                    file.write(buffer.read())
                self.stdout.write(f"Fixture saved for app {model_label}")
