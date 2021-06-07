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

![启动输出](https://i.loli.net/2021/06/07/2jFONlBbE8VfChs.png)

## 使用

主函数为 ```study```

用例：```study(["114514/student1919810"], 1, methods.zhuantihuodong);```

|参数名|类型|用法|
| :------------: | :------------: | :------------: |
|accounts|数组|数组成员要求包含学生UID和学生ID，用反斜杠分割|
|type|整数|0 或 1，对应并发与顺次执行。|
|method|函数|已经定义变量methods，见下。|

### methods

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L117-L119

## 配置

使用前，您需要配置部分代码，才可以正常使用。

### accounts

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L138-L141

### adminCookie

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L29-L31

### 安全学习的课程标识组

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L64-L71

### 专题活动的活动标识组

https://github.com/ENDsoft233/xueanquan/blob/d952206a23100c90ce6a820ea5f59112e99f1430/index.js#L101-L102

## 贡献

欢迎贡献本项目帮助本项目变得更好，在此提前表达感谢！

请直接提交 PR 到本项目。

## 问题

有问题可以发 issue，如果在能力范围之内我可以帮助你解决。

本代码以 温州市(浙江省) 为 安全教育平台的 serverside 进行编写，不同地域可能存在差异，使用前可能需要替换 ```wenzhou``` 为您所在省市，敬请测试。

## 授权

GNU GENERAL PUBLIC LICENSE Version 3