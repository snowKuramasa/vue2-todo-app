import Vue from 'vue'
import Vuex from 'vuex'
import todosModule from './modules/todos' // モジュールをインポート

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos: todosModule, // モジュールをstoreに登録
  },
})
