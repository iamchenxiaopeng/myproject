import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
// import ajax from '../configs/ajax'
import state from './state'
import mutations from './mutations'
// import createLogger from 'vuex/dist/logger'  // vuex的插件，可在控制台打印一个log日志，显示state做了哪些修改

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'  // 开发时使用的模式，上线时就不用了

export default new Vuex.Store({
  actions,
  state,
  mutations
})