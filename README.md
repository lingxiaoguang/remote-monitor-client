# Remote Desktop Monitor Client

Language: [中文](README_zh.md) / [English](README.md)

Remote Desktop Monitor Client

First, start the server.Then, input the ip and port in [client](https://github.com/lingxiaoguang/remote-monitor-client)
and now you can monitor and operate the desktop of server.

![](./remote-monitor.gif)
![1](case1.png)
![2](case2.png)

# Installation And Run

There are two ways. One is web app, the other is electron app.( web page is recommened)

#### web page

```
yarn global add remote-monitor-client-web

remote-monitor-client-web 
```
#### electron app

First, download the project 
Then, 
```
npm run build
```
After, run the install package. (Only support mac now)

# Implemetion

[Node.js实现远程桌面监控](https://juejin.im/post/5d18d4c36fb9a07ecb0bbe7b)

