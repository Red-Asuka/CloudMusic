<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.q)">{{ $route.query.q }}</h2>
      <!-- <h2 class="title">{{ keywords }}</h2> -->
      <span class="sub-title">{{ count }}</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item, index) in songs" :key="index" @click="playMusic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span v-if="item.mvid !== 0" class="iconfont icon-mv" @click.stop="toMv(item.mvid)"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in playlists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playNumFormat }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
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
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { getMusicUrl, search } from 'network/request'

export default {
  name: 'result',
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,
      keywords: '',
      activeIndex: 'songs',
      songs: [],
      count: 0,
      playlists: [],
      mvs: [],
      songId: 0,
      type: 1
    }
  },

  created() {
    // this._search()
  },
  
  watch: {
    keywords() {
      this._search()
    },

    activeIndex() {
      switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.pageNum = 1
          break
        case 'lists':
          this.type = 1000
          this.pageNum = 1
          break
        case 'mv':
          this.type = 1004
          this.pageNum = 1
          break

        default:
          break
      }
      this._search()
    }
  },

  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val
      // 重新获取数据
      this._search()
    },

    async _search() {
      var timestamp = new Date().getTime()
      const { data: resp } = await search({
        timestamp: timestamp,
        keywords: this.keywords,
        type: this.type,
        limit: this.type === 1004 ? 8 : 10,
        offset: (this.pageNum - 1) * (this.type === 1004 ? 8 : 10)
      })
      if (resp.code !== 200) {
        return
      }
      if (this.type === 1) {
        this.songs = resp.result.songs
        this.count = resp.result.songCount
      } else if (this.type === 1000) {
        this.playlists = resp.result.playlists
        this.count = resp.result.playlistCount
      } else if (this.type === 1004) {
        this.mvs = resp.result.mvs
        this.count = resp.result.mvCount
      }
      this.total = this.count
    },

    async playMusic(id) {
      // 设置给父组件的播放地址
      // this.$parent.musicUrl = `http://music.163.com/song/media/outer/url?id=${id}.mp3`

      // 获取歌曲播放地址
      const { data: resp } = await getMusicUrl(id)
      if (!resp.data[0].url) {
        return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
      }
      // 设置给父组件的播放地址
      this.$parent.musicUrl = resp.data[0].url
    },

    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    },

    toMv(id) {
      this.$router.push(`/mv?id=${id}`)
    }
  }
}
</script>

<style >
</style>
