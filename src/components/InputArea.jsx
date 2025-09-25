import { useState, useRef, useMemo, useEffect } from "react";
import classNames from "classnames";

import styles from "../styles/InputArea.module.css";
import styles_Glass from "../styles/Glass.module.css";

import LeftArea from "../components/LeftArea.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import {
  ResumeItemCollection,
  createInitialItems,
} from "../models/containData.jsx";
import { fieldSchemas } from "../models/fieldSchemas.jsx";

import { InputField, InputDescriptField } from "./InputField";

// 主組件：輸入區域

export default function InputArea({ currentType }) {
  //

  // 讀取本地純陣列 Data
  // 首次載入時，若 localStorage 沒有資料，則呼叫取得初始空白 Resume
  const [storedResume, setStoredResume] = useLocalStorage(
    "Resume",
    createInitialItems
  );

  // Data陣列格式轉為 Resume 實例（lazy 初始化），使用 ref 保存
  const ItemCollection = useRef(
    ResumeItemCollection.newObjFromArray(storedResume)
  );

  // storedResume 改變時，同步集合
  useEffect(() => {
    ItemCollection.current = ResumeItemCollection.newObjFromArray(storedResume);
  }, [storedResume]);

  // 依 currentType 抽出對應的 item 陣列
  const DataOfCurrentType = useMemo(
    () => ItemCollection.current.getByType(currentType),
    [currentType, storedResume]
  );

  // 根據 currentType 取得對應的欄位設定規則
  const schema = fieldSchemas[currentType] || [];

  // 存放當前表單欄位內既有資料的狀態
  const [InputContent, setInputContent] = useState([]);

  // 輕量比較：只檢查長度與 id
  function sameList(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i].id !== b[i].id) return false;
    return true;
  }

  // 同步暫存（只在資料集合變動或切換類型）
  useEffect(() => {
    // 檢查 DataOfCurrentType 是否存在
    if (!DataOfCurrentType) return;
    // 檢查是否與 InputContent 相同
    if (sameList(DataOfCurrentType, InputContent)) return;

    // 把資料庫內的資料載入 InputContent 狀態
    const init = DataOfCurrentType.map((item) => ({
      ...item,
      ...Object.fromEntries(
        // 根據 schema 初始化欄位內容，沒有的欄位設為空字串或空陣列
        schema.map((field) => [
          field.name,
          item[field.name] ?? (field.name === "descriptItems" ? [] : ""),
        ])
      ),
    }));

    setInputContent(init);
  }, [DataOfCurrentType, schema, currentType]);

  // =============================================================

  // 清除履歷資料(包含本地資料)
  function handleClearResume() {
    //

    // 徹底清掉 localStorage
    localStorage.removeItem("Resume");

    // 建立一份全新的初始空白資料
    const emptyData = createInitialItems();

    // 立即重建 Resume 實例
    ItemCollection.current = ResumeItemCollection.newObjFromArray(emptyData);

    // 更新本地狀態：用新的空白資料覆蓋
    setStoredResume(emptyData);

    // 清空目前的輸入欄位內容
    setInputContent([]);
  }

  // =============================================================
  // 單項欄位即時更新（可改成 onBlur 再 commit）
  function handleItemContentChange(name, value, itemIndex) {
    //
    // 更新 InputContent 狀態
    setInputContent((prev) => {
      // 取得指定 item
      const next = [...prev];

      // 更新指定 item 的欄位
      const updated = { ...next[itemIndex], [name]: value };
      next[itemIndex] = updated;

      // 只 upsert 單一項而非整批
      commit((Itemcol) => Itemcol.update(updated));
      return next;
    });
  }

  // 新增空白 item
  function handleAddNewItem() {
    //
    // 新增一個空的履歷項目
    commit((Itemcol) =>
      Itemcol.add({
        itemType: currentType,
        itemTitle: "",
        itemSubTitle: "",
        descriptItems: [],
      })
    );
  }

  // 刪除指定 item：依 id
  function handleDeleteItem(id) {
    commit((Itemcol) => Itemcol.remove((item) => item.id === id));
  }

  // 單一封裝提交入口：更新 resumeCollection + 資料儲存到 localStorage
  function commit(mutator) {
    //

    // 更新本地資料庫狀態，把 resumeCollection 傳入回調函數
    mutator(ItemCollection.current);

    //  Resume 實例 -> 資料陣列，用以存回 localStorage
    setStoredResume(ItemCollection.current.toArray());
  }
  // =============================================================

  // 渲染 item 中單一欄位的函數
  function renderInputField(item, field, itemIndex) {
    //

    // 不顯示的欄位不渲染
    if (!field.display) return null;

    // 設定 key
    const key = `${item.id || itemIndex}-${field.name}`;

    // 處理 descriptItems 欄位
    if (field.name === "descriptItems") {
      return (
        <div
          key={key}
          className={classNames(styles_Glass.glassMaterial, styles.inputBlock)}
        >
          <h3>{field.label}</h3>
          <InputDescriptField
            field={field}
            value={Array.isArray(item.descriptItems) ? item.descriptItems : []} // 確保 value 是陣列
            onChange={(fname, value) =>
              handleItemContentChange(fname, value, itemIndex)
            }
          />
        </div>
      );
    }

    // 處理一般欄位
    return (
      <div
        key={key}
        className={classNames(styles_Glass.glassMaterial, styles.inputBlock)}
      >
        <InputField
          field={field}
          value={item[field.name] ?? ""}
          onChange={(fname, value) =>
            handleItemContentChange(fname, value, itemIndex)
          }
        />
      </div>
    );
  }

  return (
    <>
      <form className={classNames(styles_Glass.glass, styles.container)}>
        <div className={styles.container}>
          {
            // 遍歷每個 item 的內容
            InputContent.map((item, index) => (
              <div key={item.id || index} className={styles.itemContainer}>
                {
                  // 遍歷每條欄位設定的規則，進行欄位渲染
                  schema.map((field) => renderInputField(item, field, index))
                }

                {
                  // 刪除 item 按鈕（Profile 類型不顯示）
                  currentType !== "Profile" && (
                    <button
                      type="button"
                      className={classNames(
                        styles_Glass.glassMaterial,
                        styles.deleteItemBtn
                      )}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )
                }
              </div>
            ))
          }
        </div>
      </form>

      {currentType !== "Profile" && (
        <button
          type="button"
          onClick={handleAddNewItem}
          className={classNames(
            styles_Glass.glassMaterial,
            styles.addNewItemBtn
          )}
        >
          新增項目
        </button>
      )}

      <button
        type="button"
        onClick={handleClearResume}
        className={classNames(styles_Glass.glassMaterial, styles.addNewItemBtn)}
        style={{ left: "12rem" }}
      >
        清除履歷資料
      </button>

      <button
        type="button"
        onClick={() => {
          console.log(storedResume);
        }}
        className={classNames(styles_Glass.glassMaterial, styles.addNewItemBtn)}
        style={{ left: "24rem" }}
      >
        查看履歷資料
      </button>
    </>
  );
}
