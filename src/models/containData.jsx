class ResumeItem {
  constructor({
    itemTitle,
    itemType = "",
    mainContain = "",
    minorContain = "",
    startTime = "",
    endTime = "",
  }) {
    this.id = crypto.randomUUID();
    this.itemType = itemType;
    this.itemTitle = itemTitle;
    this.mainContain = mainContain;
    this.minorContain = minorContain;
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

  // 根據類型取得所有相關項目
  getByType(type) {
    return this.items.filter(
      (item) => item.itemType.toLowerCase() === type.toLowerCase()
    );
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
const ProfileItem = myResume.add({
  itemType: "Profile",
  itemTitle: "Name & Contact",
  mainContain: "Ku Yun-Jhe",
  minorContain: "Natioanl Dong Hwa University, M.S. Computer Science",
  startTime: "1999-01",
  endTime: "????-??",
});

// 3️⃣ 新增描述片段
ProfileItem.addDescriptItem({
  descriptContain: "",
  minorInfo: "",
  link: "(+886)970220868",
});

ProfileItem.addDescriptItem({
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

const WorkItem_1 = myResume.add({
  itemType: "Work",
  itemTitle: "Software Engineer",
  mainContain: "ABC Company",
  minorContain: "Developing web applications",
  startTime: "2024-01",
  endTime: "2024-06",
});

WorkItem_1.addDescriptItem({
  descriptContain:
    "Developed a full-stack web application using React and Node.js.",
  minorInfo: "這是 minorInfo",
  link: "這是 link",
});
WorkItem_1.addDescriptItem({
  descriptContain:
    "Collaborated with cross-functional teams to define project requirements.",
  minorInfo: "",
  link: "",
});

const WorkItem_2 = myResume.add({
  itemType: "Work",
  itemTitle: "Frontend Developer",
  mainContain: "XYZ Company",
  minorContain: "Building user interfaces",
  startTime: "2024-07",
  endTime: "2024-12",
});

WorkItem_2.addDescriptItem({
  descriptContain:
    "Implemented responsive web designs using HTML, CSS, and JavaScript.",
  minorInfo: "Technologies: HTML, CSS, JavaScript, React",
  link: "",
});

// 6️⃣ 查看全部項目
console.log("目前所有項目：", myResume.all());

export { myResume, ResumeItemCollection };
