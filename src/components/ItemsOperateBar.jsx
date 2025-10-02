import styles from "../styles/ItemsOperateBar.module.css";
import styles_Glass from "../styles/Glass.module.css";
import classNames from "classnames";

export default function ItemsOperateBar({
  currentType,
  InputContent,
  storedResume,
  itemIndex,
  handleDeleteItem,
  handleClearResume,
  handleAddNewItem,
  itemSwitchController,
}) {
  return (
    <>
      <div className={classNames(styles_Glass.glassMaterial, styles.container)}>
        <div className={classNames(styles.leftSide)}>
          {currentType !== "Profile" && (
            <>
              {
                // 刪除項目控制（Profile 不顯示）
                <button
                  type="button"
                  className={classNames(
                    // styles_Glass.glassMaterial,
                    styles.ItemOperateBtn,
                    styles.deleteItemBtn
                  )}
                  onClick={() => {
                    handleDeleteItem(InputContent[itemIndex].id);
                    itemSwitchController(itemIndex - 1);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              }

              {
                // 新增項目按鈕（Profile 不顯示）
                <button
                  type="button"
                  className={classNames(
                    // styles_Glass.glassMaterial,
                    styles.ItemOperateBtn,
                    styles.addNewItemBtn
                  )}
                  onClick={() => {
                    handleAddNewItem();
                  }}
                >
                  <span className="material-symbols-outlined">add_box</span>
                </button>
              }
            </>
          )}
        </div>

        <div className={classNames(styles.centerSide)}>
          {currentType !== "Profile" && (
            <>
              {
                // 項目切換控制（Profile 不顯示）
                <div
                  className={classNames(
                    // styles_Glass.glassMaterial,
                    styles.itemSwitchController
                  )}
                >
                  {
                    // 項目切換按鈕（Profile 不顯示）
                    <button
                      type="button"
                      className={classNames(
                        // styles_Glass.glassMaterial,
                        styles.ItemOperateBtn,
                        styles.itemSwitchBtn
                      )}
                      onClick={() => itemSwitchController(itemIndex - 1)}
                    >
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                  }

                  {
                    // 項目指示（目前第幾項 / 共幾項）（Profile 不顯示）
                    <div
                      className={classNames(
                        // styles_Glass.glassMaterial,
                        styles.itemSwitchIndexNumber
                      )}
                    >
                      {InputContent.length === 0
                        ? "0 / 0"
                        : `${itemIndex + 1} / ${InputContent.length}`}
                    </div>
                  }
                  {
                    // 項目切換按鈕（Profile 不顯示）
                    <button
                      type="button"
                      className={classNames(
                        // styles_Glass.glassMaterial,
                        styles.ItemOperateBtn,
                        styles.itemSwitchBtn
                      )}
                      onClick={() => itemSwitchController(itemIndex + 1)}
                    >
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  }
                </div>
              }
            </>
          )}
        </div>
        <div className={classNames(styles.rightSide)}>
          {/* {
            // 查看目前履歷資料按鈕
            <button
              type="button"
              onClick={() => {
                console.log(storedResume);
              }}
              className={classNames(
                // styles_Glass.glassMaterial,
                styles.ItemOperateBtn,
                styles.viewResumeDataBtn
              )}
            >
              <span className="material-symbols-outlined">mystery</span>
            </button>
          } */}

          {
            <button
              type="button"
              onClick={() => {
                requestAnimationFrame(() => {
                  window.print();
                });
              }}
              className={styles.ItemOperateBtn}
            >
              <span className="material-symbols-outlined">print</span>
            </button>
          }

          {
            // 清除所有項目、履歷資料按鈕
            <button
              type="button"
              onClick={handleClearResume}
              className={classNames(
                // styles_Glass.glassMaterial,
                styles.ItemOperateBtn,
                styles.clearAllItemsBtn
              )}
            >
              <span className="material-symbols-outlined">delete_forever</span>
            </button>
          }
        </div>
      </div>
    </>
  );
}
