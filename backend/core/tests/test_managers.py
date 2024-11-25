import pytest
from django.core.exceptions import ValidationError

from core.models import Reservation


@pytest.mark.django_db
def test_create_reservation__capacity_exists(create_screening, create_reservation):
    # Arrange
    screening = create_screening(capacity=1)

    # Act
    reservation = create_reservation(screening=screening, quantity=1)

    # Assert
    assert reservation.quantity == 1
    assert reservation.screening == screening


@pytest.mark.django_db
def test_create_reservation__capacity_does_not_exist(create_screening, create_reservation):
    # Arrange
    screening = create_screening(capacity=1)
    _first_reservation = create_reservation(screening=screening, quantity=1)

    # Act & Assert
    with pytest.raises(ValidationError):
        _second_reservation = create_reservation(screening=screening, quantity=1)


@pytest.mark.django_db
def test_create_reservation__quantity_exceeds_max_limit(create_screening, create_reservation):
    # Arrange
    screening = create_screening(capacity=1)
    max_quantity_on_quantity_field = Reservation._meta.get_field("quantity").validators[0].limit_value

    # Act & Assert
    with pytest.raises(ValidationError):
        _reservation = create_reservation(screening=screening, quantity=max_quantity_on_quantity_field + 1)
