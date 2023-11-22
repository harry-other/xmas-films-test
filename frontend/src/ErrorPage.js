import styles from "./ErrorPage.module.css";
import LinkWithQuery from "./LinkWithQuery";
import { useRouteError } from "react-router-dom";
import * as Sentry from "@sentry/browser";
import { useEffect } from "react";

export default function ErrorPage({ body = "This page cannot be found." }) {
  let error = useRouteError();

  useEffect(() => {
    if (error) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className={styles.main}>
      <h2 className={styles.heading}>Sorry!</h2>
      <div className={styles.body}>
        <p>{body}</p>
        <p>
          Please click{" "}
          <LinkWithQuery className={styles.link} to="/">
            here
          </LinkWithQuery>{" "}
          to go to the homepage
        </p>
      </div>
    </div>
  );
}
