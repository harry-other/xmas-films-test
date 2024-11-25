import random
import csv

from django.core.management.base import BaseCommand
from django.db import transaction, IntegrityError

from core.models import AccessCode

BATCH_SIZE = 5


class Command(BaseCommand):
    help = "Generate random access codes"

    def add_arguments(self, parser) :
        parser.add_argument("count", type=int)

    def _generate_access_code(self) -> str:
        code = "".join(random.choices("BCDFGHJKLMNPQRSTVWXYZ0123456789", k=16))
        return f"{code[:4]}-{code[4:8]}-{code[8:12]}-{code[12:]}"

    def _add_to_db(self, access_codes: set) -> bool:
        with transaction.atomic():
            try:
                AccessCode.objects.bulk_create([AccessCode(value=code) for code in access_codes], batch_size=BATCH_SIZE)
            except IntegrityError:
                return False
        return True

    def _create_and_write_batch(self, writer: csv.writer, batch_size: int) -> None:
        created_batch = False
        while not created_batch:
            access_codes = {self._generate_access_code() for _ in range(batch_size)}
            created_batch = self._add_to_db(access_codes)
            if created_batch:
                writer.writerows([[code] for code in access_codes])

    def handle(self, *args, **options) -> None:

        count = options["count"]

        amount_of_batches = count // BATCH_SIZE
        remaining_codes = count % BATCH_SIZE

        with open("access_codes.csv", "w") as f:
            writer = csv.writer(f)
            writer.writerow(["value"])

            for _ in range(amount_of_batches):
                self._create_and_write_batch(writer=writer, batch_size=BATCH_SIZE)

            if remaining_codes > 0:
                self._create_and_write_batch(writer=writer, batch_size=remaining_codes)

        self.stdout.write(self.style.SUCCESS(f"Successfully generated {count} access codes"))
