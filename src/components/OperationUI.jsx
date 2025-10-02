import { useState } from "react";

import styles from "../styles/OperationUI.module.css";

import OperateBar from "../components/OperateBar.jsx";
import InputArea from "../components/InputArea.jsx";

export default function OperationUI() {
  const [currentType, setCurrentType] = useState("Profile");
  // 當前輸入欄位模式 (Profile, Experience, etc.)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.OperateBar_container}>
          <OperateBar setCurrentType={setCurrentType} />
        </div>
        <div className={styles.InputArea_container}>
          <InputArea currentType={currentType} />
        </div>
      </div>
    </>
  );
}
