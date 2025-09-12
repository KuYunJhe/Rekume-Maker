import { useState } from "react";
import classNames from "classnames";

import styles from "../styles/DeskBoard.module.css";
import styles_Glass from "../styles/Glass.module.css";

import Background from "../components/Background.jsx";
import PreviewSpace from "../components/PreviewSpace.jsx";

export default function DeskBoard() {
  return (
    <>
      <div className={styles.container}>
        <Background />
        <PreviewSpace />
      </div>
    </>
  );
}
