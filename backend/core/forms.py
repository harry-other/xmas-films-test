from django import forms
from django.db import models
from django.db.models.functions import Coalesce

from .models import Reservation


class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = "__all__"

    def clean(self):
        cleaned_data = super().clean()
        quantity = cleaned_data.get("quantity")
        screening = cleaned_data.get("screening")
        if self.instance and quantity and screening:
            screening_reservations = (
                Reservation.objects.filter(screening=screening)
                .exclude(id=self.instance.id)
                .aggregate(total_quantity=Coalesce(models.Sum("quantity"), 0))
            )

            if screening_reservations["total_quantity"] + quantity > screening.capacity:
                self.add_error("quantity", "Not enough seats available to make this change")
