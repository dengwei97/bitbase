/**
 * 该文件存放的是静态数据
 */

/** 分页查询时，后台返回的数据中分页参数的命名，返回示例：
 *
 * {
 *
 * "msg":"ok",
 * "code":1,
 * "succ":true,
 * "oper":"default",
 * "page":{
 *          "current":1,
 *          "pages":2,
 *          "records":[],
 *          "size":3,
 *          "total":5
 *        }
 * }
 * */
export const pageParamNames = ["current", "pages", "size", "total"]

export const permType = {
  MENU: 1,
  BUTTON: 2,
  API: 3
}

/**
 * 币种名称
 */
export const coinNameList = [{ name: "PHT" }, { name: "USDT" }, { name: "ETH" }, { name: "BTC" }]

/**
 * 交易状态
 */
export const tradeStatusList = [{ text: "进行中" }, { text: "完成" }, { text: "失败" }, { text: "审核中" }]

/**
 * 矿工等级
 */
export const minerLevelList = [
  { text: "LevelOne", value: 1 },
  { text: "LevelTow", value: 2 },
  { text: "LevelThree", value: 3 },
  { text: "LevelFour", value: 4 },
  { text: "LevelFive", value: 5 },
  { text: "LevelSix", value: 6 },
  { text: "LevelSeven", value: 7 },
  { text: "LevelEight", value: 8 }
]

/**
 * 正则表达式
 * @property {object} phone 电话号码
 * @property {object} code 验证码校验
 * @property {string} chinese 中文字符1-10个
 * @property {string} email 邮箱地址
 * @property {string} id 身份证号
 * @property {string} password 普通密码6-20位
 * @property {string} num 纯数字
 * @property {string} floatNum 浮点数字
 * @property {string} character 纯字母
 * @property {string} carNum 车牌号
 * @property {string} bankCard 银行卡
 */
export const regular = {
  phone: /^1[3|4|5|7|8|9][0-9]{9}$/,
  code: /^\d{6}$/,
  chinese: /^[\u4e00-\u9fa5]{1,10}$/,
  email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
  url: /[a-zA-z]+:\/\/[^\s]*/,
  id: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/,
  password: /^[a-zA-Z0-9_~！@#￥%…&—=【】、《》<>:;"'\-\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/]{6,20}$/,
  password8: /^[a-zA-Z0-9_~！@#￥%…&—=【】、《》<>:;"'\-\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/]{8,20}$/,
  num: /^\d{1,}$/,
  floatNum: /^\d+(\.\d+)?$/,
  character: /^[a-zA-Z]{1,}$/,
  carNum: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  bankCard: /^([1-9]{1})([0-9]{15,19})$/
}

export const phoneCode = {
  countrys_cn: [
    "中国",
    "阿富汗",
    "阿尔巴尼亚",
    "阿尔格拉",
    "安道尔",
    "安哥拉",
    "安圭拉",
    "阿森松岛",
    "安提瓜和巴布达",
    "阿根廷",
    "亚美尼亚",
    "阿鲁巴",
    "澳大利亚",
    "奥地利",
    "阿塞拜疆",
    "巴哈马",
    "巴林",
    "孟加拉国",
    "巴巴多斯",
    "白俄罗斯",
    "比利时",
    "伯利兹",
    "贝宁",
    "百慕大",
    "不丹",
    "玻利维亚",
    "波斯尼亚和黑塞哥维那",
    "博茨瓦纳",
    "巴西",
    "文莱",
    "保加利亚",
    "布基纳法索",
    "布隆迪",
    "柬埔寨",
    "喀麦隆",
    "加拿大",
    "佛得角",
    "开曼群岛",
    "中非共和国",
    "乍得",
    "智利",
    "哥伦比亚",
    "科摩罗",
    "刚果共和国",
    "刚果民主共和国",
    "库克群岛",
    "哥斯达黎加",
    "科特迪沃",
    "克罗地亚",
    "古巴",
    "塞浦路斯",
    "捷克共和国",
    "丹麦",
    "吉布提",
    "多米尼加",
    "多米尼加共和国",
    "厄瓜多尔",
    "埃及",
    "艾萨尔瓦多",
    "爱沙尼亚",
    "埃塞俄比亚",
    "法罗群岛",
    "斐济",
    "芬兰",
    "法国",
    "法属圭亚那",
    "法属波利尼西亚",
    "加蓬",
    "冈比亚",
    "格鲁吉亚",
    "德国",
    "加纳",
    "直布罗陀",
    "希腊",
    "格陵兰",
    "格林纳达",
    "瓜德罗普",
    "关岛",
    "危地马拉",
    "几内亚",
    "根西",
    "几内亚",
    "圭亚那",
    "海地",
    "洪都拉斯",
    "香港",
    "缅甸",
    "匈牙利",
    "冰岛",
    "印度",
    "印度尼西亚",
    "伊朗",
    "伊拉克",
    "爱尔兰",
    "马恩岛",
    "以色列",
    "意大利",
    "牙买加",
    "日本",
    "泽西岛",
    "约旦",
    "哈萨克斯坦",
    "肯尼亚",
    "科索沃",
    "科威特",
    "吉尔吉斯斯坦",
    "老挝",
    "拉脱维亚",
    "黎巴嫩",
    "莱索托",
    "利比里亚",
    "利比亚",
    "列支敦士登",
    "立陶宛",
    "卢森堡",
    "澳门",
    "马其顿",
    "马达加斯加",
    "马拉维",
    "马来西亚",
    "马尔代夫",
    "马里",
    "马耳他",
    "马提尼克",
    "毛里塔尼亚",
    "毛里求斯",
    "马约特",
    "墨西哥",
    "摩尔多瓦",
    "摩纳哥",
    "蒙古",
    "黑山",
    "蒙特塞拉特",
    "摩洛哥",
    "莫桑比克",
    "纳米比亚",
    "尼泊尔",
    "荷兰",
    "荷属安的列斯",
    "新喀里多尼亚",
    "新西兰",
    "尼加拉瓜",
    "尼日尔",
    "尼日利亚",
    "挪威",
    "阿曼",
    "巴基斯坦",
    "巴勒斯坦",
    "巴拿马",
    "巴布亚新几内亚",
    "巴拉圭",
    "秘鲁",
    "菲律宾",
    "波兰",
    "葡萄牙",
    "波多黎各",
    "库塔",
    "留尼汪",
    "罗马尼亚",
    "俄罗斯",
    "卢旺达",
    "萨摩亚东部",
    "萨摩亚西部",
    "圣马力诺",
    "圣多美和普林西比",
    "沙特阿拉伯",
    "塞内加尔",
    "塞尔维亚",
    "塞舌尔",
    "塞拉利昂",
    "新加坡",
    "斯洛伐克",
    "斯洛文尼亚",
    "南非",
    "韩国",
    "西班牙",
    "斯里兰卡",
    "圣基茨和尼维斯",
    "圣卢西亚",
    "圣文森特",
    "苏丹",
    "苏里南",
    "斯威士兰",
    "瑞典",
    "瑞士",
    "叙利亚",
    "台湾",
    "塔吉克斯坦",
    "坦桑尼亚",
    "泰国",
    "东帝汶",
    "多哥",
    "汤加",
    "特立尼达和多巴哥",
    "突尼斯",
    "土耳其",
    "土库曼斯坦",
    "特克斯和凯科斯群岛",
    "乌干达",
    "乌克兰",
    "阿拉伯联合酋长国",
    "英国",
    "美国",
    "乌拉圭",
    "乌兹别克斯坦",
    "瓦努阿图",
    "委内瑞拉",
    "越南",
    "维尔京群岛",
    "也门",
    "赞比亚",
    "津巴布韦"
  ],
  countrys_en: [
    "China",
    "Afghanistan",
    "Albania",
    "Algera",
    "Andorra",
    "Angola",
    "Anguilla",
    "Ascension",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botwana",
    "Brazill",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "Colombia",
    "Comoros",
    "Republic of the Congo",
    "Democratic Republic of the Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote divoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "EISalvador",
    "Estonia",
    "Ethiopia",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guernsey",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Myanmar",
    "Hungary",
    "Iceland",
    "Indea",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazeakhstan",
    "Kenya",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antillse",
    "New Caledonia",
    "NewZealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestinian",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "PuertoRico",
    "Qotar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Samoa Eastern",
    "Samoa Western",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "Korea",
    "Spain",
    "SriLanka",
    "St Kitts and Nevis",
    "St.Lucia",
    "St.Vincent",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "USA",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Virgin Islands",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ],
  codes: [
    "86",
    "93",
    "355",
    "213",
    "376",
    "244",
    "1264",
    "247",
    "1268",
    "54",
    "374",
    "297",
    "61",
    "43",
    "994",
    "1242",
    "973",
    "880",
    "1246",
    "375",
    "32",
    "501",
    "229",
    "1441",
    "975",
    "591",
    "387",
    "267",
    "55",
    "673",
    "359",
    "226",
    "257",
    "855",
    "237",
    "1",
    "238",
    "1345",
    "236",
    "235",
    "56",
    "57",
    "269",
    "242",
    "243",
    "682",
    "506",
    "225",
    "385",
    "53",
    "357",
    "420",
    "45",
    "253",
    "1767",
    "1809",
    "593",
    "20",
    "503",
    "372",
    "251",
    "298",
    "679",
    "358",
    "33",
    "594",
    "689",
    "241",
    "220",
    "995",
    "49",
    "233",
    "350",
    "30",
    "299",
    "1473",
    "590",
    "1671",
    "502",
    "240",
    "44",
    "224",
    "592",
    "509",
    "504",
    "852",
    "95",
    "36",
    "354",
    "91",
    "62",
    "98",
    "964",
    "353",
    "44",
    "972",
    "93",
    "1876",
    "81",
    "44",
    "962",
    "7",
    "254",
    "383",
    "965",
    "996",
    "856",
    "371",
    "961",
    "266",
    "231",
    "218",
    "423",
    "370",
    "352",
    "853",
    "389",
    "261",
    "265",
    "60",
    "960",
    "223",
    "356",
    "596",
    "222",
    "230",
    "262",
    "52",
    "373",
    "377",
    "976",
    "382",
    "1664",
    "212",
    "258",
    "264",
    "977",
    "31",
    "599",
    "687",
    "64",
    "505",
    "227",
    "234",
    "47",
    "968",
    "92",
    "970",
    "507",
    "675",
    "595",
    "51",
    "63",
    "48",
    "351",
    "1",
    "974",
    "262",
    "40",
    "7",
    "250",
    "684",
    "685",
    "378",
    "239",
    "966",
    "221",
    "381",
    "248",
    "232",
    "65",
    "421",
    "386",
    "27",
    "82",
    "34",
    "94",
    "1869",
    "1758",
    "1784",
    "249",
    "597",
    "268",
    "46",
    "41",
    "963",
    "886",
    "992",
    "255",
    "66",
    "670",
    "228",
    "676",
    "1868",
    "216",
    "90",
    "993",
    "1649",
    "256",
    "380",
    "971",
    "44",
    "1",
    "598",
    "998",
    "678",
    "58",
    "84",
    "1340",
    "967",
    "260",
    "263"
  ]
}

/**
 * 字典库
 * @property {array} int 整型数字字典库
 * @property {array} char 字母字典库
 * @property {array} intAndchar 整型数字字母字典库
 * @property {array} week 星期字典库，可以用来处理星期显示格式
 * @property {array} numCn 中文数字字典库
 */
const numLib = "0123456789".split("")
const characterLib = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export const wordLib = {
  int: numLib,
  char: characterLib,
  charAndNum: numLib.concat(characterLib),
  week: "日一二三四五六".split(""),
  numCn: "零一二三四五六七八九十".split("")
}
