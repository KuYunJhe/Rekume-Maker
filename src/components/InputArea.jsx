import { useState } from "react";
import classNames from "classnames";

import styles from "../styles/InputArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import LeftArea from "../components/LeftArea.jsx";
import RightArea from "../components/RightArea.jsx";
import CenterArea from "../components/CenterArea.jsx";
import { myResume, ResumeItemCollection } from "../models/containData.jsx";

import { fieldSchemas } from "../models/fieldSchemas.jsx";

export default function InputArea() {
  // const [resumeCollection] = useState(new ResumeItemCollection());
  const [resumeCollection] = useState(myResume);

  const [currentType, setCurrentType] = useState("Profile"); // 當前輸入欄位模式 (Profile, Work, etc.)

  // 取得當前類型的既有資料
  const existingData = resumeCollection.getByType(currentType);

  // console.log("InputArea existingData:", existingData);

  const handleTypeChange = (type) => {
    setCurrentType(type);
  };

  function handleLeftChange(data) {
    // 範例：將目前表單暫存成 ResumeItem（或更新選中的 item）
    // resumeCollection.add(data) 或 resumeCollection.update(...)
    // console.log("left data:", data);
  }

  return (
    <>
      <div>
        <form className={classNames(styles_Glass.glass, styles.container)}>
          <LeftArea
            currentType={currentType}// 當前輸入欄位模式 (Profile, Work, etc.)
            onChange={handleLeftChange}// 當輸入欄位變更時的回調
            DataOfCurrentType={existingData}// 傳入當前類型的既有資料
          />
          {/* <CenterArea currentType={currentType} />
          <RightArea currentType={currentType} /> */}
        </form>
      </div>
    </>
  );
}
