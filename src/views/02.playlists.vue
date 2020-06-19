<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topPlayList.coverImgUrl+'?param=200y200'" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topPlayList.title }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topPlayList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topPlayList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>

    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" @click="tag = '全部'" :class="{ active: tag === '全部' }">全部</span>
        <span class="item" @click="tag = '欧美'" :class="{ active: tag === '欧美' }">欧美</span>
        <span class="item" @click="tag = '华语'" :class="{ active: tag === '华语' }">华语</span>
        <span class="item" @click="tag = '流行'" :class="{ active: tag === '流行' }">流行</span>
        <span class="item" @click="tag = '说唱'" :class="{ active: tag === '说唱' }">说唱</span>
        <span class="item" @click="tag = '摇滚'" :class="{ active: tag === '摇滚' }">摇滚</span>
        <span class="item" @click="tag = '民谣'" :class="{ active: tag === '民谣' }">民谣</span>
        <span class="item" @click="tag = '电子'" :class="{ active: tag === '电子' }">电子</span>
        <span class="item" @click="tag = '轻音乐'" :class="{ active: tag === '轻音乐' }">轻音乐</span>
        <span class="item" @click="tag = '影视原声'" :class="{ active: tag === '影视原声' }">影视原声</span>
        <span class="item" @click="tag = 'ACG'" :class="{ active: tag === 'ACG' }">ACG</span>
        <span class="item" @click="tag = '怀旧'" :class="{ active: tag === '怀旧' }">怀旧</span>
        <span class="item" @click="tag = '治愈'" :class="{ active: tag === '治愈' }">治愈</span>
        <span class="item" @click="tag = '旅行'" :class="{ active: tag === '旅行' }">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in playlists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
import { getTopPlaylist, getPalylist } from 'network/request'

export default {
  name: 'recommend',
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,
      tag: '全部',
      // 顶部精品歌单
      topPlayList: {},
      // 歌单列表
      playlists: []
    }
  },

  async created() {
    this._getTopPlaylist()
    this._getPlaylist()
  },

  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val
      // 重新获取数据
      this._getPlaylist()
    },

    // 获取精品歌单
    async _getTopPlaylist() {
      const { data: resp } = await getTopPlaylist({ cat: this.tag, limit: 1 })
      this.topPlayList = resp.playlists[0]
    },

    // 获取歌单列表
    async _getPlaylist() {
      const { data: resp } = await getPalylist({
        cat: this.tag,
        limit: this.pageSize,
        total: true,
        offset: (this.pageNum - 1) * this.pageSize,
        order: 'hot'
      })
      this.playlists = resp.playlists
      this.total = resp.total
    },

    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`)
    }
  },
  //　监听器
  watch: {
    tag() {
      this.pageNum = 1
      this._getTopPlaylist()
      this._getPlaylist()
    }
  }
}
</script>

<style >
</style>
