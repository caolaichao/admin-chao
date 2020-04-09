import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//导入字体图标
import "./assets/fonts/iconfont.css"
//导入全局样式表
import './assets/css/global.css'
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/login') {
    localStorage.clear()
    next()
  } else {
    var token = localStorage.getItem('token')
    if (!token) return next('/login')
    next()
  }
  //     next()
  //   }else{
  //     var token=localStorage.getItem('token')
  //     if(token){
  //       next()
  //     }else{
  //     //  next({path:'/login'})
  //     // 如果不存在token则直接跳转到登录页面,并且附带原来要跳转的地址
  //     // next({path:'/login',query:{redirect:to.path}})
  //     }
  //   }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
