# 远程桌面监控客户端

远程桌面监控客户端

启动[服务端](https://github.com/lingxiaoguang/remote-monitor-server)后，客户端输入ip和端口号，就可以操纵服务端的桌面。

![](./remote-monitor.gif)
![1](case1.png)
![2](case2.png)

# 安装 和 运行

有两种方式，一种为网页，一种为electron应用，推荐网页的方式

#### 网页的方式:

```
yarn global add remote-monitor-client-web

remote-monitor-client-web 
```
#### electron应用的方式

首先下载项目，然后
```
npm run build
```
之后安装对应的安装包即可（目前只支持mac）


# 原理

见 [Node.js实现远程桌面监控](https://juejin.im/post/5d18d4c36fb9a07ecb0bbe7b)





