# 学校安全教育平台一键学习工具

获得一个班主任账号即可批量完成目前可以完成的任务。

![大家的得分排名页](https://i.loli.net/2021/06/07/Rk9hoXgQ1lCJvrd.png)

![我的得分排名页](https://i.loli.net/2021/06/07/K1EJ9TYlzIbZgSp.png)

## 安装

 - 安装 Yarn
```
$ npm install -g yarn
```
 - Clone 本项目到本地并安装相关依赖
```
$ git clone https://github.com/ENDsoft233/xueanquan.git
$ cd xueanquan
$ yarn install
```
 - 使用编辑器打开 ```index.js``` 文件，在其中填入您的相关信息
```
$ vim index.js
```
 - 启动项目
```
$ node index.js
```

![启动输出](https://i.loli.net/2021/06/07/v1jUkxzaEhSVpcW.png)

## 使用

主函数为 ```study```

用例：```study(["114514/student1919810"], 1, methods.zhuantihuodong);```

|参数名|类型|用法|
| :------------: | :------------: | :------------: |
|accounts|数组|数组成员要求包含学生UID和学生ID，用斜杠分割|
|type|整数|0 或 1，对应并发与顺次执行。|
|method|函数|已经定义变量methods，见下。|

### methods

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L117-L119

## 配置

使用前，您需要配置部分代码，才可以正常使用。

### accounts

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L138-L141

批量操作前需要先获取账号列表。

批量获取全班的列表，请访问并登录 ```https://wenzhou.xueanquan.com/EduAdmin/Home/Index#ClassManagement_Manage```，在控制台中键入以下代码并取返回内容粘贴到源代码中。

```
[...document.querySelectorAll('div.gridTbody > table > tbody > tr')].map(v => v.getAttribute("rel"))
```

![操作示例](https://i.loli.net/2021/06/07/LlRh6DX2qISnxtF.png)

### adminCookie

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L29-L31

获取有管理权限的账号 Cookie，请访问下述地址并登录，按 F12 后刷新，在 Network 中复制 Cookie 并填入以下声明。

```
https://wenzhou.xueanquan.com/EduAdmin/Home/
```

![操作示例](https://i.loli.net/2021/06/07/eG3XMQcI8vamyE9.png)

### 安全学习的课程标识组

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L64-L71

在对应的安全学习页源代码第 87 行取 videoid,gid,courseid，第 542 行取 workid,fid,title。

```
https://wenzhou.xueanquan.com/JiaTing/EscapeSkill/SeeVideo.aspx?gid=${gid}&li=${courseid}
```

![操作示例](https://i.loli.net/2021/06/07/lnVykYiARUjMIuf.png)

![操作示例2](https://i.loli.net/2021/06/07/qtJ9vNY8nCrlgzM.png)

### 专题活动的活动标识组

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L101-L102

打开专题活动页，按 F12 调出 Console，输入 specialId 取该专题活动的 specialId。

![操作示例](https://i.loli.net/2021/06/07/5hDR2397gIH4dbT.png)

不同专题的完成步数查看方法

![操作示例](https://i.loli.net/2021/06/07/wtvznAo5VbFalIy.png)

## 贡献

欢迎贡献本项目帮助本项目变得更好，在此提前表达感谢！

请直接提交 PR 到本项目。

## 问题

有问题可以发 issue，如果在能力范围之内我可以帮助你解决。

本代码以 温州市(浙江省) 为 安全教育平台的 serverside 进行编写，不同地域可能存在差异，使用前可能需要替换 ```wenzhou``` 为您所在省市，敬请测试。

## 授权

GNU GENERAL PUBLIC LICENSE Version 3
