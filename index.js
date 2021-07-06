const { default: axios } = require('axios')
const qs = require('qs');
const urlencode = require('urlencode');
let config;
try {
    config = require('./config.js');
}
catch{
    throw new Error ("请将 config_template.js 重命名为 config.js 并按提示修改该文件。")
}


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
            let adminCookie = config.adminCookie;
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

    let skill = config.skill;
    let videoid = skill.videoid;
    let gid = skill.gid;
    let courseid = skill.courseid;
    let workid = skill.workid;
    let fid = skill.fid;
    let title = skill.title;

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

async function _doSign(userId, userAccount, reseted) {

    let loginRtn = await _login(userId, userAccount, false)
    if (loginRtn.data?.Code !== 1) return;

    let special = config.special;
    let specialId = special.specialId;
    let steps = special.steps;

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

async function _doSign2(userId, userAccount, reseted) {

    let loginRtn = await _login(userId, userAccount, false)
    if (loginRtn.data?.Code !== 1) return;

    let holiday = config.holiday;
    let schoolYear = holiday.schoolYear;
    let semester = holiday.semester;
    let steps = holiday.steps;

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

let methods = [_seeVideo,_doSign,_doSign2];

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
let accounts = config.accounts;
let method = config.willDo;

if (method = 3) {
    console.log(`==========================\n欢迎使用，您已经填入了 ${accounts.length} 个账号，${config.adminCookie === "" ? "还未填写" : "已经填写了"}管理员 Cookie${config.adminCookie === "" ? "，请仔细阅读 config.js 中的注释提示" : "，请更换 willDo 中的 method 方式开始操作"}。`)
    console.log('==========================\n已完成。\n==========================')
} else study(accounts, 1, methods[method]);