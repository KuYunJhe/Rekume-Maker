import { useState } from "react";

import OperationUI from "../components/OperationUI.jsx";
import DeskBoard from "../components/DeskBoard.jsx";

export default function General() {

  return (
    <>
      <DeskBoard />
      <OperationUI/>
    </>
  );
}
