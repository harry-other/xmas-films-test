import BreadCrumb from "./BreadCrumb";
import HeadingsBlock from "./HeadingsBlock";
import FilmList from "./FilmList";
import { AppContext, FILMS } from "./App";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import HeadingAndBody from "./HeadingAndBody";

export default function Films() {
  const { films } = useLoaderData();
  const { accessCode } = useContext(AppContext);

  if (accessCode === null) {
    return (
      <HeadingAndBody heading="Sorry!">
        <p>You need an access code for this website.</p>
        <p>
          Please click on the link you were sent in your email, this will
          contain your unique code
        </p>
      </HeadingAndBody>
    );
  }

  return (
    <>
      <HeadingsBlock heading="Tesco Christmas Movie Nights" />
      <BreadCrumb screen={FILMS} />
      <FilmList films={films} />
    </>
  );
}
