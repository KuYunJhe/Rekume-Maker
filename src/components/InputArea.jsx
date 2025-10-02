import { useState, useRef, useMemo, useEffect } from "react";

import styles from "../styles/InputArea.module.css";

import ItemPanel from "./ItemPanel.jsx";
import ItemsOperateBar from "./ItemsOperateBar.jsx";

import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import {
  ResumeItemCollection,
  createInitialItems,
} from "../models/containData.jsx";
import { fieldSchemas } from "../models/fieldSchemas.jsx";

// 主組件：輸入區域

export default function InputArea({ currentType }) {
  //
  //
  // (localStorage)  (Resume 實例)     (當前類型的資料)     (輸入欄位內容)
  // storedResume → ItemCollection → DataOfCurrentType + schema → InputContent
  //
  //
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ==== 本地資料「storedResume」變更 ======================================

  // ----
  // ---- 讀取本地資料「storedResume」
  const [storedResume, setStoredResume] = useLocalStorage(
    // storedResume：純陣列 Data
    // 首次載入時，若 localStorage 沒有資料，則呼叫取得初始空白 Resume
    "Resume",
    createInitialItems
  );

  // ----
  // ---- 初始化「ItemCollection」
  const ItemCollection = useRef(
    // storedResume 陣列格式轉為 Resume 實例「ItemCollection」
    // lazy 初始化，使用 ref 保存
    ResumeItemCollection.newObjFromArray(storedResume)
  );

  // ----
  // ---- 清除履歷資料(包含本地資料)
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

  // ----
  // ---- storedResume 改變時，同步「ItemCollection」
  useEffect(() => {
    ItemCollection.current = ResumeItemCollection.newObjFromArray(storedResume);
  }, [storedResume]);

  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ==== 「schema」欄位設定 ================================================
  // ----
  // ---- 根據欄位設定規則（依 currentType）
  const schema = fieldSchemas[currentType] || [];

  // ----
  // ---- 分割為左右兩邊的 schema 陣列
  const schemaLeft = useMemo(
    () =>
      schema.filter((f) => (f.displayPanel ?? "left") === "left" && f.display),
    [schema]
  );
  const schemaRight = useMemo(
    () =>
      schema.filter((f) => (f.displayPanel ?? "left") === "right" && f.display),
    [schema]
  );

  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ==== 「InputContent」篩選 =============================================
  // ----
  // ---- 依 currentType 抽出對應的 DataOfCurrentType
  const DataOfCurrentType = useMemo(
    () => ItemCollection.current.getByType(currentType),
    [currentType, storedResume]
  );
  // ----
  // ---- 「InputContent」：存放當前表單欄位內既有資料的狀態
  const [InputContent, setInputContent] = useState([]);

  // ----
  // ---- 以 DataOfCurrentType 、schema 同步 InputContent
  useEffect(() => {
    // 同步暫存（只在資料集合變動或切換類型）

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

  // ----
  // ---- 比較 InputContent 與 DataOfCurrentType 是否相同
  function sameList(a, b) {
    // 輕量比較：只檢查長度與 id

    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i].id !== b[i].id) return false;
    return true;
  }

  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ====  Item 欄位內容控制 及 提交變更 ======================================

  // ----
  // ---- 單項欄位即時更新
  function handleItemContentChange(name, value, itemIndex) {
    //
    // 更新 InputContent 狀態
    setInputContent((prevInputContent) => {
      //
      // 取得目前的 InputContent
      const nextInputContent = [...prevInputContent];

      // 更新指定 item： 找出 InputContent 中指定 index 的 item ，更新他的欄位
      const updatedItem = { ...nextInputContent[itemIndex], [name]: value };

      // 更新 InputContent
      nextInputContent[itemIndex] = updatedItem;

      // 提交更新資料到資料庫
      commit((Itemcol) => Itemcol.update(updatedItem));

      // 回傳更新新的輸入欄位狀態
      return nextInputContent;
    });
  }

  // ----
  // ---- 新增空白 item
  function handleAddNewItem() {
    //
    // 新增一個空的履歷項目
    pendingLastIndexFlag.current = true; // 等同步後選到最後一筆
    commit((Itemcol) =>
      Itemcol.add({
        itemType: currentType,
        itemTitle: "",
        itemSubTitle: "",
        descriptItems: [],
      })
    );
  }

  // ----
  // ---- 刪除指定 item：依 id
  function handleDeleteItem(id) {
    commit((Itemcol) => Itemcol.remove((item) => item.id === id));
  }

  // ----
  // ---- 封裝提交單一入口：更新 resumeCollection + 資料儲存到 localStorage
  function commit(mutator) {
    //
    // 更新本地資料庫狀態，把 resumeCollection 傳入回調函數，包含 item 的新增、更新內容、刪除等操作
    mutator(ItemCollection.current);

    //  Resume 實例 -> 資料陣列，用以存回 localStorage
    setStoredResume(ItemCollection.current.toArray());
  }

  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ==== 當前 itemIndex 控制 ==============================================
  //
  // ---- 當前編輯的項目索引
  const [itemIndex, setItemIndex] = useState(0);

  // ----
  // ---- 一個 Flag：表示 itemIndex 正在等待切到最新項目
  const pendingLastIndexFlag = useRef(false);

  // ----
  // ---- 以 useEffect 監控 InputContent 的變化
  useEffect(() => {
    //
    // 在 InputContent 更新後處理待選最新項目
    if (pendingLastIndexFlag.current && InputContent.length > 0) {
      // 切換到最後一個項目
      setItemIndex(InputContent.length - 1);

      // 清除旗標
      pendingLastIndexFlag.current = false;
    }
  }, [InputContent]);

  // ----
  // ---- 當 currentType 切換時，重設 itemIndex 為 0
  useEffect(() => {
    setItemIndex(0);
  }, [currentType]);

  // ----
  // ---- 這裡可以根據 itemIndex 顯示或隱藏特定的控制項
  function itemSwitchController(Index) {
    //
    // 邊界檢查
    if (Index < 0) {
      setItemIndex(0);
      return;
    }
    if (Index >= InputContent.length) {
      setItemIndex(InputContent.length - 1);
      return;
    }

    // 更新當前索引
    setItemIndex(Index);
  }

  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================
  // ======================================================================

  return (
    <>
      <div className={styles.itemFieldContainer}>
        {InputContent[itemIndex] && (
          <ItemPanel
            key={InputContent[itemIndex].id || itemIndex}
            item={InputContent[itemIndex]}
            itemIndex={itemIndex}
            schemaLeft={schemaLeft}
            schemaRight={schemaRight}
            onFieldChange={handleItemContentChange}
            onDelete={handleDeleteItem}
            multipleItems={currentType !== "Profile"}
          />
        )}
      </div>
      <ItemsOperateBar
        currentType={currentType}
        InputContent={InputContent}
        storedResume={storedResume}
        itemIndex={itemIndex}
        handleDeleteItem={handleDeleteItem}
        handleClearResume={handleClearResume}
        handleAddNewItem={handleAddNewItem}
        itemSwitchController={itemSwitchController}
      />
    </>
  );
}
