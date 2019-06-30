# 远程桌面监控客户端

远程桌面监控客户端，通过socketio连接远程服务端，来实现实时监控，同时可以控制远程桌面

![1](./case1.png)
![2](./case2.png)


## 原理

 - 远程桌面监控：通过socketio传送一帧帧的图片base64字符串过来，通过改变img的src来实现监控
 - 控制：监控keydown、keyup、keypress、mousedown、mousemove、mouseup、click等事件，传送到服务端来执行

## 调试

首先启动[服务端](https://github.com/lingxiaoguang/remote-monitor-server)，然后 `yarn dev` 即可调试

## 打包

```
yarn build
```

