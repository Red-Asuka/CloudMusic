<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: tag === 0 }" @click="tag = 0">全部</span>
      <span class="item" :class="{ active: tag === 7 }" @click="tag = 7">华语</span>
      <span class="item" :class="{ active: tag === 96 }" @click="tag = 96">欧美</span>
      <span class="item" :class="{ active: tag === 8 }" @click="tag = 8">日本</span>
      <span class="item" :class="{ active: tag === 16 }" @click="tag = 16">韩国</span>
    </div>
    <!-- 底部的table -->
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
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl+'?param=130y130'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span v-if="item.mvid !== 0" class="iconfont icon-mv" @click="toMv(item.mvid)"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | playTimeFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getNewSongs, getMusicUrl } from 'network/request'

export default {
  name: 'songs',
  data() {
    return {
      songs: [],
      tag: 0
    }
  },

  created() {
    this._getNewSongs()
  },

  watch: {
    tag() {
      this._getNewSongs()
    }
  },
  methods: {
    // 获取最新音乐
    async _getNewSongs() {
      const { data: resp } = await getNewSongs({ type: this.tag })
      this.songs = resp.data.slice(0, 50)
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
