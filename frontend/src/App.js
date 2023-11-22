import { filmsLoader, optionsLoader, detailsLoader } from "./loaders";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useParams,
} from "react-router-dom";
import { createContext, useState } from "react";
import Confirmation from "./Confirmation";
import Details from "./Details";
import Films from "./Films";
import ForceError from "./ForceError";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import FAQs from "./FAQs";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import Header from "./Header";
import Options from "./Options";
import styles from "./App.module.css";
import { ScrollRestoration, useLocation } from "react-router-dom";

export const FILMS = "FILMS";
export const OPTIONS = "OPTIONS";
export const DETAILS = "DETAILS";
export const CONFIRMATION = "CONFIRMATION";

const searchParams = new URLSearchParams(window.location.search);

let code = searchParams.get("code") || null;

if (code !== null) {
  code = code.split("?")[0];
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage body="An error has occured" />,
    Component: Root,
    children: [
      {
        index: true,
        loader: filmsLoader,
        Component: Films,
      },
      {
        path: "terms-and-conditions",
        Component: TermsAndConditions,
      },
      {
        path: "privacy-policy",
        Component: PrivacyPolicy,
      },
      {
        path: "help",
        Component: FAQs,
      },
      {
        path: "error",
        Component: ForceError,
      },
      {
        path: "films/:filmSlug",
        loader: optionsLoader,
        Component: Options,
      },
      {
        path: "films/:filmSlug/:cinemaSlug/:timeSlug/:quantity",
        loader: detailsLoader,
        Component: Details,
      },
      {
        path: "films/:filmSlug/:cinemaSlug/:timeSlug/:quantity/:reservationId",
        loader: detailsLoader,
        Component: Confirmation,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

export const AppContext = createContext();

export default function App() {
  return <RouterProvider router={router} />;
}

function Root() {
  const { filmSlug, cinemaSlug, timeSlug, quantity } = useParams();
  const location = useLocation();

  const [accessCode, setAccessCode] = useState(code || null);

  const notHome = location.pathname !== "/";
  const notDone = location.pathname.indexOf("/done") === -1;
  const notFAQ = location.pathname.indexOf("/help") === -1;

  const showBackButton = notHome && notDone && accessCode !== null;
  const showFaqButton = notFAQ;

  return (
    <AppContext.Provider
      value={{
        filmSlug,
        cinemaSlug,
        timeSlug,
        accessCode,
        quantity,
        setAccessCode,
      }}
    >
      <ScrollRestoration />
      <div className={styles.main}>
        <div className={styles.content}>
          <Header
            showBackButton={showBackButton}
            showFaqButton={showFaqButton}
          />
          <Outlet />
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}
