import { Todo } from 'types/todo'
import { Component, Vue } from 'vue-property-decorator'
import AddTodoForm from './AddTodoForm'
import './style.css'
import { v4 as uuidv4 } from 'uuid' // uuid をインポート

@Component({
  components: {
    AddTodoForm,
  },
  template: require('./TodoList.html').default, // HTMLファイルを読み込む
})
export default class TodoList extends Vue {
  newTodoTitle: string = '' // 新しいTODOのタイトル
  newTodoDescription: string = ''
  showModal: boolean = false // モーダルの表示状態

  // Vuex の todos を取得
  get todos(): Todo[] {
    return this.$store.getters['todos/todos']
  }

  handleAddTodo(todo: Todo) {
    console.log('emitAddTodo')
    const newTodo: Todo = {
      id: uuidv4(), // ユニークなIDを生成
      title: todo.title,
      description: todo.description,
      completed: false, // 初期状態は未完了
    }

    // dispatch を使ってコンポーネントからstoreのactionsを呼び出す
    this.$store.dispatch('todos/addTodo', newTodo)

    this.creaForm() // 入力フィールドを初期化
    this.closeModal() // モーダルを閉じる
  }

  creaForm() {
    //入力初期化
    this.newTodoTitle = ''
    this.newTodoDescription = ''
  }

  toggleTodoCompletion(todo: Todo) {
    this.$store.dispatch('todos/toggleTodoCompletion', todo.id) // Vuex に状態変更を通知
  }

  handleRemoveTodo(id: string) {
    const targetTodo = this.todos.find((todo: Todo) => todo.id === id) // 削除対象のTODOを検索
    alert(`${targetTodo?.title}を削除しますか？`) // 確認ダイアログを表示
    this.$store.dispatch('todos/removeTodo', id) // 名前空間を指定してアクションを呼び出す
  }

  closeModal() {
    console.log('closeModal')
    this.showModal = false // モーダルを閉じる
  }

  openModal() {
    console.log('openModal')
    this.showModal = true // モーダルを開く
  }

  //********** ライフサイクルフック **********/
  // Vue コンポーネントのライフサイクルに関連するメソッド

  get completedTodosCount(): number {
    return this.todos.filter((todo) => todo.completed)?.length // 完了済みのタスクを取得
  }

  get incompleteTodosCount(): number {
    return this.todos.filter((todo) => !todo.completed)?.length // 未完了のタスクを取得
  }

  beforeMount() {
    console.log('beforeMount')
  }
  beforeCreate() {
    console.log('beforeCreate')
  }
  created() {
    console.log('created')
  }
  mounted() {
    console.log('mounted')
  }
}
