import { useState } from "react";
import classNames from "classnames";

import styles from "../styles/OperationUI.module.css";
import styles_Glass from "../styles/Glass.module.css";

import OperateBar from "../components/OperateBar.jsx";
import InputArea from "../components/InputArea.jsx";

export default function OperationUI() {
  return (
    <>
      <div className={styles.container}>
        <InputArea/>
        <OperateBar />
      </div>
    </>
  );
}
