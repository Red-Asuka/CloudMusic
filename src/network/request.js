import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://catbk.cn:3000'
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config;
})

// 获取轮播图数据
export function getBanner(param) {
  return axios.post('/banner', param)
}

// 获取推荐歌单
export function getPersonalizedPlaylist(param) {
  return axios.post('personalized/playlist', param)
}

// 获取最新歌曲
export function getPersonalizedNewsong(param) {
  return axios.post('personalized/newsong', param)
}

// 获取推荐MV
export function getPersonalizedMv() {
  return axios.post('personalized/mv')
}

// 获取歌曲播放地址
export function getMusicUrl(id) {
  return axios.post(`song/url?id=${id}&br=999000`)
}

// 获取精品歌单
export function getTopPlaylist(param) {
  return axios.post('/top/playlist/highquality', param)
}

// 获取歌单列表
export function getPalylist(param) {
  return axios.post('/top/playlist', param)
}

// 获取最新音乐
export function getNewSongs(param) {
  return axios.post('/top/song', param)
}

// 获取Mv列表
export function getMvs(param) {
  return axios.post('/mv/all', param)
}

// 查询
export function search(param) {
  return axios.post('search/get', param)
}

// 获取歌单详情
export function getPlaylistDetail(param) {
  return axios.post('/playlist/detail', param)
}

// // 获取歌单评论
// export function getPlaylistComments(id, param) {
//   return axios.post(`v1/resource/comments/A_PL_0_${id}`, param)
// }
// 获取歌单评论
export function getPlaylistComments(id, param) {
  return axios.post('/comment/playlist', param)
}

// 获取MV播放地址
export function getMvUrl(param) {
  return axios.post(`/mv/url`, param)
}

// 获取MV详情
export function getMvDetail(param) {
  return axios.post(`/mv/detail`, param)
}

// 获取歌手头像
// export function getArtistIcon(id, param) {
//   return axios.post(`v1/artist/${id}`, param)
// }
// 获取歌手头像
export function getArtistIcon(param) {
  return axios.post('/artists', param)
}

// 获取MV评论
// export function getMvComment(id, param) {
//   return axios.post(`v1/resource/comments/R_MV_5_${id}`, param)
// }
export function getMvComment(id, param) {
  return axios.post('/comment/mv', param)
}

// 获取相关MV
export function getSimiMvUrl(param) {
  return axios.post('/simi/mv', param)
}