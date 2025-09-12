import { useState } from "react";
import classNames from "classnames";

import styles from "../styles/InputArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import LeftArea from "../components/LeftArea.jsx";
import RightArea from "../components/RightArea.jsx";
import CenterArea from "../components/CenterArea.jsx";
import ResumeItemCollection from "../models/containData";

export default function InputArea() {
  const [resumeCollection] = useState(new ResumeItemCollection());

  const [currentType, setCurrentType] = useState("個人資訊");

  const handleTypeChange = (type) => {
    setCurrentType(type);
  };

  return (
    <>
      <div className={styles.container}>
        <LeftArea />
        <CenterArea />
        <RightArea />
      </div>
    </>
  );
}
