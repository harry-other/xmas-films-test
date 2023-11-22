import { API_URL, BASE_ERROR } from "./constants";
import { AppContext, DETAILS } from "./App";
import { formatDateTime } from "./utils";
import { useState, useContext } from "react";
import BreadCrumb from "./BreadCrumb";
import Button from "./Button";
import camelcaseKeys from "camelcase-keys";
import DetailsHeader from "./DetailsHeader";
import fieldStyles from "./Field.module.css";
import Form from "./Form";
import FormBlock from "./FormBlock";
import HeadingsBlock from "./HeadingsBlock";
import InputField from "./InputField";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { valueify } from "./utils";
import CheckboxField from "./CheckboxField";

export default function Details() {
  const {
    accessCode,
    setAccessCode,
    filmSlug,
    cinemaSlug,
    timeSlug,
    quantity,
  } = useContext(AppContext);
  const { film, cinema, screening } = useLoaderData();
  const [errors, setErrors] = useState({});
  const [showAccessCode, setShowAccessCode] = useState(accessCode === null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailAgain, setEmailAgain] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    if (email !== emailAgain) {
      setErrors({ emailAgain: ["Email addresses do not match"] });
      return;
    }
    const formData = new FormData(event.target);
    let response;
    try {
      response = await fetch(API_URL + "/reservations/", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      setErrors({ nonFieldErrors: [BASE_ERROR] });
      return;
    }
    if (response.status === 201) {
      const data = await response.json();
      navigate(
        `/films/${filmSlug}/${cinemaSlug}/${timeSlug}/${quantity}/${data.reservation_id}`
      );
      return;
    }

    try {
      let data = await response.json();
      data = camelcaseKeys(data, { deep: true });
      for (const key in data) {
        if (!["name", "email", "accessCode", "quantity"].includes(key)) {
          if (data.nonFieldErrors === undefined) {
            data.nonFieldErrors = [];
          }
          for (const error of data[key]) {
            data.nonFieldErrors.push(`${key}: ${error}`);
          }
        }
      }
      setErrors(data);
      if (data.accessCode !== undefined) {
        setShowAccessCode(true);
      }
      if (data.quantity !== undefined) {
        setErrors({ nonFieldErrors: data.quantity });
      }
    } catch (error) {
      setErrors({ nonFieldErrors: [BASE_ERROR] });
    }
  }

  return (
    <>
      <HeadingsBlock heading="Confirm your selection" />
      <BreadCrumb screen={DETAILS} />
      <FormBlock image={film.image2} copyright={film.copyright}>
        <DetailsHeader
          name={film.name}
          quantity={quantity}
          cinema={cinema.name}
          address={cinema.address}
          dateTime={formatDateTime(new Date(screening.startsAt))}
        />
        <Form onSubmit={handleSubmit}>
          {showAccessCode ? (
            <InputField
              labelText="Access Code (this will be in your email)"
              id="accessCode"
              name="access_code"
              value={valueify(accessCode)}
              onChange={(event) => {
                setAccessCode(event.target.value);
              }}
              errorList={errors.accessCode}
            />
          ) : (
            <input type="hidden" name="access_code" value={accessCode} />
          )}
          <input type="hidden" name="quantity" value={quantity} />
          <InputField
            id="name"
            name="name"
            autoComplete="name"
            errorList={errors.name}
            labelText="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <InputField
            id="email"
            name="email"
            autoComplete="email"
            errorList={errors.email}
            labelText="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <InputField
            id="email"
            name="email"
            autoComplete="email"
            errorList={errors.emailAgain}
            labelText="Confirm email"
            value={emailAgain}
            onChange={(event) => {
              setEmailAgain(event.target.value);
            }}
          />
          {errors.nonFieldErrors !== undefined && (
            <ul className={fieldStyles.errors}>
              {errors.nonFieldErrors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          )}
          <input
            type="hidden"
            name="screening"
            value={`${filmSlug}-${cinemaSlug}-${timeSlug}`}
          />
          <Button type="submit" solid large>
            Get my tickets
          </Button>
        </Form>
      </FormBlock>
    </>
  );
}
