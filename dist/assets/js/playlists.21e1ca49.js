(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["playlists"],{a804:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"playlists-container"},[s("div",{staticClass:"top-card"},[s("div",{staticClass:"icon-wrap"},[s("img",{attrs:{src:t.topPlayList.coverImgUrl+"?param=200y200",alt:""}})]),s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"tag"},[t._v("精品歌单")]),s("div",{staticClass:"title"},[t._v(" "+t._s(t.topPlayList.title)+" ")]),s("div",{staticClass:"info"},[t._v(" "+t._s(t.topPlayList.description)+" ")])]),s("img",{staticClass:"bg",attrs:{src:t.topPlayList.coverImgUrl,alt:""}}),s("div",{staticClass:"bg-mask"})]),s("div",{staticClass:"tab-container"},[s("div",{staticClass:"tab-bar"},[s("span",{staticClass:"item",class:{active:"全部"===t.tag},on:{click:function(a){t.tag="全部"}}},[t._v("全部")]),s("span",{staticClass:"item",class:{active:"欧美"===t.tag},on:{click:function(a){t.tag="欧美"}}},[t._v("欧美")]),s("span",{staticClass:"item",class:{active:"华语"===t.tag},on:{click:function(a){t.tag="华语"}}},[t._v("华语")]),s("span",{staticClass:"item",class:{active:"流行"===t.tag},on:{click:function(a){t.tag="流行"}}},[t._v("流行")]),s("span",{staticClass:"item",class:{active:"说唱"===t.tag},on:{click:function(a){t.tag="说唱"}}},[t._v("说唱")]),s("span",{staticClass:"item",class:{active:"摇滚"===t.tag},on:{click:function(a){t.tag="摇滚"}}},[t._v("摇滚")]),s("span",{staticClass:"item",class:{active:"民谣"===t.tag},on:{click:function(a){t.tag="民谣"}}},[t._v("民谣")]),s("span",{staticClass:"item",class:{active:"电子"===t.tag},on:{click:function(a){t.tag="电子"}}},[t._v("电子")]),s("span",{staticClass:"item",class:{active:"轻音乐"===t.tag},on:{click:function(a){t.tag="轻音乐"}}},[t._v("轻音乐")]),s("span",{staticClass:"item",class:{active:"影视原声"===t.tag},on:{click:function(a){t.tag="影视原声"}}},[t._v("影视原声")]),s("span",{staticClass:"item",class:{active:"ACG"===t.tag},on:{click:function(a){t.tag="ACG"}}},[t._v("ACG")]),s("span",{staticClass:"item",class:{active:"怀旧"===t.tag},on:{click:function(a){t.tag="怀旧"}}},[t._v("怀旧")]),s("span",{staticClass:"item",class:{active:"治愈"===t.tag},on:{click:function(a){t.tag="治愈"}}},[t._v("治愈")]),s("span",{staticClass:"item",class:{active:"旅行"===t.tag},on:{click:function(a){t.tag="旅行"}}},[t._v("旅行")])]),s("div",{staticClass:"tab-content"},[s("div",{staticClass:"items"},t._l(t.playlists,(function(a,i){return s("div",{key:i,staticClass:"item",on:{click:function(s){return t.toPlaylist(a.id)}}},[s("div",{staticClass:"img-wrap"},[s("div",{staticClass:"num-wrap"},[t._v(" 播放量: "),s("span",{staticClass:"num"},[t._v(t._s(a.playCount))])]),s("img",{attrs:{src:a.coverImgUrl+"?param=200y200",alt:""}}),s("span",{staticClass:"iconfont icon-play"})]),s("p",{staticClass:"name"},[t._v(t._s(a.name))])])})),0)])]),s("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.pageNum,"page-size":t.pageSize},on:{"current-change":t.handleCurrentChange}})],1)},c=[],n=(s("96cf"),s("1da1")),e=s("1bab"),l={name:"recommend",data:function(){return{total:0,pageNum:1,pageSize:10,tag:"全部",topPlayList:{},playlists:[]}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:t._getTopPlaylist(),t._getPlaylist();case 2:case"end":return a.stop()}}),a)})))()},methods:{handleCurrentChange:function(t){this.pageNum=t,this._getPlaylist()},_getTopPlaylist:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(e["p"])({cat:t.tag,limit:1});case 2:s=a.sent,i=s.data,t.topPlayList=i.playlists[0];case 5:case"end":return a.stop()}}),a)})))()},_getPlaylist:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,Object(e["i"])({cat:t.tag,limit:t.pageSize,total:!0,offset:(t.pageNum-1)*t.pageSize,order:"hot"});case 2:s=a.sent,i=s.data,t.playlists=i.playlists,t.total=i.total;case 6:case"end":return a.stop()}}),a)})))()},toPlaylist:function(t){this.$router.push("/playlist?id=".concat(t))}},watch:{tag:function(){this.pageNum=1,this._getTopPlaylist(),this._getPlaylist()}}},r=l,o=s("2877"),p=Object(o["a"])(r,i,c,!1,null,null,null);a["default"]=p.exports}}]);
//# sourceMappingURL=playlists.21e1ca49.js.map