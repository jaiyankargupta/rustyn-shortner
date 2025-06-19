import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./router/MainRouter.jsx";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserProvider>
      <MainRouter></MainRouter>
    </UserProvider>
  </BrowserRouter>
);
