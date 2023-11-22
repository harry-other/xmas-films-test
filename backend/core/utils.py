from django.utils.timezone import get_default_timezone


def tz_date(date):
    time_zone = get_default_timezone()
    return date.astimezone(time_zone)


def tz_date_formatted(date):
    return tz_date(date).strftime("%a %d %b, %H:%M")
