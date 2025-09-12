class ResumeItem {
  constructor({
    id,
    title,
    itemType = "",
    startTime = "",
    endTime = "",
    completed = false,
  }) {
    this.id = id;
    this.title = title;
    this.itemType = itemType;
    this.startTime = startTime;
    this.endTime = endTime;
    this.descriptItems = []; // 儲存多個描述片段
  }

  // 新增描述片段
  addDescriptItem({ descriptContain, minorInfo = "", link = "" }) {
    this.descriptItems.push({ descriptContain, minorInfo, link });
  }
}

export default class ResumeItemCollection {
  constructor() {
    this.items = [];
  }

  // 新增一個履歷項目
  add(resumeData) {
    const resume = new ResumeItem(resumeData);
    this.items.push(resume);
    return resume; // 可直接回傳新增的項目
  }

  // 移除項目
  remove(predicate) {
    const originalLength = this.items.length;
    this.items = this.items.filter((item) => !predicate(item));
    return originalLength - this.items.length; // 回傳刪除數量
  }

  // 查找特定項目
  find(predicate) {
    return this.items.find(predicate);
  }

  // 查看全部項目
  all() {
    // 回傳淺拷貝，避免外部直接修改 items
    return [...this.items];
  }
}

// 1️⃣ 建立履歷集合
const myResume = new ResumeItemCollection();

// 2️⃣ 新增一個履歷項目
const workItem = myResume.add({
  id: 1,
  title: "前端工程師",
  itemType: "工作經驗",
  startTime: "2022-01",
  endTime: "2023-06",
});

// 3️⃣ 新增描述片段
workItem.addDescriptItem({
  descriptContain: "負責開發公司官網",
  minorInfo: "使用 React + TypeScript",
  link: "https://example.com",
});

workItem.addDescriptItem({
  descriptContain: "優化前端效能",
  minorInfo: "頁面載入速度提升 50%",
});

// 4️⃣ 查找特定項目
// const found = myResume.find((item) => item.id === 1);
// console.log("找到的項目：", found);

// 5️⃣ 刪除項目
// const removedCount = myResume.remove((item) => item.id === 1);
// console.log(`刪除了 ${removedCount} 個項目`);

// 6️⃣ 查看全部項目
console.log("目前所有項目：", myResume.all());
