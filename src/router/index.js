import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@com/Login.vue'
import Home from '@com/Home/home.vue'
Vue.use(VueRouter)

  const routes = [
    {
      // 重定向redirect
      path:'/',redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },{
      path:'/home',
      component:Home
    }

]

const router = new VueRouter({
  routes
})

export default router
