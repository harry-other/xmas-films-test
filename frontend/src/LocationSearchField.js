import Field from "./Field";

import { haversineDistance } from "./utils";
import { Loader } from "@googlemaps/js-api-loader";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import LocationResults from "./LocationResults";
import styles from "./LocationSearchField.module.css";

// NB Previous API keys have been deleted as this project is no longer live
const PRODUCTION_API_KEY = "XXX";
const LOCAL_API_KEY = "XXX";

const API_KEY =
  process.env.NODE_ENV === "production" ? PRODUCTION_API_KEY : LOCAL_API_KEY;

const ERROR_TEXT = "Could not find location";

async function loadMaps() {
  if (!window?.google?.maps) {
    return await new Loader({
      apiKey: API_KEY,
      version: "weekly",
      libraries: ["core", "maps", "geocoding"],
    }).importLibrary("core");
  }
}

export default function LocationSearchField({ cinemas, setChosenCinema }) {
  const [search, setSearch] = useState("");
  const [searchSubmitting, setSearchSubmitting] = useState(false);
  const [nearbyCinemas, setNearbyCinemas] = useState([]);
  const [searchError, setSearchError] = useState("");
  const geocoderRef = useRef(null);

  useEffect(() => {
    async function loadGeocoder() {
      try {
        await loadMaps();
        const { Geocoder } = await window.google.maps.importLibrary(
          "geocoding"
        );
        geocoderRef.current = new Geocoder();
      } catch (error) {
        console.error(error);
      }
    }
    loadGeocoder();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setSearchSubmitting(true);
    setSearchError("");
    let data;
    try {
      data = await geocoderRef.current.geocode({ address: search });
    } catch (error) {
      setNearbyCinemas([]);
      setSearchError(ERROR_TEXT);
    }
    setSearchSubmitting(false);
    if (data === undefined) return;
    if (data.results.length > 0) {
      const location = data.results[0]?.geometry?.location;
      if (location) {
        const lat = location.lat();
        const lng = location.lng();
        const withDistances = cinemas.map((cinema) => {
          const distance = haversineDistance(lat, lng, cinema.lat, cinema.lng);
          return { ...cinema, distance };
        });
        withDistances.sort((a, b) => {
          return a.distance - b.distance;
        });
        setNearbyCinemas(withDistances.slice(0, 3));
      } else {
        setSearchError(ERROR_TEXT);
      }
    } else {
      setSearchError(ERROR_TEXT);
    }
  }
  return (
    <>
      <Field
        id="search"
        labelText="Search by location"
        errorList={searchError === "" ? [] : [searchError]}
      >
        <div className={styles.main}>
          <input
            id="search"
            value={search}
            onChange={(event) => {
              const value = event.target.value;
              setSearch(value);
              if (value === "") {
                setSearchError("");
                setSearch("");
                setNearbyCinemas([]);
              }
            }}
            placeholder="Town, postcode etc."
          ></input>
          <Button
            onClick={handleSearch}
            disabled={search === "" || searchSubmitting}
          >
            Submit
          </Button>
        </div>
      </Field>
      {nearbyCinemas.length > 0 && (
        <LocationResults
          setChosenCinema={(cinema) => {
            setNearbyCinemas([]);
            setChosenCinema(cinema);
          }}
          nearbyCinemas={nearbyCinemas}
        />
      )}
    </>
  );
}
