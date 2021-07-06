/* === 个人信息 === */

// 获取 accounts 请访问并登录
// https://wenzhou.xueanquan.com/EduAdmin/Home/Index#ClassManagement_Manage
// [...document.querySelectorAll('div.gridTbody > table > tbody > tr')].map(v => v.getAttribute("rel"))
// 在控制台键入以上 js 代码取账号列表并粘贴到以下声明中。
let accounts = [];

// 需要替换为有管理权限的账号 Cookie，请访问下述地址并登录，按 F12 后刷新，在 Network 中复制 Cookie 并填入以下声明。
// https://wenzhou.xueanquan.com/EduAdmin/Home/
let adminCookie = "";

exports.accounts = accounts;
exports.adminCookie = adminCookie;

/* === 假期活动 === */
// 如 https://huodong.xueanquan.com/summer2021/summer_one.html
let holiday = {};

holiday.schoolYear = 2021; // 打开专题活动页，按 F12 调出 Console，输入 schoolYear、semester 取该专题活动的 schoolYear、semester。
holiday.semester = 2;
holiday.steps = ['安全知识', '安全素养', '家长扫码']; // 不同专题活动步骤不同，大部分是两步——看视频和答问卷——请按照实际情况修改。

exports.holiday = holiday;

/* === 专题活动 === */
// 如 https://huodong.xueanquan.com/2021fzjz/index.html
let special = {};

special.specialId = 578; // 打开专题活动页，按 F12 调出 Console，输入 specialId 取该专题活动的 specialId。
special.steps = ['视频签到', '问卷签到']; // 不同专题活动步骤不同，大部分是两步——看视频和答问卷——请按照实际情况修改。

exports.special = special;

/* === 安全学习 === */
let skill = {};

// https://wenzhou.xueanquan.com/JiaTing/EscapeSkill/SeeVideo.aspx?gid=${gid}&li=${courseid}
// 在对应的安全学习页源代码第 87 行取 videoid,gid,courseid，第 542 行取 workid,fid,title。
skill.videoid = 23126;
skill.gid = 789;
skill.courseid = 811;
skill.workid = 823837;
skill.fid = 314;
skill.title = "网络是把“双刃剑”";

exports.skill = skill;

/* === 执行操作 === */
let methods = {};
methods.anquanxuexi = 0; // 安全学习
methods.zhuantihuodong = 1; // 专题活动
methods.jiaqihuodong = 2; // 假期活动
methods.listInfo = 3;

let willDo = methods.listInfo;

exports.willDo = willDo;