import React from "react";
import ReactDOM from "react-dom/client";

import {
  RouterProvider,
} from "react-router-dom";

import { router } from "./routes";

import { LanguageProvider } from "./i18n/LanguageContext";

import "./styles/global.scss";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </React.StrictMode>
);
