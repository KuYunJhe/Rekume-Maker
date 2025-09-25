import { useState, useEffect } from "react";

/**
 * 自訂 Hook：在 React state 與 localStorage 之間同步資料
 * 支援：
 *  - lazy initial（函數初始值）
 *  - 自訂序列化 / 反序列化 (serialize / deserialize)
 *  - 異常防護（try/catch）
 */
export function useLocalStorage(
  key,
  initialValue, // 初始值（值或函數）
  {
    serialize = JSON.stringify, // 序列化函數（預設 JSON.stringify）
    deserialize = JSON.parse, // 反序列化函數（預設 JSON.parse）
  } = {}
) {
  //

  // 使用 lazy initializer
  // 只在第一次渲染時執行讀取 localStorage
  const [value, setValue] = useState(() => {
    try {
      // 從 localStorage 取值
      const stored = localStorage.getItem(key);

      // 若有值 → 反序列化後回傳
      if (stored != null) {
        return deserialize(stored);
      }
      //

      // 若沒有值 → 使用 initialValue（若是函數則呼叫取結果）
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch {
      // 發生錯誤（例如 JSON.parse 失敗或存取被阻擋）→ 回退 initialValue
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  });

  // 儲存值更新時
  // 當 key 或 value 或 serialize 函式變更時，把最新 value 寫回 localStorage
  useEffect(() => {
    // 序列化後存儲
    try {
      localStorage.setItem(key, serialize(value));

      // 同頁同步（自訂事件）
      window.dispatchEvent(new CustomEvent(`ls:${key}`));
    } catch {
      // 靜默失敗
    }
  }, [key, value, serialize]);

  // 跨元件 / 跨分頁同步
  useEffect(() => {
    //
    // 執行資料同步的函數
    const sync = () => {
      try {
        // 讀取現有資料
        const raw = localStorage.getItem(key);
        // 解析或初始值
        const next =
          raw != null
            ? deserialize(raw) // 如果有本地存檔資料，解析後使用
            : typeof initialValue === "function" // 沒有存檔，使用初始值或呼叫取得初始值的函數取得初始值
            ? initialValue()
            : initialValue;

        // 避免不必要 set（簡易比較），有不同才更新
        const same = JSON.stringify(next) === JSON.stringify(value);
        if (!same) {
          setValue(next);
        }
      } catch {
        // 忽略錯誤
      }
    };

    // 綁定事件監聽，資料同步
    window.addEventListener("storage", sync); // 跨分頁
    window.addEventListener(`ls:${key}`, sync); // 同頁

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(`ls:${key}`, sync);
    };
  }, [key, deserialize, initialValue, value]);

  // 回傳目前值與設定函數，介面與 useState 一致
  return [value, setValue];
}
