export const fieldSchemas = {
  Profile: [
    { name: "itemTitle", label: "個人資料", type: "hidden", required: true },
    { name: "mainContain", label: "主標題 -- 姓名", type: "text" },
    { name: "minorContain", label: "副標題", type: "text" },
  ],
  Work: [
    { name: "itemTitle", label: "職稱", type: "text", required: true },
    { name: "mainContain", label: "公司/描述", type: "textarea" },
    { name: "startTime", label: "開始時間", type: "month" },
    { name: "endTime", label: "結束時間", type: "month" },
  ],
  // 可繼續新增其他 type
};