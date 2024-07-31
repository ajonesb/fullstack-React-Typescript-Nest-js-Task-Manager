import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!); // The '!' is a non-null assertion
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
