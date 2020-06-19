<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home" @click="toHomeClick()"></span>
        <!-- <span class="iconfont icon-sami-select"></span> -->
        <span class="iconfont icon-full-screen" @click="getFullCreeen(btnStatus)"></span>
      </div>
      <!-- <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div> -->
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input type="text" autocomplete="off" placeholder="搜索" v-model="inputVal" @keyup.enter="toResult" class="el-input__inner" />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      query: '',
      inputVal: '',
      n: 0,
      btnStatus: 0
    }
  },
  methods: {
    toResult() {
      if (this.inputVal === '') {
        // 提示用户
        this.$message.warning('请输入内容!')
      } else {
        // 携带数据去搜索页面
        this.$router.push(`/result?q=${this.inputVal}`)
      }
    },
    toHomeClick() {
      if ('/discovery' === this.$route.path) {
        return
      }
      this.$router.push(`/discovery`)
    },
    //  点击实现全屏和退出全屏
    getFullCreeen(btnStatus) {
      this.btnStatus = this.btnStatus === 0 ? 1 : 0
      this.n++
      this.n % 2 == 0 ? this.outFullCreeen(document) : this.inFullCreeen(document.documentElement)
    },

    inFullCreeen(element) {
      let el = element
      let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
      if (typeof rfs != 'undefined' && rfs) {
        rfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    },

    outFullCreeen(element) {
      let el = element
      let cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
      if (typeof cfs != 'undefined' && cfs) {
        cfs.call(el)
      } else if (typeof window.ActiveXObject != 'undefined') {
        let wscript = new ActiveXObject('WScript.Shell')
        if (wscript != null) {
          wscript.SendKeys('{F11}')
        }
      }
    }
  }
}
</script>

<style scoped></style>
