<template>
  <div class="screen-monitor">
    <img 
        class="screenshot" 
        :src="screenshot"
        :style="screenshotStyle"
        @mousedown="handleMouseEvent"
        @mousemove="handleMouseEvent" 
        @mouseup="handleMouseEvent"
    />
    <el-dialog title="服务端IP" :visible.sync="dialogFormVisible">
      <el-input v-model="ip" autocomplete="off" placeholder="localhost"></el-input>
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
        ip: ''
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
            x: e.clientX,
            y: e.clientY
          }
        })
      },
      initKeyboardEvent () {
        window.onkeypress = window.onkeyup = window.onkeydown = this.handleKeyboardEvent
      },
      initSocketIO () {
        var socket = this.socket = io('http://' + this.ip + ':3000')
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
      },
      confirmChangeIp () {
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
