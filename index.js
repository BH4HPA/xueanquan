const { default: axios } = require('axios')
const qs = require('qs');
const urlencode = require('urlencode');

// 登录账号
async function _login(userId, userAccount, reseted) {
    let loginRtn = await axios.post('https://wenzhou.xueanquan.com/LoginHandler.ashx',
        qs.stringify({
            userName: userAccount,
            password: '123456',// 重置后的默认密码
            type: 'login',
            loginType: 1,
            r: Math.random()
        }),
        {
            headers: {
                'Referer': 'https://wenzhou.xueanquan.com/login.html',
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
    )
    console.log('登录返回', loginRtn.status, loginRtn.data.Code, loginRtn.data.Code === 1 ? loginRtn.data.UInfo.TrueName : loginRtn.data.ErrorMsg, loginRtn.data.Code === 1 ? loginRtn.data.UInfo.UserId : null);

    if (loginRtn.data.Code !== 1) {
        if (reseted !== true) {
            console.log('登录失败，即将重置密码并重试。')

            throw new Error ("管理员账号 Cookie 还是原始数据，请按照提示更改。")
            // 需要替换为有管理权限的账号 Cookie，请访问下述地址并登录，按 F12 后刷新，在 Network 中复制 Cookie 并填入以下声明。
            // https://wenzhou.xueanquan.com/EduAdmin/Home/
            let adminCookie = "";

            let resetRtn = await axios.get('https://wenzhou.xueanquan.com/eduadmin/ClassManagement/StudentPassWordReset?studentid=' + userId,
                { headers: { 'Cookie': adminCookie } }
            )
            console.log('重置返回', resetRtn.status, resetRtn.data.statusCode, resetRtn.data.message);
            return login(userId, userAccount, true);
        } else {
            console.log('重置后仍然登录失败，请检查。')
            throw new Error ("管理员账号 Cookie 可能已经失效。")
            return loginRtn;
        }
    };

    return loginRtn;
}

// 安全学习
async function _seeVideo(userId, userAccount) {

    let loginRtn = await _login(userId, userAccount, false)
    if (loginRtn.data?.Code !== 1) return;

    let tmp = {};
    tmp.ret = 1
    tmp.data = loginRtn.data.UInfo
    let UStr = urlencode(JSON.stringify(tmp)).toLowerCase()

    let cookies;
    loginRtn.headers['set-cookie'].map(v => cookies = cookies + v.split('domain')[0])
    cookies = cookies + "_UStr=" + UStr + '; ' + `href=https%3A%2F%2Fwenzhou.xueanquan.com%2F; accessId=dd39b150-a934-11e9-b073-e9b8d9c630e7; UM_distinctid=178c95abb657c2-0b00fcb023e3f3-c3f3568-15f900-178c95abb66bac; ${loginRtn.data.UInfo.UserId}_workCnt=1; pageViewNum=3; ASP.NET_SessionId=dcnd3fgidv1lka3rasf3cq2m;`

    throw new Error ("安全学习学习内容还是原始数据，请按照提示更改。");
    // https://wenzhou.xueanquan.com/JiaTing/EscapeSkill/SeeVideo.aspx?gid=${gid}&li=${courseid}
    // 在对应的安全学习页源代码第 87 行取 videoid,gid,courseid，第 542 行取 workid,fid,title。
    let videoid = 23126;
    let gid = 789;
    let courseid = 811;
    let workid = 823837;
    let fid = 314;
    let title = "网络是把“双刃剑”";

    await axios.get(`https://wenzhou.xueanquan.com/JiaTing/EscapeSkill/SeeVideo.aspx?gid=${gid}&li=${courseid}`,
        {
            headers: { 'Cookie': cookies }
        })

    let secondSee = await axios.post('https://wenzhou.xueanquan.com/jiating/ajax/FamilyEduCenter.EscapeSkill.SeeVideo,FamilyEduCenter.ashx?_method=SkillCheckName&_session=rw',
        `videoid=${videoid}\ngradeid=${gid}\ncourseid=${courseid}`,
        {
            headers: { 'Cookie': cookies }
        })

    console.log('看视频  ', secondSee.data)

    let seeRtn = await axios.post('https://wenzhou.xueanquan.com/jiating/ajax/FamilyEduCenter.EscapeSkill.SeeVideo,FamilyEduCenter.ashx?_method=TemplateIn2&_session=rw',
        `workid=${workid}\nfid=${fid}\ntitle=${title}\nrequire=\npurpose=\ncontents=\ntestwanser=0|0|0\ntestinfo=已掌握技能\ntestMark=100\ntestReulst=1\nSiteName=\nsiteAddrees=\nwatchTime=\nCourseID=${courseid}`,
        {
            headers: { 'Cookie': cookies }
        })
    console.log('答题返回', seeRtn.status, seeRtn.data)
}

// 专题活动
// 如 https://huodong.xueanquan.com/2021fzjz/index.html
async function _doSign(userId, userAccount, reseted) {

    let loginRtn = await _login(userId, userAccount, false)
    if (loginRtn.data?.Code !== 1) return;

    throw new Error ("专题活动学习内容还是原始数据，请按照提示更改。");
    let specialId = 578; // 打开专题活动页，按 F12 调出 Console，输入 specialId 取该专题活动的 specialId。
    let steps = ['视频签到', '问卷签到']; // 不同专题活动步骤不同，大部分是两步——看视频和答问卷——请按照实际情况修改。

    for (stepId = 1; stepId <= steps.length; stepId++) {
        let stepRtn = await axios.post('https://huodongapi.xueanquan.com/p/zhejiang/Topic/topic/platformapi/api/v1/records/sign',
            { "specialId": specialId, "step": stepId },
            {
                headers: {
                    'Referer': 'https://wenzhou.xueanquan.com/login.html',
                    'Cookie': `RecordLoginInput_20083=${userAccount}; SafeApp=true; ServerSide=https://wenzhou.xueanquan.com; UserID=${loginRtn.data.UInfo.UserId}; _UCodeStr={%0d%0a  "Grade": ${loginRtn.data.UInfo.Grade},%0d%0a  "ClassRoom": ${loginRtn.data.UInfo.ClassRoom},%0d%0a  "CityCode": ${loginRtn.data.UInfo.CityCode}%0d%0a};`
                }
            })
        console.log(steps[stepId - 1], stepRtn.status, stepRtn.data.result, stepRtn.data.msg)
    }
}

// 假期活动
// 如 https://huodong.xueanquan.com/summer2021/summer_one.html
async function _doSign2(userId, userAccount, reseted) {

    let loginRtn = await _login(userId, userAccount, false)
    if (loginRtn.data?.Code !== 1) return;

    throw new Error ("假期活动内容还是原始数据，请按照提示更改。");
    let schoolYear = 2021; // 打开专题活动页，按 F12 调出 Console，输入 schoolYear、semester 取该专题活动的 schoolYear、semester。
    let semester = 2;
    
    let steps = ['安全知识', '安全素养', '家长扫码']; // 不同专题活动步骤不同，大部分是两步——看视频和答问卷——请按照实际情况修改。

    for (stepId = 1; stepId <= steps.length; stepId++) {
        let stepRtn = await axios.post('https://huodongapi.xueanquan.com/p/zhejiang/Topic/topic/platformapi/api/v1/holiday/sign',
            { "schoolYear": schoolYear, "step": stepId, "semester": semester },
            {
                headers: {
                    'Referer': 'https://wenzhou.xueanquan.com/login.html',
                    'Cookie': `RecordLoginInput_20083=${userAccount}; SafeApp=true; ServerSide=https://wenzhou.xueanquan.com; UserID=${loginRtn.data.UInfo.UserId}; _UCodeStr={%0d%0a  "Grade": ${loginRtn.data.UInfo.Grade},%0d%0a  "ClassRoom": ${loginRtn.data.UInfo.ClassRoom},%0d%0a  "CityCode": ${loginRtn.data.UInfo.CityCode}%0d%0a};`
                }
            })
        console.log(steps[stepId - 1], stepRtn.status, stepRtn.data.result, stepRtn.data.msg)
    }
}

let methods = {};
methods.anquanxuexi = _seeVideo;
methods.zhuantihuodong = _doSign;
methods.jiaqihuodong = _doSign2;

async function study(accounts, type, method) {
    console.log(`==========================\n即将开始对 ${accounts.length} 个账号进行自动任务。`)
    if (type === 0) { // 并发
        accounts.map(v => method(v.split("/")[0], v.split("/")[1]))
    } else if (type === 1) { // 顺次
        for (processingId = 0; processingId < accounts.length; processingId++) {
            console.log('==========================')
            console.log('正在处理', accounts[processingId].split("/")[0], accounts[processingId].split("/")[1])
            await method(accounts[processingId].split("/")[0], accounts[processingId].split("/")[1])
        }
        console.log('==========================\n已完成。\n==========================')
    } else {
        console.log('==========================\n无法理解的操作类型。\n==========================')
    }
}

throw new Error ("学生账号列表还是原始数据，请按照提示更改。");
// 获取 accounts 请访问并登录
// https://wenzhou.xueanquan.com/EduAdmin/Home/Index#ClassManagement_Manage
// [...document.querySelectorAll('div.gridTbody > table > tbody > tr')].map(v => v.getAttribute("rel"))
// 在控制台键入以上 js 代码取账号列表并粘贴到以下声明中。
let accounts = [];



study(accounts, 1, methods.zhuantihuodong);
study(accounts, 1, methods.jiaqihuodong);
study(accounts, 1, methods.anquanxuexi);
