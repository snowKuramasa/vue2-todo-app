import { Module } from 'vuex'
import { Todo } from 'types/todo'

interface TodosState {
  todos: Todo[]
}

const todosModule: Module<TodosState, any> = {
  namespaced: true, // 名前空間を有効化
  // アプリケーションの状態を保持する中心的な場所
  // すべてのコンポーネントで共有されるデータを格納する
  state: {
    todos: [] as Todo[], // タスクのリスト
  },

  // Vuexのstateを直接変更するための関数
  // ★簡単なロジックや同期的な処理の場合は、mutation のみで十分
  // ★非同期処理（例: API 呼び出し）を含む場合は、action を使用する
  mutations: {
    addTodo(state, todo: Todo) {
      state.todos.push(todo) // タスクを追加
      console.log('vuex addTodo')
    },
    toggleTodoCompletion(state, id: string) {
      const todo = state.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed // 完了状態をトグル
        console.log('vuex toggleTodoCompletion')
      }
    },
    removeTodo(state, id: string) {
      state.todos = state.todos.filter((todo) => todo.id !== id) // タスクを削除
      console.log('vuex removeTodo')
    },
  },
  // 非同期処理や複雑なロジックを実行し、その結果を mutation に渡して state を変更する
  // commit を使って mutation を呼び出す
  actions: {
    addTodo({ commit }, todo: Todo) {
      commit('addTodo', todo) // タスクを追加
    },
    toggleTodoCompletion({ commit }, id: string) {
      commit('toggleTodoCompletion', id) // 完了状態をトグル
    },
    removeTodo({ commit }, id: string) {
      commit('removeTodo', id) // タスクを削除
    },
  },

  // getters は、Vuex の state を基に計算された値を取得するための仕組み
  // Vue コンポーネントの computed プロパティに似た役割
  // 【特徴】
  // 状態の派生: state を加工して新しい値を計算する
  // キャッシュ: Vue のリアクティブシステムにより、state が変更されない限り計算結果をキャッシュする
  // 再利用可能: 複数のコンポーネントで同じロジックを再利用できる
  getters: {
    todos: (state) => state.todos, // 全てのタスクを取得
    completedTodos: (state) => state.todos.filter((todo) => todo.completed), // 完了済みのタスクを取得
    incompleteTodos: (state) => state.todos.filter((todo) => !todo.completed), // 未完了のタスクを取得
    todoCount: (state) => state.todos.length, // タスクの総数を取得
  },
}

export default todosModule
