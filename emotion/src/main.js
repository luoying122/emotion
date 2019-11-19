import Vue from 'vue'
import App from './App'
import store from './store'
import './common/iconfont/iconfont.css'
Vue.prototype.$store = store;
Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
    env: 'your-cloudid'
})

const app = new Vue(App)
app.$mount()
