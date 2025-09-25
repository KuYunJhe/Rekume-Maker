class ResumeItem {
  constructor({
    id, // 新增 id 參數
    itemTitle,
    itemType,
    itemSubTitle = "",
    startTime = "",
    endTime = "",
    link = "",
    linkLabel = "",
    descriptItems = [],
  }) {
    this.id = id || crypto.randomUUID(); // 如果有 id 就用傳入的，沒有才生成新的
    this.itemType = itemType; // 項目類型
    this.itemTitle = itemTitle; // 主標題
    this.itemSubTitle = itemSubTitle; // 子標題
    this.startTime = startTime; // 開始時間
    this.endTime = endTime; // 結束時間
    this.link = link; // 連結
    this.linkLabel = linkLabel; // 連結標籤
    this.descriptItems = descriptItems; // 儲存多個描述片段
  }

  // 新增描述片段
  addDescriptItem({ descriptContent, descriptTitle = "" }) {
    this.descriptItems.push({ descriptContent, descriptTitle });
  }
}

export class ResumeItemCollection {
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
    const before = this.items.length;
    this.items = this.items.filter((i) => !predicate(i));
    return before - this.items.length;
  }

  // 更新項目
  update(updatedData) {
    const index = this.items.findIndex((item) => item.id === updatedData.id);
    if (index !== -1) {
      Object.assign(this.items[index], updatedData);
    }
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

  getById(id) {
    return this.items.find((item) => item.id === id);
  }

  // 查看全部項目
  all() {
    // 回傳淺拷貝，避免外部直接修改 items
    return [...this.items];
  }


  // 純資料快照
  toArray() {
    // 純資料快照（可存 localStorage）
    return this.items.map((i) => ({ ...i }));
  }

  // 從純資料陣列還原的物件，變成 ResumeItemCollection 實例
  static newObjFromArray(arr = []) {
    const col = new ResumeItemCollection();

    // 使用 add 方法確保每個項目都是  ResumeItemCollection 實例裡面的 ResumeItem 實例
    arr.forEach((obj) => col.add(obj));
    return col;
  }
}

// 工廠：第一次沒有資料時的預設內容
export function createInitialItems() {
  return [
    {
      itemType: "Profile",
      itemTitle: "",
      itemSubTitle: "",
      id: crypto.randomUUID(),
      descriptItems: [],
    },
  ];
}
