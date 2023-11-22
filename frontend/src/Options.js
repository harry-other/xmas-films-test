import { AppContext, OPTIONS } from "./App";
import { useContext, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import SelectField from "./SelectField";
import FilmDetails from "./FilmDetails";
import Form from "./Form";
import FormBlock from "./FormBlock";
import HeadingsBlock from "./HeadingsBlock";
import LocationSearchField from "./LocationSearchField";
import ScreeningResults from "./ScreeningResults";
import { useLoaderData } from "react-router-dom";
import { valueify } from "./utils";

export default function Options() {
  const { filmSlug } = useContext(AppContext);
  const { film, screenings, cinemas } = useLoaderData();
  const [chosenCinema, setChosenCinema] = useState(null);
  const [chosenQuantity, setChosenQuantity] = useState(null);
  const [showQuantityError, setShowQuantityError] = useState(false);

  const cinemasWithSoldOut = cinemas.map((cinema) => {
    const hasScreenings = screenings.some((screening) => {
      return (
        screening.cinemaSlug === cinema.slug &&
        screening.filmSlug === filmSlug &&
        screening.soldOut === false
      );
    });
    return {
      ...cinema,
      soldOut: !hasScreenings,
    };
  });

  const cinemasExcludingSoldOut = cinemasWithSoldOut.filter((cinema) => {
    return !cinema.soldOut;
  });

  const screeningResults = screenings.filter((screening) => {
    // eslint-disable-next-line
    return (
      screening.cinemaSlug === chosenCinema && screening.filmSlug === filmSlug
    );
  });

  return (
    <>
      <HeadingsBlock heading="When do you want to watch?" />
      <BreadCrumb screen={OPTIONS} />
      <FormBlock image={film.image2} copyright={film.copyright}>
        <FilmDetails
          title={film.name}
          releaseDate={film.releaseDate}
          genre={film.genre}
          runningTime={film.runningTime}
          certificate={film.certificate}
          description={film.description}
        />
        <Form>
          <SelectField
            id="quantity"
            labelText="How many tickets?"
            errorList={showQuantityError ? ["Please choose a quantity"] : []}
            value={valueify(chosenQuantity)}
            options={[1, 2, 3, 4].map((index) => {
              return { value: index, text: index };
            })}
            onChange={(event) => {
              if (event.target.value !== "") {
                setShowQuantityError(false);
              }
              setChosenQuantity(event.target.value);
            }}
          />
          <SelectField
            id="cinema"
            labelText="Choose a cinema"
            value={valueify(chosenCinema)}
            options={cinemasWithSoldOut.map((cinema) => {
              const option = {
                value: cinema.slug,
                text: cinema.name,
              };
              if (cinema.soldOut) {
                option.disabled = true;
                option.text += " (sold out)";
              }
              return option;
            })}
            onChange={(event) => {
              setChosenCinema(event.target.value);
            }}
          />
          <LocationSearchField
            cinemas={cinemasExcludingSoldOut}
            setChosenCinema={setChosenCinema}
          />
          {screeningResults.length > 0 && (
            <ScreeningResults
              chosenQuantity={chosenQuantity}
              screeningResults={screeningResults}
              setShowQuantityError={setShowQuantityError}
            />
          )}
        </Form>
      </FormBlock>
    </>
  );
}
