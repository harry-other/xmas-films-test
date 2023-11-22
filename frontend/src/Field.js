import styles from "./Field.module.css";

export default function Field({ id, labelText, children, errorList = [] }) {
  return (
    <div className={styles.main}>
      <label className={styles.label} htmlFor={id}>
        {labelText}
      </label>
      {children}
      {errorList.length > 0 && (
        <ul className={styles.errors}>
          {errorList.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
