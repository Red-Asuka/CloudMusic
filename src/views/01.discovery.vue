<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl+'?param=200y200'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>

    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newSongs" :key="index" @click="playMusic(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=130y130'" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=250y150'" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getPersonalizedPlaylist, getPersonalizedNewsong, getPersonalizedMv, getMusicUrl } from 'network/request'

export default {
  name: 'discovery',
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      playList: [],
      // 最新歌曲
      newSongs: {},
      mvs: []
    }
  },

  async created() {
    // 获取轮播图数据
    const { data: resp0 } = await getBanner({ clientType: '0' })
    console.log(resp0);
    
    this.banners = resp0.banners
    // 获取推荐歌单
    const { data: resp1 } = await getPersonalizedPlaylist({ limit: '10' })
    this.playList = resp1.result

    // 获取最新歌曲
    const { data: resp2 } = await getPersonalizedNewsong({ type: 'recommend' })
    this.newSongs = resp2.result

    // 获取推荐MV
    const { data: resp3 } = await getPersonalizedMv()
    this.mvs = resp3.result
  },

  methods: {
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
