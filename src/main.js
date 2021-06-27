// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {
  Table,
  Carousel,
  Message
} from "element-ui"
import store from "./store"

Vue.config.productionTip = false

/* eslint-disable no-new */
Message.install = function(Vue) {
  Vue.prototype.$message = Message;
}
Vue.use(Vuex);
Vue.use(Message);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  let getFlag = localStorage.getItem("Flag");
  if (getFlag === "isLogin") {
    store.state.login.isLogin = true;
    store.state.login.userId = localStorage.getItem("userId");
    store.state.login.nick = localStorage.getItem("nick");
    store.state.login.sign = localStorage.getItem("sign");
    next();
  } else {
    if (to.meta.isLogin) {
      next(false);
      Vue.prototype.$message({
        message: "请先登录",
        type: "error"
      })
    } else {
      next();
    }
  } 
})

router.afterEach((route) => {
  window.scroll(0, 0);
})