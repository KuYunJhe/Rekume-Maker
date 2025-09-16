import { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "../styles/LeftArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import { InputField, InputDescriptField } from "./InputField";
import { fieldSchemas } from "../models/fieldSchemas.jsx";

export default function LeftArea({ currentType, onChange, DataOfCurrentType }) {
  // 根據 currentType 取得對應的欄位設定
  const schema = fieldSchemas[currentType] || [];
  const [InputContent, setInputContent] = useState([]);

  // InputContent 讀取 DataOfCurrentType 資料，當 currentType 或 DataOfCurrentType 改變時，更新 InputContent
  useEffect(() => {
    // 比較 DataOfCurrentType 和 InputContent 是否相同
    const isDifferent =
      JSON.stringify(DataOfCurrentType) !== JSON.stringify(InputContent);

    if (isDifferent) {
      if (Array.isArray(DataOfCurrentType) && DataOfCurrentType.length > 0) {
        // 遍歷 DataOfCurrentType，為每個 item 建立對應的 InputContent 結構
        const init = DataOfCurrentType.map((item) => {
          const InputContentItemData = {};

          schema.forEach((field) => {
            InputContentItemData[field.name] = item[field.name] || "";
          });

          return InputContentItemData;
        });

        setInputContent(init);
      } else {
        setInputContent([{}]);
      }
    }
  }, [currentType, DataOfCurrentType, schema]);

  // 處理欄位變更，把更新後的 InputContent 傳給父元件，用來更新 Data
  const handleFieldChange = (name, value, itemIndex) => {
    const updatedInputContent = [...InputContent];
    updatedInputContent[itemIndex] = {
      ...updatedInputContent[itemIndex],
      [name]: value,
    };
    setInputContent(updatedInputContent);
    onChange(updatedInputContent);
  };

  return (
    <div className={classNames(styles.container)}>
      {InputContent.map((item, itemIndex) => (

        <div key={`item-${itemIndex}`} className={styles.itemContainer}>
          {schema.map((field) => {
            // 處理 descriptItems
            if (field.name === "descriptItems") {
              return (
                <div key={`${itemIndex}-${field.name}`}>
                  <InputDescriptField
                    field={field}
                    value={item[field.name] || ""}
                    onChange={(name, value) =>
                      handleFieldChange(name, value, itemIndex)
                    }
                  />

                  <button
                    type="button"
                    onClick={() => {
                      const newDescItems = [...(item.descriptItems || []), ""];
                      handleFieldChange(
                        "descriptItems",
                        newDescItems,
                        itemIndex
                      );
                    }}
                  >
                    新增描述項目
                  </button>
                </div>
              );
            }

            // 一般欄位的處理
            return (
              <div
                key={`${itemIndex}-${field.name}`}
                className={classNames(
                  styles_Glass.glassMaterial,
                  styles.inputBlock
                )}
              >
                <label className={styles.label}>{field.label}</label>
                <InputField
                  field={field}
                  value={item[field.name] || ""}
                  onChange={(name, value) =>
                    handleFieldChange(name, value, itemIndex)
                  }
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
