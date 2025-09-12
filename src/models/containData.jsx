class ResumeItem {
  constructor({
    id,
    title,
    itemType = "",
    minorTitle = "",
    startTime = "",
    endTime = "",
  }) {
    this.id = id;
    this.title = title;
    this.itemType = itemType;
    this.minorTitle = minorTitle;
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
  title: "Ku Yun-Jhe",
  minorTitle: "Natioanl Dong Hwa University, M.S. Computer Science",
  itemType: "profile",
  startTime: "1999-01",
  endTime: "????-??",
});

// 3️⃣ 新增描述片段
workItem.addDescriptItem({
  descriptContain: "",
  minorInfo: "",
  link: "(+886)970220868",
});

workItem.addDescriptItem({
  descriptContain: "",
  minorInfo: "",
  link: "san6886@gmail.com",
});

// 4️⃣ 查找特定項目
// const found = myResume.find((item) => item.id === 1);
// console.log("找到的項目：", found);

// 5️⃣ 刪除項目
// const removedCount = myResume.remove((item) => item.id === 1);
// console.log(`刪除了 ${removedCount} 個項目`);

// 6️⃣ 查看全部項目
console.log("目前所有項目：", myResume.all());
