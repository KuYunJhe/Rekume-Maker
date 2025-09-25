import { useMemo } from "react";

import styles from "../styles/PreviewBlock.module.css";

// 預覽一般資料區塊
export function PreviewBlock({ schema, data }) {
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>

        <div className={styles.content}>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <h4 className={styles.itemTitle}>{item.itemTitle}</h4>

              <p className={styles.itemSubTitle}>{item.itemSubTitle}</p>
              <p className={styles.itemStartTime}>{item.startTime}</p>
              <p className={styles.itemEndTime}>{item.endTime}</p>

              <a
                className={styles.itemLink}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.linkLabel}
              </a>

              {
                // 顯示描述項目
                Array.isArray(item.descriptItems) &&
                  item.descriptItems.length > 0 && (
                    <ul className={styles.descriptList}>
                      {item.descriptItems.map((descriptItem, index) => (
                        <li key={index} className={styles.descriptItem}>
                          <span className={styles.descriptContent}>
                            {descriptItem.descriptContent}
                          </span>

                          <span className={styles.descriptTitle}>
                            {descriptItem.descriptTitle}
                          </span>
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

// 預覽個人資料區塊
export function PreviewProfile({ schema, data }) {
  //
  // 定義需要加超連結的 descriptContent 類型
  const linkTypes = useMemo(() => new Set(["link", "website", "github"]), []);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>

        <div className={styles.content}>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <h4 className={styles.itemTitle}>{item.itemTitle}</h4>
              <p className={styles.itemSubTitle}>{item.itemSubTitle}</p>

              {
                // 顯示描述項目
                Array.isArray(item.descriptItems) &&
                  item.descriptItems.length > 0 && (
                    <ul className={styles.descriptList}>
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
                                  className={styles.descriptTitle}
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
                                  className={styles.descriptTitle}
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
                                  className={styles.descriptTitle}
                                  href={descriptItem.descriptTitle}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Link
                                </a>
                              </>
                            ) : (
                              <span className={styles.descriptContent}>
                                {descriptItem.descriptContent}
                              </span>
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
        <h3 className={styles.categoryTitle}>{schema.blockTitle}</h3>

        <div className={styles.content}>
          {data.map((item, index) => (
            <div key={index} className={styles.item}>
              <span className={styles.itemTitle}>{item.itemTitle}</span>
              <span className={styles.itemSubTitle}>{item.itemSubTitle}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
