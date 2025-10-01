export const fieldSchemas = {
  Profile: [
    { display: false, displayPanel: "left", name: "id", type: "hidden" },
    { display: true, displayPanel: "left", name: "itemTitle", label: "姓名", type: "text", required: true },
    { display: true, displayPanel: "left", name: "itemSubTitle", label: "個人簡歷", type: "text" },

    { display: true, displayPanel: "right", name: "descriptItems", label: "個人聯絡方式 & 個人資訊", 
      descriptContent_Label: "項目", 
      descriptTitle_Label: "內容",
      descriptContent_type:"text", 
      descriptTitle_type:"text", 
      descriptTitle_: true , 
      deleteDescItemBtn:true , 
      addDescItemBtn:true 
    },
  ],

  Education: [
    { display: false, displayPanel: "left", name: "id", type: "hidden", },
    { display: true, displayPanel: "left", name: "itemTitle", label: "學校名校", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "學位", type: "text" },
    { display: true, displayPanel: "left", name: "startTime", label: "入學時間", type: "month" },
    { display: true, displayPanel: "left", name: "endTime", label: "畢業時間", type: "month" },

    { display: true, displayPanel: "right", name: "descriptItems", label: "說明（學位、研究．．．）", 
      descriptContent_Label: "簡述說明", 
      descriptTitle_Label: "補充", 
      descriptContent_type:"text", 
      descriptTitle_type:"text", 
      descriptTitle_: false , 
      deleteDescItemBtn:true , 
      addDescItemBtn:true, 
    },

  ],

  Experience: [
    { display: false, displayPanel: "left", name: "id", type: "hidden", },
    { display: true, displayPanel: "left", name: "itemTitle", label: "經驗項目", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "補充標題", type: "text" },
    { display: true, displayPanel: "left", name: "startTime", label: "開始時間", type: "month" },
    { display: true, displayPanel: "left", name: "endTime", label: "結束時間", type: "month" },
    { display: false, displayPanel: "left", name: "link", label: "連結", type: "text" },
    { display: false, displayPanel: "left", name: "linkLabel", label: "連結顯示文字", type: "text" },

    { display: true, displayPanel: "right", name: "descriptItems", label: "經驗簡述", 
      descriptContent_Label: "簡述", 
      descriptTitle_Label: "補充", 
      descriptContent_type:"text", 
      descriptTitle_type:"text", 
      descriptTitle_: false , 
      deleteDescItemBtn:true , 
      addDescItemBtn:true, 
    },
  ],
  

  Achievement: [
    { display: false, displayPanel: "left", name: "id", type: "hidden", },
    { display: true, displayPanel: "left", name: "itemTitle", label: "成就項目", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "成就描述", type: "text" },
    { display: true, displayPanel: "left", name: "startTime", label: "開始時間", type: "month" },
    { display: true, displayPanel: "left", name: "endTime", label: "結束時間", type: "month" },
    { display: true, displayPanel: "left", name: "link", label: "連結", type: "text" },
    { display: true, displayPanel: "left", name: "linkLabel", label: "連結顯示文字", type: "text" },

    { display: true, displayPanel: "right", name: "descriptItems", label: "成就項目簡述", 
      descriptContent_Label: "簡述", 
      descriptTitle_Label: "補充", 
      descriptContent_type:"text", 
      descriptTitle_type:"text", 
      descriptTitle_: false , 
      deleteDescItemBtn:true , 
      addDescItemBtn:true,  
    },
  ],


  Project: [
    { display: false, displayPanel: "left", name: "id", type: "hidden", },
    { display: true, displayPanel: "left", name: "itemTitle", label: "專案名稱", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "專案副標", type: "text" },
    { display: true, displayPanel: "left", name: "startTime", label: "開始時間", type: "month" },
    { display: true, displayPanel: "left", name: "endTime", label: "結束時間", type: "month" },
    { display: true, displayPanel: "left", name: "link", label: "連結", type: "text" },
    { display: true, displayPanel: "left", name: "linkLabel", label: "連結顯示文字", type: "text" },

    { display: true, displayPanel: "right", name: "descriptItems", label: "專案簡述", 
      descriptContent_Label: "簡述", 
      descriptTitle_Label: "補充", 
      descriptContent_type:"text", 
      descriptTitle_type:"text", 
      descriptTitle_: false , 
      deleteDescItemBtn:true , 
      addDescItemBtn:true, 
    },
  ],
  Skill: [
    { display: false, displayPanel: "left", name: "id", type: "hidden", },
    { display: true, displayPanel: "left", name: "itemTitle", label: "技能類別", type: "text", required: true },
    { display: true, displayPanel: "left", name: "itemSubTitle", label: "技能名稱", type: "text" },
  ],
  
};
