import classNames from "classnames";
import styles_Glass from "../styles/Glass.module.css";

import styles from "../styles/InputArea.module.css";
import { InputField, InputDescriptField } from "./InputField";

export default function FieldRenderer({
  item,
  field,
  itemIndex,
  onFieldChange,
}) {
  if (!field.display) return null;

  const key = `${item.id || itemIndex}-${field.name}`;

  if (field.name === "descriptItems") {
    return (
      <div
        key={key}
        className={classNames(styles_Glass.glassMaterial, styles.inputBlock)}
      >
        <InputDescriptField
          field={field}
          value={Array.isArray(item.descriptItems) ? item.descriptItems : []}
          onChange={(fname, value) => onFieldChange(fname, value, itemIndex)}
        />
      </div>
    );
  }

  return (
    <div
      key={key}
      className={classNames(styles_Glass.glassMaterial, styles.inputBlock)}
    >
      <InputField
        field={field}
        value={item[field.name] ?? ""}
        onChange={(fname, value) => {
          onFieldChange(fname, value, itemIndex);
        }}
      />
    </div>
  );
}
