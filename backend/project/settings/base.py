"""
Base settings
"""

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


# Paths

# repo/backend/project/settings
SETTINGS_DIR = Path(__file__).resolve().parent
# repo/backend/project
PROJECT_DIR = SETTINGS_DIR.parent
# repo/backend
BACKEND_DIR = PROJECT_DIR.parent


# General

ENV = os.environ.get("ENV", "local")
SECRET_KEY = os.environ.get("SECRET_KEY", "SECRET_KEY")
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
X_FRAME_OPTIONS = "SAMEORIGIN"


# Host, domain, origin
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "http://localhost:8000").split(",")
CANONICAL_HOST = ALLOWED_HOSTS[0]
if "localhost" in CANONICAL_HOST:
    SCHEME = "http"
else:
    SCHEME = "https"
ORIGIN = f"{SCHEME}://{CANONICAL_HOST}"
DOMAIN = os.environ.get("DOMAIN", "localhost:8000")


# Application definition

THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
]

LOCAL_APPS = [
    "core",
]

CORE_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.forms",
]

INSTALLED_APPS = LOCAL_APPS + THIRD_PARTY_APPS + CORE_APPS


MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [PROJECT_DIR / "templates"],
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "loaders": [
                (
                    "django.template.loaders.cached.Loader",
                    [
                        "django.template.loaders.filesystem.Loader",
                        "django.template.loaders.app_directories.Loader",
                    ],
                )
            ],
        },
    },
]

WSGI_APPLICATION = "project.wsgi.application"


# Password validation

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# I18N

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/London"
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static

STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]
STATIC_ROOT = BACKEND_DIR / "staticfiles"
STATIC_URL = "/static/"


# Media

MEDIA_ROOT = BACKEND_DIR / "media"
MEDIA_URL = "/media/"


# Email

DEFAULT_FROM_EMAIL = f"info@{DOMAIN}"
SERVER_EMAIL = f"server@{DOMAIN}"


# Auth

LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"
SESSION_COOKIE_AGE = 60 * 60 * 24
PASSWORD_RESET_TIMEOUT = 60 * 60


# django-cors-headers

CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "http://localhost:3000").split(",")
