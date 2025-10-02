import { useMemo } from "react";
import classNames from "classnames";

import styles from "../styles/PreviewBlock.module.css";

// 預覽一般資料區塊
export function PreviewBlock({ schema, data }) {
  return (
    <>
      <div className={styles.container}>
        {
          // 只有在對應的 type 有 item 資料時才顯示區塊標題
          data.filter((item) => item.itemType === schema.type).length > 0 && (
            <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>
          )
        }

        <div className={styles.content}>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemFirstLineContainer}>
                <div className={styles.itemFirstLineLeft}>
                  {
                    // 項目標題
                    <h4 className={styles.itemTitle}>{item.itemTitle}</h4>
                  }
                  {
                    // 項目連結（如果有的話）
                    item.link && item.linkLabel && (
                      <a
                        className={classNames({ [styles.itemLink]: true })}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.linkLabel}
                      </a>
                    )
                  }
                </div>
                {
                  // 項目時間（如果有的話）
                  <div className={styles.itemTimeContainer}>
                    {item.startTime && (
                      <p
                        className={classNames({
                          [styles.itemStartTime]: true,
                          [styles.itemTime]: true,
                        })}
                      >
                        {formatYearMonth(item.startTime)}
                      </p>
                    )}

                    {
                      // 只有在 startTime 和 endTime 都有值時才顯示分隔符
                      item.startTime && item.endTime && (
                        <span className={styles.itemTimeDivider}>–</span>
                      )
                    }
                    {item.endTime && (
                      <p
                        className={classNames({
                          [styles.itemEndTime]: true,
                          [styles.itemTime]: true,
                        })}
                      >
                        {formatYearMonth(item.endTime)}
                      </p>
                    )}
                  </div>
                }
              </div>

              <p className={styles.itemSubTitle}>{item.itemSubTitle}</p>

              {
                // 顯示描述項目
                Array.isArray(item.descriptItems) &&
                  item.descriptItems.length > 0 && (
                    <ul className={styles.descriptItems}>
                      {
                        // 描述項目列表
                        item.descriptItems.map((descriptItem, index) => (
                          <li key={index} className={styles.descriptItem}>
                            <span className={styles.descriptContent}>
                              {descriptItem.descriptContent}
                            </span>

                            {descriptItem.descriptTitle && (
                              <span className={styles.descriptTitle}>
                                {descriptItem.descriptTitle}
                              </span>
                            )}
                          </li>
                        ))
                      }
                    </ul>
                  )
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 預覽個人資料區塊
export function PreviewProfile({ schema, data }) {
  //
  // 定義需要加超連結的 descriptContent 類型
  const linkTypes = useMemo(() => new Set(["link", "website", "github"]), []);

  return (
    <>
      <div className={styles.container}>
        {/* {
          // 只有在對應的 type 有 item 資料時才顯示區塊標題
          data.filter((item) => item.itemType === schema.type).length > 0 && (
            <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>
          )
        } */}

        <div
          className={classNames({
            [styles.profileContent]: true,
          })}
        >
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <h4
                className={classNames({
                  [styles.itemTitle]: true,
                  [styles.profileItemTitle]: true,
                })}
              >
                {item.itemTitle}
              </h4>
              <p
                className={classNames({
                  [styles.itemSubTitle]: true,
                  [styles.profileItemSubTitle]: true,
                })}
              >
                {item.itemSubTitle}
              </p>

              {
                // 顯示描述項目
                Array.isArray(item.descriptItems) &&
                  item.descriptItems.length > 0 && (
                    <ul className={styles.descriptItems}>
                      {item.descriptItems.map((descriptItem, index) => (
                        <li key={index} className={styles.descriptItem}>
                          {
                            // 根據 descriptContent 判斷要不要加超連結
                            descriptItem.descriptContent.toLowerCase() ===
                            "phone" ? (
                              <>
                                <span className={styles.descriptContent}>
                                  {descriptItem.descriptContent}:{" "}
                                </span>
                                <a
                                  className={classNames({
                                    [styles.descriptTitle]: true,
                                    [styles.descriptTitle_link]: true,
                                  })}
                                  href={`tel:${descriptItem.descriptValue}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {descriptItem.descriptTitle}
                                </a>
                              </>
                            ) : descriptItem.descriptContent.toLowerCase() ===
                              "email" ? (
                              <>
                                <span className={styles.descriptContent}>
                                  {descriptItem.descriptContent}:{" "}
                                </span>
                                <a
                                  className={classNames({
                                    [styles.descriptTitle]: true,
                                    [styles.descriptTitle_link]: true,
                                  })}
                                  href={`mailto:${descriptItem.descriptValue}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {descriptItem.descriptTitle}
                                </a>
                              </>
                            ) : linkTypes.has(
                                descriptItem.descriptContent.toLowerCase()
                              ) ? (
                              <>
                                <span className={styles.descriptContent}>
                                  {descriptItem.descriptContent}:{" "}
                                </span>

                                <a
                                  className={classNames({
                                    [styles.descriptTitle]: true,
                                    [styles.descriptTitle_link]: true,
                                  })}
                                  href={descriptItem.descriptTitle}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {
                                    // 如果 descriptTitle 沒有值就顯示 "Link"
                                    descriptItem.descriptTitle &&
                                    descriptItem.descriptTitle !== ""
                                      ? descriptItem.descriptTitle
                                      : "Link"
                                  }
                                </a>
                              </>
                            ) : (
                              <>
                                <span className={styles.descriptContent}>
                                  {descriptItem.descriptContent}
                                </span>

                                {descriptItem.descriptTitle && (
                                  <span className={styles.descriptTitle}>
                                    {descriptItem.descriptTitle}
                                  </span>
                                )}
                              </>
                            )
                          }
                        </li>
                      ))}
                    </ul>
                  )
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// 預覽技能資料區塊
export function PreviewSkill({ schema, data }) {
  return (
    <>
      <div className={styles.container}>
        {
          // 只有在對應的 type 有 item 資料時才顯示區塊標題
          data.filter((item) => item.itemType === schema.type).length > 0 && (
            <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>
          )
        }

        <div
          className={classNames({
            [styles.content]: true,
            [styles.skillContent]: true,
          })}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={classNames({
                [styles.skillItem]: true,
                [styles.item]: true,
              })}
            >
              <span
                className={classNames({
                  [styles.itemTitle]: true,
                  [styles.skillItemTitle]: true,
                })}
              >
                {item.itemTitle}
              </span>
              <span
                className={classNames({
                  [styles.itemSubTitle]: true,
                  [styles.skillItemSubTitle]: true,
                })}
              >
                {item.itemSubTitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function formatYearMonth(ym) {
  // Simple validation for "YYYY-MM" format
  if (!/^\d{4}-\d{2}$/.test(ym)) return ym;

  // Create a Date object from the input
  const d = new Date(`${ym}-01T00:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  })
    .format(d)
    .replace(/(?<=^[A-Za-z]{3}) /, ". ");
}
// "2024-08" -> "Aug. 2024"
