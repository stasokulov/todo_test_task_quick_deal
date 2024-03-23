<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todos'
import ListItem from '@/components/ListItem.vue'
import PlusIcon from '@/components/icons/IconPlus.vue'

const todoStore = useTodoStore()
const { sortedTodoListGetter, isEditModeGetter } = storeToRefs(todoStore)
const { addTask } = todoStore
</script>

<template>
  <v-container class="todo-list">
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <h1>ToDo list page</h1>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" class="todo-list__add-button-row">
      <v-col cols="auto">
        <v-btn
          v-if="!isEditModeGetter"
          elevation="4"
          icon="mdi-plus"
          variant="tonal"
          @click="addTask"
        >
          <PlusIcon />
        </v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <ul>
          <ListItem v-for="task in sortedTodoListGetter" :key="task.id" :task="task" />
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.todo-list__add-button-row {
  height: 80px;
}
</style>
