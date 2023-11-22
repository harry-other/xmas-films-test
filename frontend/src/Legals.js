import styles from "./Legals.module.css";
import classNames from "classnames";

export default function Legals({ children, className }) {
  return <div className={classNames(styles.main, className)}>{children}</div>;
}
