import React from "react";

export function InputField({ field, value, onChange }) {
  const { name, label, type, required } = field;

  // 處理 textarea 類型
  if (type === "textarea") {
    return (
      <div>
        <label>{label}</label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
        />
      </div>
    );
  }

  // 處理其他 input 類型
  const inputType = (() => {
    switch (type) {
      case "month":
        return "month";
      case "email":
        return "email";
      case "tel":
        return "tel";
      case "url":
        return "url";
      case "date":
        return "date";
      case "number":
        return "number";
      case "password":
        return "password";
      case "hidden":
        return "hidden";
      default:
        return "text";
    }
  })();

  return (
    <div>
      <label>{label}</label>
      <input
        type={inputType}
        value={value || ""}
        required={!!required}
        onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  );
}

export function InputDescriptField({ field, value, onChange }) {
  const { name, descriptTitle_, deleteDescItemBtn } = field;

  const handleDescriptItemChange = (descItemIndex, descItemField, newValue) => {
    // 複製目前的資料庫 Data，一個 descriptItems 陣列
    const updatedValue = [...value];

    // 確保該 Index 的 descriptItem 存在
    updatedValue[descItemIndex] = updatedValue[descItemIndex] || {};

    // 更新特定 descriptItem 的特定欄位
    updatedValue[descItemIndex] = {
      ...updatedValue[descItemIndex],
      [descItemField]: newValue,
    };

    // 將完整的更新後的 descriptItems 陣列傳回
    onChange(name, updatedValue);
  };

  return (
    <div>
      {value.map((descriptItem, descItemIndex) => (
        <div key={`${descriptItem}-desc-${descItemIndex}`}>
          <label>{field.descriptContent_Label}</label>
          {
            // 決定 descriptContent 的輸入框類型
            field.descriptContent_type === "textarea" ? (
              <textarea
                value={descriptItem.descriptContent || ""}
                onChange={(e) =>
                  handleDescriptItemChange(
                    descItemIndex,
                    "descriptContent",
                    e.target.value
                  )
                }
              />
            ) : (
              <input
                type={field.descriptContent_type}
                value={descriptItem.descriptContent || ""}
                onChange={(e) =>
                  handleDescriptItemChange(
                    descItemIndex,
                    "descriptContent",
                    e.target.value
                  )
                }
              />
            )
          }

          {
            // 決定是否顯示 descriptTitle 的輸入框
            descriptTitle_ && (
              <>
                <label>{field.descriptTitle_Label}</label>
                {
                  // 決定 descriptTitle 的輸入框類型
                  field.descriptTitle_type === "textarea" ? (
                    <textarea
                      value={descriptItem.descriptTitle || ""}
                      onChange={(e) =>
                        handleDescriptItemChange(
                          descItemIndex,
                          "descriptTitle",
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={descriptItem.descriptTitle || ""}
                      onChange={(e) =>
                        handleDescriptItemChange(
                          descItemIndex,
                          "descriptTitle",
                          e.target.value
                        )
                      }
                    />
                  )
                }
              </>
            )
          }

          {
            // 刪除描述項目的按鈕
            // (如果欄位設定有 deleteDescItemBtn 才顯示)
            deleteDescItemBtn && (
              <button
                type="button"
                onClick={() => {
                  const updatedValue = [...value];
                  updatedValue.splice(descItemIndex, 1);
                  onChange(name, updatedValue);
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            )
          }
        </div>
      ))}

      {
        // 新增描述項目的按鈕
        // (如果欄位設定有 addDescItemBtn 才顯示)
        field.addDescItemBtn && (
          <>
            <button
              type="button"
              onClick={() => {
                // 在 descriptItems 陣列中新增一個空的 descriptItem
                // 如果原本沒有 descriptItems 陣列，則建立一個新的陣列
                const newDescItem = [
                  ...(value || []),
                  { descriptContent: "", descriptTitle: "" },
                ];

                // 把新增欄位存入 InputContent 狀態，並更新父元件 Data 的資料
                onChange("descriptItems", newDescItem);
              }}
            >
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          </>
        )
      }
    </div>
  );
}
