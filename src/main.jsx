import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.css";
import "./styles/Reset_CSS.css";
import "./styles/base_css.css";

import General from "./components/General.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <General />
  </StrictMode>
);
