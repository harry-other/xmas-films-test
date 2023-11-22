import styles from "./HeadingsBlock.module.css";

export default function HeadingsBlock({ heading }) {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>{heading}</h1>
      <h2 className={styles.subHeading}>
        <p>
          We want to thank you for continuing to shop with us at Tesco, so
          here's an exclusive festive experience on us. Simply choose a
          Christmas film to watch at your local Cineworld cinema and receive up
          to 4 free tickets for the family.
        </p>
      </h2>
    </div>
  );
}
