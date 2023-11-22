import styles from "./FilmDetails.module.css";
import { useState } from "react";

export default function FilmDetails({
  title,
  releaseDate,
  certificate,
  genre,
  runningTime,
  description,
}) {
  const [showTruncated, setShowTruncated] = useState(false);

  const descriptionSplit = description.split(" ");
  let isLong = descriptionSplit.length > 70;

  description =
    isLong && !showTruncated
      ? descriptionSplit.slice(0, 60).join(" ")
      : description;

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.certificate}>{certificate}</span>
      </div>
      <p className={styles.info}>
        <span>{releaseDate}</span>
        <span>{genre}</span>
        <span>{runningTime}</span>
      </p>
      <p className={styles.description}>
        {description}
        {isLong && (
          <button
            className={styles.showMore}
            onClick={() => {
              setShowTruncated(!showTruncated);
            }}
          >
            {showTruncated ? "...show less" : "...show more"}
          </button>
        )}
      </p>
    </div>
  );
}
