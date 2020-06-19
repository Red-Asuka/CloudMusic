<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url" autoplay></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon+'?param=250y150'" alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="hotComments !== undefined && hotComments.length !== 0">
        <p class="title">
          精彩评论<span class="number">({{ hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ total }})</span>
        </p>
        <div class="comments-wrap">
          <!-- 评论 -->
          <div class="item" v-for="(item, index) in comments" :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}</span>
                <span class="comment">：{{ item.content }}</span>
              </div>
              <!-- 回复 -->
              <div class="re-content" v-if="item.beReplied.length !== 0">
                <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                <span class="comment">：{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | dateFormat }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simiMvs" :key="index" @click="playMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover+'?param=250y150'" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvUrl, getMvDetail, getArtistIcon, getMvComment, getSimiMvUrl } from 'network/request'

export default {
  name: 'mv',
  data() {
    return {
      id: '',
      // 总条数
      total: 20,
      // 页码
      pageNum: 1,
      // 页容量
      pageSize: 10,
      // mv地址
      url: '',
      mvInfo: {},
      simiMvs: [],
      icon: '',
      hotComments: [],
      comments: []
    }
  },
  created() {
    this.$pubSub.publish('pauseAudio')
    this.id = this.$route.query.id
    this._getMvUrl()
    this._getMvDetail()
    this._getSimiMvUrl()
    this._getMvComment()
  },

  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
      this._getMvComment()
    },
    // 获取MV播放地址
    async _getMvUrl() {
      const { data: resp } = await getMvUrl({
        id: this.id,
        r: 1080
      })
      this.url = resp.data.url
    },

    // 获取MV详情
    async _getMvDetail() {
      const { data: resp } = await getMvDetail({
        mvid: this.id
      })
      this.mvInfo = resp.data
      // 获取歌手头像
      const { data: resp1 } = await getArtistIcon({
        id: this.mvInfo.artists[0].id
      })
      this.icon = resp1.artist.picUrl
    },

    // 获取MV评论
    async _getMvComment() {
      const { data: resp } = await getMvComment(this.id, {
        id: this.id,
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize
      })
      this.comments = resp.comments
      this.hotComments = resp.hotComments
      this.total = resp.total
    },

    // 获取相关MV
    async _getSimiMvUrl() {
      const { data: resp } = await getSimiMvUrl({
        mvid: this.id
      })
      this.simiMvs = resp.mvs
    },

    playMv(id) {
      this.pageNum = 1
      this.id = id
      this._getMvUrl()
      this._getMvDetail()
      this._getSimiMvUrl()
      this._getMvComment()
    }
  }
}
</script>

<style>
</style>
