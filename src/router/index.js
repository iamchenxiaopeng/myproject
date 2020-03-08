import Vue from 'vue'
import Router from 'vue-router'

import pcedit from '@/pages/other/pcedit.vue'

import componentList from '@/pages/my/componentList.vue'
import echarts from '@/components/echarts.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pcedit'
    },
    {
      path: '/pcedit',
      name: 'pcedit',
      component: pcedit,
      meta: {
        title: 'emoji'
      }
    },
    {
      path: '/componentList',
      name: 'componentList',
      component: componentList,
      meta: {
        title: '组件列表'
      }
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: echarts,
      meta: {
        title: 'echart'
      }
    },
  ],
  
})
