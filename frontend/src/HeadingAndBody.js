import styles from "./HeadingAndBody.module.css";

export default function HeadingAndBody({ heading, children }) {
  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>{heading}</h2>
      {children}
    </div>
  );
}
