import FieldRenderer from "./FieldRenderer.jsx";

import classNames from "classnames";
import styles_Glass from "../styles/Glass.module.css";
import styles from "../styles/InputArea.module.css";

export default function RightPanel({ item, itemIndex, schema, onFieldChange }) {
  return (
    <>
      <div className={classNames(styles.rightPanel)}>
        {schema.map((field) => (
          <FieldRenderer
            key={`${item.id || itemIndex}-${field.name}`}
            item={item}
            field={field}
            itemIndex={itemIndex}
            onFieldChange={onFieldChange}
          />
        ))}
      </div>
    </>
  );
}
