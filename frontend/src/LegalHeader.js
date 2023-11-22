import styles from "./LegalHeader.module.css";

export default function LegalHeader({ children }) {
  return <div className={styles.main}>{children}</div>;
}
