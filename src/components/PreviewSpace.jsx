import { useMemo } from "react";

import styles from "../styles/PreviewSpace.module.css";

import { useLocalStorage } from "../hooks/useLocalStorage.jsx";
import { createInitialItems } from "../models/containData.jsx";

import {
  PreviewBlock,
  PreviewProfile,
  PreviewSkill,
} from "../components/PreviewBlock.jsx";

import { previewBlockSchemas } from "../models/previewBlockSchemas.jsx";

export default function PreviewSpace() {
  // 讀取本地儲存（會隨變更自動更新）
  const [storedResume] = useLocalStorage("Resume", createInitialItems);

  // 預覽區塊設定
  const schemas = useMemo(() => previewBlockSchemas, []);

  // 要排除的類型
  const excludedTypes = useMemo(
    () => new Set(["Profile", "Skill"]), // 需要排除的 type 放這
    []
  );

  return (
    <>
      <div id="preview-print-root" className={styles.container}>
        {
          // 只顯示 Profile
          schemas
            .filter((schema) => schema.type === "Profile")
            .map((schema) => (
              <div key={schema.type} className={styles.blockTitle}>
                <PreviewProfile
                  schema={schema}
                  data={storedResume.filter(
                    (item) => item.itemType === schema.type
                  )}
                />
              </div>
            ))
        }

        {
          // 顯示除 Profile 和 Skill 外的其他
          schemas
            .filter((schema) => !excludedTypes.has(schema.type)) // 排除指定類型
            .map((schema) => (
              <div key={schema.type} className={styles.blockTitle}>
                <PreviewBlock
                  schema={schema}
                  data={storedResume.filter(
                    (item) => item.itemType === schema.type
                  )}
                />
              </div>
            ))
        }

        {
          // 只顯示 Skill
          schemas
            .filter((schema) => schema.type === "Skill")
            .map((schema) => (
              <div key={schema.type} className={styles.blockTitle}>
                <PreviewSkill
                  schema={schema}
                  data={storedResume.filter(
                    (item) => item.itemType === schema.type
                  )}
                />
              </div>
            ))
        }
      </div>
    </>
  );
}
