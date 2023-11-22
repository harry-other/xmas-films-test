"""
Production settings
"""

import os

import dj_database_url

from project.settings.base import *  # noqa
from project.settings.base import MIDDLEWARE

# General

DEBUG = os.environ.get("DEBUG") == "True"


# DB

db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES = {"default": db_from_env}


# Middleware

MIDDLEWARE = MIDDLEWARE + ["whitenoise.middleware.WhiteNoiseMiddleware"]


# Static

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# Media

DEFAULT_FILE_STORAGE = "django_s3_storage.storage.S3Storage"
AWS_REGION = os.environ["AWS_REGION"]
AWS_S3_BUCKET_NAME = os.environ["AWS_S3_BUCKET_NAME"]
AWS_ACCESS_KEY_ID = os.environ["AWS_ACCESS_KEY"]
AWS_SECRET_ACCESS_KEY = os.environ["AWS_SECRET_ACCESS_KEY"]
AWS_S3_SECURE_URLS = True
AWS_S3_BUCKET_AUTH = False
AWS_S3_MAX_AGE_SECONDS = 60 * 60 * 24 * 365


# Access and security

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SAMESITE = None
CSRF_COOKIE_SAMESITE = None
SECURE_HSTS_SECONDS = 60 * 60 * 24


# Logging

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
        "null": {
            "class": "logging.NullHandler",
        },
    },
    "loggers": {
        "": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "WARNING"),
        },
    },
}
