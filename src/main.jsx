import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import 'normalize.css';
import "./styles/reset.css";
import "./styles/Reset_CSS.css";
import "./styles/base_css.css";

import ResumeItemCollection from "./models/containData.jsx";
import General from "./components/General.jsx";

import OperationUI from "./components/OperationUI.jsx";
import DeskBoard from "./components/DeskBoard.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <General /> */}
    <DeskBoard />
    <OperationUI />
  </StrictMode>
);
