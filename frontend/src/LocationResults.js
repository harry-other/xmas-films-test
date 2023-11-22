import Button from "./Button";
import styles from "./LocationResults.module.css";

export default function LocationResults({ setChosenCinema, nearbyCinemas }) {
  return (
    <div>
      <h4 className={styles.label}>Nearest cinemas</h4>
      <div className={styles.results}>
        {nearbyCinemas.map((cinema) => {
          const distance = cinema.distance.toFixed(1);
          return (
            <div key={cinema.id} className={styles.result}>
              <Button
                solid
                onClick={(event) => {
                  event.preventDefault();
                  setChosenCinema(cinema.slug);
                }}
              >
                {cinema.name}
              </Button>
              <span>{distance} miles</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
