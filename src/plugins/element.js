import Vue from 'vue'
import {
    Carousel,
    CarouselItem,
    Pagination,
    Tabs,
    TabPane,
    Message,
    MessageBox,
} from 'element-ui'
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Pagination)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm