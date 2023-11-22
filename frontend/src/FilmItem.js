import styles from "./FilmItem.module.css";
import LinkWithQuery from "./LinkWithQuery";

export default function FilmItem({ film }) {
  const Element = film.soldOut ? "span" : LinkWithQuery;

  return (
    <Element to={`/films/${film.slug}`} className={styles.main}>
      <div className={styles.image}>
        {film.soldOut && (
          <div className={styles.soldOut}>
            <span>Sold Out</span>
          </div>
        )}
        <img src={film.image1} alt="" width="1200" height="750" />
      </div>
      <div className={styles.details}>
        <span className={styles.name}>
          <h3>{film.name}</h3>
          <span>{film.certificate}</span>
        </span>
        <p className={styles.info}>
          <span>{film.releaseDate}</span>
          <span>{film.genre}</span>
          <span>{film.runningTime}</span>
        </p>
        <p className={styles.date}>Showing : {film.showingFrom}</p>
      </div>
    </Element>
  );
}
