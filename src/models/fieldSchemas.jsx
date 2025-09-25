export const fieldSchemas = {
  Profile: [
    { display: false, name: "id", type: "hidden" },
    { display: true, name: "itemTitle", label: "姓名", type: "text", required: true },
    { display: true, name: "itemSubTitle", label: "個人簡歷", type: "text" },

    { display: true, name: "descriptItems", label: "個人聯絡方式 & 個人資訊", 
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
    { display: false , name: "id", type: "hidden", },
    { display: true, name: "itemTitle", label: "學校名校", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "學位", type: "text" },
    { display: true, name: "startTime", label: "入學時間", type: "month" },
    { display: true, name: "endTime", label: "畢業時間", type: "month" },
    
    { display: true, name: "descriptItems", label: "說明（學位、研究．．．）", 
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
    { display: false , name: "id", type: "hidden", },
    { display: true, name: "itemTitle", label: "經驗項目", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "補充標題", type: "text" },
    { display: true, name: "startTime", label: "開始時間", type: "month" },
    { display: true, name: "endTime", label: "結束時間", type: "month" },
    { display: false, name: "link", label: "連結", type: "text" },
    { display: false, name: "linkLabel", label: "連結標籤", type: "text" },
    
    { display: true, name: "descriptItems", label: "經驗簡述", 
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
    { display: false , name: "id", type: "hidden", },
    { display: true, name: "itemTitle", label: "成就項目", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "成就描述", type: "text" },
        { display: true, name: "startTime", label: "開始時間", type: "month" },
    { display: true, name: "endTime", label: "結束時間", type: "month" },
    { display: true, name: "link", label: "連結", type: "text" },
    { display: true, name: "linkLabel", label: "連結標籤", type: "text" },

    { display: true, name: "descriptItems", label: "成就項目簡述", 
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
    { display: false , name: "id", type: "hidden", },
    { display: true, name: "itemTitle", label: "專案名稱", type: "text", required: true },
    // { display: true, name: "itemSubTitle", label: "專案副標", type: "text" },
    { display: true, name: "startTime", label: "開始時間", type: "month" },
    { display: true, name: "endTime", label: "結束時間", type: "month" },
    { display: true, name: "link", label: "連結", type: "text" },
    { display: true, name: "linkLabel", label: "連結標籤", type: "text" },

    { display: true, name: "descriptItems", label: "專案簡述", 
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
    { display: false , name: "id", type: "hidden", },
    { display: true, name: "itemTitle", label: "技能類別", type: "text", required: true },
    { display: true, name: "itemSubTitle", label: "技能名稱", type: "text" },
  ],
  
};
