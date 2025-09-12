import { useState } from "react";
import styles from "../styles/InfoCategorySelector.module.css";
import styles_Glass from "../styles/Glass.module.css";
import classNames from "classnames";

const items = [
  { id: crypto.randomUUID(), iconName: "account_circle", title: "PROFILE" },
  { id: crypto.randomUUID(), iconName: "school", title: "EDUCATION" },
  { id: crypto.randomUUID(), iconName: "work_history", title: "EXPERIENCE" },
  { id: crypto.randomUUID(), iconName: "stars_2", title: "ACH." },
  { id: crypto.randomUUID(), iconName: "folder_code", title: "PROJECT" },
  { id: crypto.randomUUID(), iconName: "person_play", title: "SKILLS" },
];

export default function InfoCategorySelector() {
  return (
    <>
      <div
        className={classNames(styles_Glass.glassMaterial, {
          [styles.container]: true,
        })}
      >
        {items.map((item) => (
          <buttom key={item.id} className={classNames(styles.operate_bar_btm)}>
            <span
              class={classNames("material-symbols-outlined", styles.btm_icon)}
            >
              {item.iconName}
            </span>
            <span class={classNames(styles.btm_title)}>{item.title}</span>
          </buttom>
        ))}
      </div>
    </>
  );
}
