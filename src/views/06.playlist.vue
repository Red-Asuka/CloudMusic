<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- 神经病VUE,不加v-if="playlist.creator !== undefined" 报错 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" v-if="playlist.creator !== undefined" alt="" />
          <!-- 名字 -->
          <span class="name" v-if="playlist.creator !== undefined">{{ playlist.creator.nickname }}</span>
          <!-- 时间 -->
          <span class="time">{{ playlist.createTime | dateFormat }}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in playlist.tracks" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item.id)">
                  <img :src="item.al.picUrl+'?param=130y130'" alt="" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mv !== 0" class="iconfont icon-mv" @click="toMv(item.mv)"></span>
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="2">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMusicUrl, getPlaylistDetail, getPlaylistComments } from 'network/request'

export default {
  name: 'playlist',
  data() {
    return {
      id: '',
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,

      playlist: {},
      hotComments: [],
      comments: []
    }
  },
  created() {
    this.id = this.$route.query.id
    this._getPlaylistDetail()
    // this.getHotComments()
    this._getPlaylistComments()
  },
  methods: {
    handleCurrentChange(val) {
      this.pageNum = val
      this._getPlaylistComments()
    },

    // 获取歌单详情
    async _getPlaylistDetail() {
      const { data: resp } = await getPlaylistDetail({
        id: this.id,
        n: 100000
      })
      this.avatarUrl = resp.playlist.creator.avatarUrl
      this.nickname = resp.playlist.creator.nickname
      this.playlist = resp.playlist
    },

    // 获取热评
    /*     async getHotComments() {
      const { data: resp } = await this.$http.post(`v1/resource/hotcomments/A_PL_0_${this.id}`, {
        rid: this.id,
        limit: 20,
        offset: 0
      })
      this.hotComments = resp.hotComments
      this.hotCount = resp.total
    }, */

    // 获取歌单评论
    async _getPlaylistComments() {
      const { data: resp } = await getPlaylistComments(this.id, {
        id: this.id,
        limit: this.pageSize,
        offset: (this.pageNum - 1) * this.pageSize
      })
      this.comments = resp.comments
      this.hotComments = resp.hotComments
      this.total = resp.total
    },

    async playMusic(id) {
      // 设置给父组件的播放地址
      // this.$parent.musicUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`      
      
      // 获取歌曲播放地址
      const { data: resp } = await getMusicUrl(id)
      console.log(resp)
      
      if (!resp.data[0].url) {
        return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
      }
      // 设置给父组件的播放地址
      this.$parent.musicUrl = resp.data[0].url
    },

    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  }
}
</script>

<style >
</style>
