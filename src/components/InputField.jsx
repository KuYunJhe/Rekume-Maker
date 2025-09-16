import React from "react";

export function InputField({ field, value, onChange }) {
  const { name, label, type, required } = field;

  // 處理 textarea 類型
  if (type === "textarea") {
    return (
      <div>
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
  const { name, label, type, required, minorInfo, link } = field;

  return (
    <div>
      {value.map((descriptItem, descIndex) => (
        <div key={`${descriptItem}-desc-${descIndex}`}>
          <label>{field.label}</label>
          <textarea
            value={descriptItem.descriptContain || ""}
            onChange={(e) => onChange(name, e.target.value)}
          />
          {minorInfo && (
            <>
              <label>補充資訊</label>
              <input
                type="text"
                value={descriptItem.minorInfo || ""}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </>
          )}
          {link && (
            <>
              <label>連結</label>
              <input
                type="text"
                value={descriptItem.link || ""}
                onChange={(e) => onChange(name, e.target.value)}
              />
            </>
          )}
        </div>
      ))}
    </div>
  );
}
