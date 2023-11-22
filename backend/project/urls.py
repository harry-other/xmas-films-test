from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.views.defaults import page_not_found, server_error

from core.urls import urlpatterns as core_urls

urlpatterns = [
    path("404/", page_not_found, {"exception": "Page not found"}),
    path("500/", server_error),
    path("admin/", admin.site.urls),
    path("api/", include(core_urls)),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [
            path("__debug__/", include(debug_toolbar.urls)),
        ] + urlpatterns
