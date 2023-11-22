import camelcaseKeys from "camelcase-keys";
import { API_URL } from "./constants";

const cache = {};

export async function filmsLoader({ request }) {
  const [films, cinemas, screenings] = await Promise.all([
    getAll(request.signal, "films"),
    getAll(request.signal, "cinemas"),
    getAll(request.signal, "screenings"),
  ]);
  return { films, cinemas, screenings };
}

export async function optionsLoader({ request, params }) {
  const film = await getOne(request.signal, "films", params.filmSlug);
  const cinemas = await getAll(request.signal, "cinemas");
  const screenings = await getAll(request.signal, "screenings");
  return {
    film,
    cinemas,
    screenings,
  };
}

export async function detailsLoader({ request, params }) {
  const screening = await getOne(
    request.signal,
    "screenings",
    `${params.filmSlug}-${params.cinemaSlug}-${params.timeSlug}`
  );
  const film = await getOne(request.signal, "films", screening.filmSlug);
  const cinema = await getOne(request.signal, "cinemas", screening.cinemaSlug);
  const quantity = params.quantity;
  let reservationId = params.reservationId || null;
  if (reservationId) {
    reservationId = reservationId.replace(/[^a-z0-9]/gi, "");
  }

  return {
    film,
    cinema,
    screening,
    quantity,
    reservationId,
  };
}

async function getAll(signal, type) {
  const url = `${API_URL}/${type}/`;
  if (cache[url]) {
    return cache[url];
  }
  const data = await getData(signal, url);
  if (cache[url] === undefined) {
    cache[url] = data;
  }
  return data;
}

async function getOne(signal, type, id) {
  const url = `${API_URL}/${type}/${id}/`;
  if (cache[url]) {
    return cache[url];
  }
  const data = await getData(signal, url);
  if (cache[url] === undefined) {
    cache[url] = data;
  }
  return data;
}

async function getData(signal, url) {
  let response;
  try {
    response = await fetch(url, {
      signal,
    });
  } catch (error) {
    console.log("Could not load", error);
    throw new Error("Could not load", url);
  }
  if (response.status !== 200) {
    throw new Error("Not found", url);
  }
  try {
    const data = await response.json();
    return camelcaseKeys(data);
  } catch (error) {
    console.log("Could not parse", error);
    throw new Error("Could not parse", url);
  }
}
