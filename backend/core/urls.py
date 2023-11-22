from django.urls import path

from rest_framework.routers import SimpleRouter
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

router = SimpleRouter()
router.register(r"films", views.FilmViewSet, basename="film")
router.register(r"cinemas", views.CinemaViewSet, basename="cinema")
router.register(r"screenings", views.ScreeningViewSet, basename="screening")

urlpatterns = [
    path("reservations/", views.ReservationCreateView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns) + router.urls
