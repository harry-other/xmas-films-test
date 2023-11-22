import styles from "./Header.module.css";
import Button from "./Button";
import LinkWithQuery from "./LinkWithQuery";
import { useNavigate } from "react-router-dom";
import logo from "./images/wreath-logo-floating.png";

export default function Header({ showBackButton, showFaqButton }) {
  const navigate = useNavigate();

  return (
    <header className={styles.main}>
      <LinkWithQuery to="/" className={styles.link}>
        <img src={logo} alt="" className={styles.logo} />
      </LinkWithQuery>
      <div className={styles.buttons}>
        {showFaqButton && (
          <LinkWithQuery to="/help" className={styles.faqButton}>
            <Button solid header>
              Need help?
            </Button>
          </LinkWithQuery>
        )}
        {showBackButton && (
          <Button
            solid
            header
            className={styles.backButton}
            onClick={(event) => {
              event.preventDefault();
              navigate(-1);
            }}
          >
            Back
          </Button>
        )}
      </div>
    </header>
  );
}
