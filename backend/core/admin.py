from django.contrib import admin

from . import models
from .filters import HasReservationFilter
from .forms import ReservationForm


@admin.register(models.AccessCode)
class AccessCodeAdmin(admin.ModelAdmin):
    search_fields = ["value"]
    list_display = ["value", "valid_for", "max_usages"]
    list_select_related = ["valid_for"]


@admin.register(models.Cinema)
class CinemaAdmin(admin.ModelAdmin):
    search_fields = ["name", "slug"]
    list_display = ["name", "slug"]


@admin.register(models.Film)
class FilmAdmin(admin.ModelAdmin):
    list_display = ["name", "live"]


@admin.register(models.Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_select_related = ["screening__film", "screening__cinema", "access_code"]
    autocomplete_fields = ["access_code", "screening"]
    exclude = ["emails", "tickets"]
    list_filter = ["screening__film"]
    list_display = [
        "email",
        "name",
        "created_at",
        "quantity",
    ]
    search_fields = [
        "name",
        "email",
        "access_code__value",
        "reservation_id",
    ]
    form = ReservationForm


@admin.register(models.Screening)
class ScreeningAdmin(admin.ModelAdmin):
    list_display = [
        "starts_at",
        "capacity",
    ]
    list_select_related = ["film", "cinema"]
    search_fields = ["film__name", "cinema__name"]
    list_filter = ["film"]


@admin.register(models.Ticket)
class TicketAdmin(admin.ModelAdmin):
    search_fields = [
        "code",
        "reservation__name",
        "reservation__email",
        "reservation__access_code__value",
        "reservation__reservation_id",
    ]
    list_display = ["code", "film"]
    list_select_related = [
        "film",
        "reservation__screening",
        "reservation__access_code",
        "reservation__screening__film",
        "reservation__screening__cinema",
    ]
    autocomplete_fields = ["reservation"]
    list_filter = ["film", HasReservationFilter]
