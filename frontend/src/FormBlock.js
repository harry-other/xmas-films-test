import styles from "./FormBlock.module.css";

export default function FormBlock({ copyright, image, children }) {
  return (
    <div className={styles.main}>
      <div>
        <img
          className={styles.image}
          src={image}
          width="810"
          height="1200"
          alt=""
        />
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
