import { Todo } from 'types/todo'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  template: require('./AddTodoForm.html').default, // HTMLファイルを読み込む
})
export default class AddTodoForm extends Vue {
  @Prop() newTodoTitle!: string // 親コンポーネントから受け取る
  @Prop() newTodoDescription!: string

  // タイトルの変更を親に通知
  updateTitle(newTitle: string) {
    console.log('updateTitle', newTitle)
    // this.$emit("親で実行する関数名", "引数1","引数2","引数3");
    this.$emit('update-title', newTitle)
  }

  // 説明の変更を親に通知
  updateDescription(newDescription: string) {
    console.log('updateDescription', newDescription)
    this.$emit('update-description', newDescription)
  }

  /**下記の実装はReactの設計思想には適しているが、vueの思想には適していない
   * vueの場合は子が親に通知し、その発火を元に親がそのイベントをリッスンして処理を行うのが一般的
   */
  // // 親コンポーネントの addTodo を呼び出す
  // emitAddTodo() {
  //   const newTodo: Todo = {
  //     id: '', // IDは親コンポーネントで生成するので空にしておく
  //     title: this.newTodoTitle,
  //     description: this.newTodoDescription,
  //     completed: false, // 初期状態は未完了
  //   }
  //   // 親コンポーネントで受け取った addTodo メソッドを呼び出す
  //   this.addTodo(newTodo)
  // }

  emitAddTodo() {
    const newTodo = {
      id: '', // IDは親コンポーネントで生成するので空にしておく
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      completed: false, // 初期状態は未完了
    }
    console.log('emitAddTodo', newTodo)
    this.$emit('add-todo', newTodo) // 親にイベントを発火
  }
}
