import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  maxBreadcrumbs: 50,
  debug: process.env.NODE_ENV === "development",
  environment: process.env.REACT_APP_ENV || "development",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
