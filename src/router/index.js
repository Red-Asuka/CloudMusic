import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入对应的路由
const discovery = () => import(/* webpackChunkName: "discovery" */ 'views/01.discovery.vue')
const playlists = () => import(/* webpackChunkName: "playlists" */ 'views/02.playlists.vue')
const songs = () => import(/* webpackChunkName: "songs" */ 'views/03.songs.vue')
const mvs = () => import(/* webpackChunkName: "mvs" */ 'views/04.mvs.vue')
const result = () => import(/* webpackChunkName: "result" */ 'views/05.result.vue')
const playlist = () => import(/* webpackChunkName: "playlist" */ 'views/06.playlist.vue')
const mv = () => import(/* webpackChunkName: "mv" */ 'views/07.mv.vue')

Vue.use(VueRouter)
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
    { path: '/', redirect: '/discovery' },
    { path: '/discovery', component: discovery },
    { path: '/playlists', component: playlists },
    { path: '/playlist', component: playlist },
    { path: '/songs', component: songs },
    { path: '/mvs', component: mvs },
    { path: '/mv', component: mv },
    { path: '/result', component: result }
  ]

const router = new VueRouter({
    routes
})

export default router