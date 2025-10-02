import { useState } from "react";
import styles from "../styles/TypeCategorySelector.module.css";
import styles_Glass from "../styles/Glass.module.css";
import classNames from "classnames";

const items = [
  {
    id: crypto.randomUUID(),
    iconName: "account_circle",
    title: "PROFILE",
    type: "Profile",
  },
  {
    id: crypto.randomUUID(),
    iconName: "school",
    title: "EDUCATION",
    type: "Education",
  },
  {
    id: crypto.randomUUID(),
    iconName: "work_history",
    title: "EXPERIENCE",
    type: "Experience",
  },
  {
    id: crypto.randomUUID(),
    iconName: "stars_2",
    title: "ACHIEVEMENTS",
    type: "Achievement",
  },
  {
    id: crypto.randomUUID(),
    iconName: "folder_code",
    title: "PROJECT",
    type: "Project",
  },
  {
    id: crypto.randomUUID(),
    iconName: "person_play",
    title: "SKILLS",
    type: "Skill",
  },
];

export default function TypeCategorySelector({ setCurrentType }) {
  // 記錄目前被選中的按鈕 ID
  const [selectedId, setSelectedId] = useState(items[0].id);

  const handleItemClick = (itemId) => {
    // 更新被選中的按鈕 ID
    setSelectedId(itemId);

    // 找到被點擊的項目
    const selectedItem = items.find((item) => item.id === itemId);

    // 調用父組件傳入的 onTypeChange，傳入對應的 type
    if (selectedItem && setCurrentType) {
      setCurrentType(selectedItem.type);
    }

    console.log("Selected Type:", selectedItem.type);
  };

  return (
    <>
      <div
        className={classNames({
          [styles_Glass.glassMaterial]: true,
          [styles.container]: true,
        })}
      >
        {items.map((item) => (
          <button
            key={item.id}
            className={classNames({
              [styles.operate_bar_btm]: true,
              [styles.isChosen]: selectedId === item.id,
            })}
            onClick={() => handleItemClick(item.id)}
          >
            <span
              className={classNames(
                "material-symbols-outlined",
                styles.btm_icon
              )}
            >
              {item.iconName}
            </span>
            <span className={classNames(styles.btm_title)}>{item.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
