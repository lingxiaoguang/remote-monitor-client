<template>
  <div class="screen-monitor">
    <img 
        class="screenshot" 
        :src="screenshot"
        :style="screenshotStyle"
        @mousedown="handleMouseEvent"
        @mousemove="handleMouseEvent" 
        @mouseup="handleMouseEvent"
        @click="handleMouseEvent"
        @dblclick="handleMouseEvent" 
    />
    <el-dialog 
        title="服务端IP和端口号" 
        :visible.sync="dialogFormVisible" 
        :close-on-click-modal="false"
        :close-on-press-escape="false">
      <el-input v-model="ipAndPort" autocomplete="off" placeholder="localhost:3000"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmChangeIp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import io from 'socket.io-client'

  export default {
    name: 'screen-monitor',
    data () {
      return {
        screenshot: '',
        screenshotStyle: '',
        dialogFormVisible: true,
        ipAndPort: ''
      }
    },
    methods: {
      handleKeyboardEvent (e) {
        this.socket && this.socket.emit('userevent', {
          type: 'keyboard',
          event: {
            type: e.type,
            keyName: e.key,
            keyCode: e.keyCode
          }
        })
      },
      handleMouseEvent (e) {
        this.socket && this.socket.emit('userevent', {
          type: 'mouse',
          event: {
            type: e.type,
            buttonType: e.buttons === 2 ? 'right' : 'left',
            x: e.offsetX,
            y: e.offsetY
          }
        })
      },
      initKeyboardEvent () {
        window.onkeyup = window.onkeydown = this.handleKeyboardEvent
      },
      initSocketIO () {
        let socket = this.socket = io('http://' + this.ipAndPort)
        socket.on('msg', (msg) => {
          console.log(msg)
        })
        socket.on('screenshot', (data) => {
          this.screenshot = data
        })
        socket.on('screensize', (screensize) => {
          console.log(screensize)
          this.screenshotStyle = {'width': screensize.width / 2 + 'px', 'height': screensize.height / 2 + 'px'}
        })
        socket.on('error', (err) => {
          alert('出错了' + err)
        })
        socket.on('connect_timeout', () => {
          alert('连接超时，请检查ip和端口是否正确')
          this.dialogFormVisible = true
        })
        socket.on('connect_error', () => {
          socket.close()
          alert('连接出错，请检查ip和端口是否正确')
          this.dialogFormVisible = true
        })
      },
      confirmChangeIp () {
        if (!this.ipAndPort || this.ipAndPort.indexOf(':') === -1) {
          alert('请输入合法的ip + 端口')
          return
        }
        this.dialogFormVisible = false
        this.initKeyboardEvent()
        this.initSocketIO()
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .screen-monitor .screenshot {
    width: 100%;
    height: auto;
    background: #ccc;
  }
</style>
