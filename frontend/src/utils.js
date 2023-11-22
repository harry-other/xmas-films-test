export function valueify(value) {
  if (value === null) {
    return "";
  }
  return value;
}

export function formatTime(dateTime) {
  function z(n) {
    return (n < 10 ? "0" : "") + n;
  }
  var h = dateTime.getHours();
  return (
    (h % 12 || 12) +
    ":" +
    z(dateTime.getMinutes()) +
    " " +
    (h < 12 ? "am" : "pm")
  );
}

export function formatDate(dateTime) {
  return dateTime.toLocaleDateString("en-gb", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateTime) {
  if (!(dateTime instanceof Date)) {
    return "N/A";
  }
  const dateStr = formatDate(dateTime);
  const timeStr = formatTime(dateTime);
  return `${dateStr} ${timeStr}`;
}

export function haversineDistance(lat1, lng1, lat2, lng2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = lat1 * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = lat2 * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (lng2 - lng1) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return d;
}
