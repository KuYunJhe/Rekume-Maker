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

  return (
    <div
      key={key}
      className={classNames(styles_Glass.glassMaterial, styles.inputBlock)}
    >
      {field.name === "descriptItems" ? (
        <InputDescriptField
          field={field}
          value={Array.isArray(item.descriptItems) ? item.descriptItems : []}
          onChange={(_fname, value) => onFieldChange(field.name, value, itemIndex)}
        />
      ) : (
        <InputField
          field={field}
          value={item[field.name] ?? ""}
          onChange={(_fname, value) => onFieldChange(field.name, value, itemIndex)}
        />
      )}
    </div>
  );
}
