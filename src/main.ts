import Vue from 'vue'
import TodoList from './components/TodoList'
import store from './store' // Vuex ストアをインポート

window.onload = () => {
  new Vue({
    store, // Vuex ストアを登録
    el: '#app',
    components: {
      TodoList,
    },
  })
}
