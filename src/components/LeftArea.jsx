import { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "../styles/LeftArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import InputField from "./InputField";
import { fieldSchemas } from "../models/fieldSchemas.jsx";

export default function LeftArea({ currentType, onChange, initialData }) {
  // 根據 currentType 取得對應的欄位設定
  const schema = fieldSchemas[currentType] || [];

  // 欄位內容狀態
  const [InputContent, setInputContent] = useState({});

  useEffect(() => {
    // 如果有既有資料就用既有資料，否則初始化空值
    const init = {};
    schema.forEach((field) => {
      init[field.name] = initialData[0]?.[field.name] || "";
    });
    setInputContent(init);
  }, [currentType, initialData]);

  // 處理欄位變更，把更新後的表單資料傳給父元件
  const handleFieldChange = (name, value) => {
    const updatedInputContent = { ...InputContent, [name]: value };
    setInputContent(updatedInputContent);
    onChange(updatedInputContent);

    console.log("LeftArea form data:", updatedInputContent);
  };

  return (
    <>
      <div className={classNames(styles.container)}>
        {schema.map((field) => (
          <div
            key={field.name}
            className={classNames(
              styles_Glass.glassMaterial,
              styles.inputBlock
            )}
          >
            <label className={classNames(styles.label)}>{field.label}</label>
            <InputField
              field={field}
              value={InputContent[field.name]}
              onChange={handleFieldChange}
            />
          </div>
        ))}
      </div>
    </>
  );
}
