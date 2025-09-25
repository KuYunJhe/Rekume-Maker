import { useState } from "react";
// import classNames from "classnames";

import styles from "../styles/OperationUI.module.css";

import OperateBar from "../components/OperateBar.jsx";
import InputArea from "../components/InputArea.jsx";

export default function OperationUI() {

    const [currentType, setCurrentType] = useState("Profile"); 
  // 當前輸入欄位模式 (Profile, Experience, etc.)

  return (
    <>
      <div className={styles.container}>
        <InputArea currentType={currentType} />
        <OperateBar setCurrentType={setCurrentType} />
      </div>
    </>
  );
}
