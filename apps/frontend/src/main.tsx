import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { route } from "./routes.tsx";
import "./lib/i18n";
import "./index.css";
import React from "react";
import axios from "axios";

axios.defaults.baseURL = "https://book-it-app-six.vercel.app";

const routes = createBrowserRouter(route);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
