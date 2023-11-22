import styles from "./Button.module.css";
import classNames from "classnames";

export default function Button({
  onClick,
  disabled,
  solid,
  large,
  header,
  children,
  className,
}) {
  return (
    <button
      className={classNames({
        [styles.main]: true,
        [styles.solid]: solid,
        [styles.header]: header,
        [styles.large]: large,
        [className]: true,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
