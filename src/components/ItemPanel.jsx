import LeftPanel from "./LeftPanel.jsx";
import RightPanel from "./RightPanel.jsx";
import styles from "../styles/InputArea.module.css";
import classNames from "classnames";
import styles_Glass from "../styles/Glass.module.css";

export default function ItemPanel({
  item,
  itemIndex,
  schemaLeft,
  schemaRight,
  onFieldChange,
}) {
  return (
    <div className={styles.itemPanel}>
      <LeftPanel
        item={item}
        itemIndex={itemIndex}
        schema={schemaLeft}
        onFieldChange={onFieldChange}
      />

      <RightPanel
        item={item}
        itemIndex={itemIndex}
        schema={schemaRight}
        onFieldChange={onFieldChange}
      />
      {/* <div className={classNames(styles.leftPanel)}></div>

      <div className={classNames(styles.rightPanel)}></div> */}
    </div>
  );
}
