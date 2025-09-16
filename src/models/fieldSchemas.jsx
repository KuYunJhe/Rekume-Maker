export const fieldSchemas = {
  Profile: [
    { name: "id", display: false, type: "hidden" },
    {
      name: "itemTitle",
      display: false,
      label: "個人資料",
      type: "hidden",
      required: true,
    },
    {
      name: "mainContain",
      display: true,
      label: "主標題 -- 姓名",
      type: "text",
    },
    { name: "minorContain", display: true, label: "副標題", type: "text" },
  ],

  Work: [
    { name: "id", type: "hidden", display: false },
    {
      name: "itemTitle",
      display: true,
      label: "職稱",
      type: "text",
      required: true,
    },
    {
      name: "mainContain",
      display: true,
      label: "公司/描述",
      type: "textarea",
    },
    { name: "startTime", display: true, label: "開始時間", type: "month" },
    { name: "endTime", display: true, label: "結束時間", type: "month" },
    {
      name: "descriptItems",
      display: true,
      label: "描述",
      type: "text",
      minorInfo: true,
      link: true,
    },
  ],
  // 可繼續新增其他 type
};
