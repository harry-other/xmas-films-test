import { formatDateTime } from "./utils";
import styles from "./ScreeningResults.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "./App";

export default function ScreeningResults({
  screeningResults,
  setShowQuantityError,
  chosenQuantity,
}) {
  const { filmSlug } = useContext(AppContext);
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <div>
      <h4 className={styles.label}>Screenings</h4>
      <div className={styles.results}>
        {screeningResults.map((screening) => {
          const dateTime = new Date(screening.startsAt);
          const dateTimeFormatted = formatDateTime(dateTime);
          return (
            <Button
              solid
              key={screening.id}
              onClick={(event) => {
                event.preventDefault();
                if (chosenQuantity === null) {
                  setShowQuantityError(true);
                } else {
                  navigate(
                    `/films/${filmSlug}/${screening.cinemaSlug}/${screening.timeSlug}/${chosenQuantity}${search}`
                  );
                }
              }}
            >
              {dateTimeFormatted}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
