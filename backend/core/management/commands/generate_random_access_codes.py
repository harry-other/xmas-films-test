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

    def generate_access_code(self) -> str:
        code = "".join(random.choices("BCDFGHJKLMNPQRSTVWXYZ0123456789", k=16))
        return f"{code[:4]}-{code[4:8]}-{code[8:12]}-{code[12:]}"

    def add_to_db(self, access_codes: set) -> bool:
        with transaction.atomic():
            try:
                AccessCode.objects.bulk_create([AccessCode(value=code) for code in access_codes], batch_size=BATCH_SIZE)
            except IntegrityError:
                return False
        return True

    def handle(self, *args, **options) -> None:

        count = options["count"]

        amount_of_batches = count // BATCH_SIZE

        with open("access_codes.csv", "w") as f:
            writer = csv.writer(f)
            writer.writerow(["value"])
            for _ in range(amount_of_batches):
                created_batch = False
                while not created_batch:
                    access_codes = set()
                    while len(access_codes) < BATCH_SIZE:
                        code = self.generate_access_code()
                        access_codes.add(code)
                    created_batch = self.add_to_db(access_codes)

                    if created_batch:
                        for code in access_codes:
                            writer.writerow([code])

        self.stdout.write(self.style.SUCCESS(f"Successfully generated {count} access codes"))
