import { ReactComponent as Logo } from "./images/tesco-logo-mono.svg";
import styles from "./Footer.module.css";
import LinkWithQuery from "./LinkWithQuery";

export default function Footer() {
  return (
    <footer className={styles.main}>
      <Logo className={styles.logo} />
      <div className={styles.links}>
        <LinkWithQuery to="/terms-and-conditions">
          Terms and conditions
        </LinkWithQuery>
        <LinkWithQuery to="/privacy-policy">Privacy policy</LinkWithQuery>
        <LinkWithQuery to="/help">FAQs</LinkWithQuery>
      </div>
    </footer>
  );
}
