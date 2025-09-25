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

// 主組件：輸入區域

export default function InputArea({ currentType }) {
  //

  // localStorage 持久化的「純陣列」
  const [storedResume, setStoredResume] = useLocalStorage("Resume", () =>
    // 首次載入時，若 localStorage 沒有資料，則呼叫取得初始 Resume 空白資料，建立初始資料
    createInitialItems()
  );
  //

  // 使用 ref 保存可操作的集合實例
  const ItemCollection = useRef(null);
  //

  // 設定 ItemCollection 初始值
  if (!ItemCollection.current) {
    // 從 localStorage 的空白純資料陣列還原成 ResumeItemCollection 實例
    ItemCollection.current = ResumeItemCollection.newObjFromArray(storedResume);
  }
  //

  // 當 storedItems（外部來源）改變時，同步重建集合
  useEffect(() => {
    // 重建集合
    ItemCollection.current = ResumeItemCollection.newObjFromArray(storedResume);
    // 提升版本號，強制重新渲染
    setVersion((v) => v + 1);
  }, [storedResume]);
  //

  // 版本號（若你需要在 commit 後強制重算衍生資料）
  const [version, setVersion] = useState(0);
  //

  // 封裝：更新 resumeCollection + 資料儲存到 localStorage + bump 版本
  function commit(mutatorFn) {
    //

    // 更新本地資料庫狀態，把 resumeCollection 傳入，資料更新為最新的輸入內容
    mutatorFn(ItemCollection.current); // mutatorFn：回調函數變數，接收 ItemCollection，讓外部可以操作它

    // 把物件轉為純資料陣列，存回 localStorage
    setStoredResume(ItemCollection.current.toArray());

    // 提升版本號，強制重新渲染
    setVersion((v) => v + 1);
  }

  // 依 type + version 重算
  const existingData = useMemo(
    () => ItemCollection.current.getByType(currentType),
    [currentType, version, storedResume]
  );

  // 處理輸入欄位變更
  function handleDataChange(updatedInputContent) {
    //

    // 更新本地狀態，把 resumeCollection 傳入，資料更新為最新的輸入內容
    commit((Itemcol) => {
      //
      // 同步更新資料庫
      updatedInputContent.forEach((updatedItem) => {
        //
        // 如果 Item 已存在，則更新 Item
        if (Itemcol.getById(updatedItem.id)) {
          Itemcol.update(updatedItem);
        }
        // 如果 Item 不存在，則新增 Item
        else {
          Itemcol.add(updatedItem);
        }
      });
    });
  }

  // 刪除指定 ID 的項目
  function handleDeleteItem(itemId) {
    commit((Itemcol) => {
      Itemcol.remove((item) => item.id === itemId);
    });
  }

  // 處理新增項目按鈕，新增一個空的履歷項目
  function handleAddNewItem() {
    //

    // 新增一個空的履歷項目
    commit((Itemcol) => {
      // Itemcol 內新增一個空的履歷項目，itemTitle 預設為空字串
      Itemcol.add({
        itemType: currentType,
        itemTitle: "",
        itemSubTitle: "",
        descriptItems: [],
      });
    });
  }

  // 清除所有履歷資料
  function handleClearResume() {
    // 徹底清掉 localStorage
    localStorage.removeItem("Resume");

    // 建立一份全新的初始空白資料（或你想設成 [] 也行）
    const emptyData = createInitialItems();

    // 更新 hook 狀態（會觸發 useEffect 重建集合）
    setStoredResume(emptyData);

    // 立即重建（避免中途使用舊引用）
    ItemCollection.current = ResumeItemCollection.newObjFromArray(emptyData);

    // 強制刷新
    setVersion((v) => v + 1);
  }

  // =================================================================




  

  // =================================================================

  return (
    <>
      <div>
        <form className={classNames(styles_Glass.glass, styles.container)}>
          <LeftArea
            currentType={currentType} // 當前輸入欄位模式 (Profile, Work, etc.)
            onInputContentChange={handleDataChange} // 當輸入欄位變更時的回調
            onInputContentDelete={handleDeleteItem} // 刪除項目
            DataOfCurrentType={existingData} // 傳入當前類型的既有資料
          />
          {/* <CenterArea currentType={currentType} /> */}
          {/* <RightArea currentType={currentType} /> */}
        </form>

        <button
          type="button"
          onClick={() => console.log("所有項目:", ItemCollection.current.all())}
          className={classNames(
            styles_Glass.glassMaterial,
            styles.addNewItemBtn
          )}
          style={{ left: "10rem" }}
        >
          查看所有項目
        </button>

        <button
          type="button"
          onClick={() => console.log("所有 storedResume:", storedResume)}
          className={classNames(
            styles_Glass.glassMaterial,
            styles.addNewItemBtn
          )}
          style={{ left: "20rem" }}
        >
          查看所有 storedResume
        </button>

        {currentType !== "Profile" && (
          <button
            type="button"
            onClick={handleAddNewItem}
            className={classNames(
              styles_Glass.glassMaterial,
              styles.addNewItemBtn
            )}
          >
            addNewItemBtn
          </button>
        )}

        <button
          type="button"
          onClick={handleClearResume}
          className={classNames(
            styles_Glass.glassMaterial,
            styles.addNewItemBtn
          )}
          style={{ left: "30rem" }}
        >
          清除履歷資料
        </button>
      </div>
    </>
  );
}
