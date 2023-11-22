import styles from "./BreadCrumb.module.css";
import { AppContext } from "./App";
import LinkWithQuery from "./LinkWithQuery";

import { FILMS, OPTIONS, DETAILS } from "./App";

import classNames from "classnames";
import { useContext } from "react";

function Item({ url, screen, matchScreen, children }) {
  const classes = classNames({
    [styles.item]: true,
    [styles.active]: screen === matchScreen,
  });
  if (url === undefined) {
    return <span className={classes}>{children}</span>;
  }
  return (
    <LinkWithQuery to={url} className={classes}>
      {children}
    </LinkWithQuery>
  );
}

export default function BreadCrumb({ screen }) {
  const { filmSlug } = useContext(AppContext);
  let optionsUrl;
  if (filmSlug !== undefined) {
    optionsUrl = `/films/${filmSlug}`;
  }

  return (
    <div className={styles.main}>
      <Item url="/" screen={screen} matchScreen={FILMS}>
        Choose a film
      </Item>
      <Item url={optionsUrl} screen={screen} matchScreen={OPTIONS}>
        Choose when
      </Item>
      <Item screen={screen} matchScreen={DETAILS}>
        Confirm your selection
      </Item>
    </div>
  );
}
