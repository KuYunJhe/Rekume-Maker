import { useState } from "react";
import classNames from "classnames";

import styles from "../styles/InputArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import LeftArea from "../components/LeftArea.jsx";
import RightArea from "../components/RightArea.jsx";


export default function InputArea() {
  return (
    <>
      <div className={styles.container}>
        <LeftArea />
        <RightArea />
      </div>
    </>
  );
}
