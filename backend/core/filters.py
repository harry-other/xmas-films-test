from django.contrib import admin


class HasReservationFilter(admin.SimpleListFilter):
    title = "Has reservation"
    parameter_name = "has_reservation"

    def lookups(self, request, model_admin):
        return (
            ("yes", "Yes"),
            ("no", "No"),
        )

    def queryset(self, request, queryset):
        if self.value() == "yes":
            return queryset.filter(reservation__isnull=False)
        if self.value() == "no":
            return queryset.filter(reservation__isnull=True)
