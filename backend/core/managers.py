from django.db import models, transaction
from django.core.exceptions import ValidationError


class ReservationsManager(models.Manager):
    def create(self, **kwargs) -> models.Model:
        """
        Custom create method to ensure that the total quantity of reservations for a screening does not exceed the
        capacity of the screening. Also ensures that the validators are run on the model.
        """
        screening = kwargs.get("screening")
        quantity = kwargs.get("quantity")

        reservation = self.model(**kwargs)
        reservation.full_clean()

        with transaction.atomic():
            reservations = self.filter(screening=screening).select_for_update()

            if reservations.exists():
                total_reserved = reservations.aggregate(models.Sum("quantity"))["quantity__sum"]
                if total_reserved + quantity > screening.capacity:
                    raise ValidationError("Sorry, there are not enough tickets available for this screening")

            return super().create(**kwargs)
