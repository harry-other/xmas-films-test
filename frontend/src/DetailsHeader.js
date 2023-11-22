import styles from "./DetailsHeader.module.css";

export default function DetailsHeader({
  name,
  quantity,
  cinema,
  address,
  dateTime,
}) {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>You have chosen</h2>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.details}>
        <p>{quantity} Tickets</p>
        <p>Cineworld {cinema}</p>
        <p>{address}</p>
        <p>{dateTime}</p>
      </div>
    </div>
  );
}
