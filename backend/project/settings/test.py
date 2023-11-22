"""
Test settings
"""
import os

from .base import *  # noqa
from .base import BACKEND_DIR, SETTINGS_DIR

# General

DEBUG = True
ALLOWED_HOSTS = ["*"]
ENV = "test"


# Database

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": SETTINGS_DIR / "test_db.sqlite3",
        "TEST": {
            "NAME": SETTINGS_DIR / "pytest_db.sqlite3",
        },
    },
}


# Email

EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
EMAIL_FILE_PATH = BACKEND_DIR / "sent_emails"
DEFAULT_FROM_EMAIL = "info@test.com"


# Logging

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
    },
    "loggers": {
        "": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
        },
    },
}
