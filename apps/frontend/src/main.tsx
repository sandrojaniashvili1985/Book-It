import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from "./routes.tsx";
import "./lib/i18n";
import "./index.css";
import React from "react";

const routes = createBrowserRouter(route);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
