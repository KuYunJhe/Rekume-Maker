import styles from "../styles/OperateBar.module.css";
import styles_Glass from "../styles/Glass.module.css";
import classNames from "classnames";
import TypeCategorySelector from "./TypeCategorySelector.jsx";

export default function OperateBar({ setCurrentType }) {
  return (
    <>
      <div className={styles.container}>
        <TypeCategorySelector setCurrentType={setCurrentType} />
        {/* <button
          className={classNames(styles_Glass.glassMaterial, {
            [styles.operate_bar_btm]: true,
          })}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button
          className={classNames(styles_Glass.glassMaterial, {
            [styles.operate_bar_btm]: true,
          })}
        >
          <span className="material-symbols-outlined">download</span>
        </button> */}
      </div>
    </>
  );
}
