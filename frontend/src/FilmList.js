import FilmItem from "./FilmItem";
import styles from "./FilmList.module.css";

export default function FilmList({ films }) {
  if (films.length === 0) {
    return (
      <p className={styles.comingSoon}>
        Sorry, there are no films available for this access code
      </p>
    );
  }
  return (
    <div className={styles.main}>
      {films.map((film, index) => {
        return <FilmItem key={index} film={film} />;
      })}
    </div>
  );
}
