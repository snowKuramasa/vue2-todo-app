<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from './components/TodoList.ts';
import MyComponent from './components/MyComponent';

@Component({
  components: {
    TodoList,
  },
})
export default class App extends Vue { }
</script>