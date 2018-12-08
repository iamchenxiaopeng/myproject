import Vue from 'vue'
import Router from 'vue-router'

import pcedit from '@/pages/other/pcedit.vue'

import feedBack from '@/pages/my/feedBack.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pcedit',
      name: 'pcedit',
      component: pcedit,
      meta: {
        title: '编辑'
      }
    },
    {
      path: '/',
      name: 'feedBack',
      component: feedBack,
      meta: {
        title: '意见反馈'
      }
    },
  ],
  
})
