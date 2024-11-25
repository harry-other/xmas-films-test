from django.db import models


class ScreeningQuerySet(models.QuerySet):
    def with_sold_out(self) -> models.QuerySet:
        """
        Annotates each Screening instance with a 'sold_out' boolean field. The 'sold_out' field is
        True if the total reserved quantity is greater than or equal to the screening's capacity.
        """

        return self.annotate(
            total_reserved=models.Sum('reservation__quantity')
        ).annotate(
            sold_out=models.Case(
                models.When(total_reserved__gte=models.F('capacity'), then=models.Value(True)),
                default=models.Value(False),
                output_field=models.BooleanField()
            )
        )
