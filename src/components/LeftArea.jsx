import { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "../styles/LeftArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import { InputField, InputDescriptField } from "./InputField";
import { fieldSchemas } from "../models/fieldSchemas.jsx";

export default function LeftArea({
  currentType,
  onInputContentChange,
  onInputContentDelete,
  DataOfCurrentType,
}) {
  // 根據 currentType 取得對應的欄位設定規則
  const schema = fieldSchemas[currentType] || [];

  // 存放當前表單欄位內既有資料的狀態
  const [InputContent, setInputContent] = useState([]);

  // InputContent 讀取 DataOfCurrentType 資料，當 欄位模式 或 資料庫內資料 有改變時，更新 InputContent

  useEffect(() => {
    if (JSON.stringify(DataOfCurrentType) === JSON.stringify(InputContent)) {
      return; // 如果資料相同，直接返回
    }

    // 處理空陣列的情況
    if (Array.isArray(DataOfCurrentType) && DataOfCurrentType.length === 0) {
      //
      // 產生一個空的項目物件
      const emptyItem = {
        //
        // 根據 schema 建立空欄位
        ...Object.fromEntries(schema.map((field) => [field.name, ""])),

        // 新增：立即給予 ID，讓 InputContent 內的項目一定是有 ID 的狀態
        id: crypto.randomUUID(),

        // 保留 itemType 資料
        itemType: currentType,
      };

      // 把空項目加入 InputContent 狀態
      setInputContent([emptyItem]);

      // 通知父組件更新資料庫
      onInputContentChange([emptyItem]);

      // 直接中斷，不跑下面的if
      return;
    }

    // 處理有資料的情況
    if (Array.isArray(DataOfCurrentType)) {
      //
      const init = DataOfCurrentType.map((item) => ({
        //
        // 保留原有資料，包括 itemType
        ...item,

        // 根據 schema 初始化欄位內容，沒有的欄位設為空字串
        ...Object.fromEntries(
          schema.map((field) => [field.name, item[field.name] || ""])
        ),
      }));
      setInputContent(init);
    }
  }, [currentType, DataOfCurrentType, schema]);

  // 處理每個欄位內容改變時的內容資料傳遞，把更新後的 InputContent 傳給父元件，用來更新 Data
  const handleFieldChange = (name, value, itemIndex) => {
    //

    // 複製當前的 input 欄位的內容
    const updatedInputContent = [...InputContent];

    // 更新指定 item 中，觸發內容值改變的欄位，更新該欄位的內容值
    updatedInputContent[itemIndex] = {
      ...updatedInputContent[itemIndex],
      [name]: value,
    };

    // 更新狀態
    setInputContent(updatedInputContent);

    // 將更新後的內容傳給父元件
    onInputContentChange(updatedInputContent);
  };

  return (
    <div className={classNames(styles.container)}>
      {/* <LeftArea /> */}
      {
        // 遍歷每個 item 的內容
        InputContent.map((item, itemIndex) => (
          <div key={`item-${itemIndex}`} className={styles.itemContainer}>
            {
              // 遍歷每條欄位設定的規則
              schema.map((field) => {
                //
                // 如果欄位設定為不顯示，則跳過不顯示UI
                if (!field.display) return null;

                // 處理 descriptItems 欄位
                if (field.name === "descriptItems") {
                  return (
                    <div
                      key={`${itemIndex}-${field.name}`}
                      className={classNames(
                        styles_Glass.glassMaterial,
                        styles.inputBlock
                      )}
                    >
                      <h3>{field.label}</h3>
                      <InputDescriptField
                        field={field}
                        // 這裡的 value 是一個 descriptItems 陣列
                        // 如果 descriptItems 還不存在或不是陣列，則傳入空陣列，避免錯誤
                        value={item[field.name] || []}
                        // 回傳的值，傳入 handleFieldChange，更新父元件的 Data 資料
                        onChange={(name, value) =>
                          handleFieldChange(name, value, itemIndex)
                        }
                      />
                    </div>
                  );
                }

                //處理一般欄位
                return (
                  <div
                    key={`${itemIndex}-${field.name}`}
                    className={classNames(
                      styles_Glass.glassMaterial,
                      styles.inputBlock
                    )}
                  >
                    <InputField
                      field={field}
                      value={item[field.name] || ""}
                      onChange={(name, value) =>
                        handleFieldChange(name, value, itemIndex)
                      }
                    />
                  </div>
                );
              })
            }

            {/* 刪除項目按鈕 */}
            {
              // Profile 模式不顯示刪除按鈕
              currentType !== "Profile" && (
                <button
                  type="button"
                  className={classNames(
                    styles_Glass.glassMaterial,
                    styles.deleteItemBtn
                  )}
                  onClick={() => {
                    // 刪除指定的 item
                    const updatedInputContent = [...InputContent];
                    updatedInputContent.splice(itemIndex, 1);

                    console.log("刪除項目:", { itemIndex });
                    console.log("刪除後的 InputContent:", updatedInputContent);
                    setInputContent(updatedInputContent);
                    onInputContentDelete(item.id);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              )
            }
          </div>
        ))
      }
    </div>
  );
}
