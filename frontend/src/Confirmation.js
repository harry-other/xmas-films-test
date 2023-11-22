import styles from "./Confirmation.module.css";
import { formatDateTime } from "./utils";
import { useLoaderData } from "react-router-dom";

export default function Confirmation() {
  const { film, cinema, screening, quantity, reservationId } = useLoaderData();
  return (
    <div className={styles.main}>
      <h1 className={styles.film}>{film.name}</h1>
      <h2 className={styles.date}>
        {quantity} x {formatDateTime(new Date(screening.startsAt))}
      </h2>
      <p className={styles.cinema}>Cineworld {cinema.name}</p>
      <p>Thank you for your booking, an email is on its way</p>
      <p>Reservation ID : {reservationId}</p>
    </div>
  );
}
