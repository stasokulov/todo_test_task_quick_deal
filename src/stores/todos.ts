import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export type TTaskId = number | string
export type TTask = {
  id: TTaskId
  text: string
  isDone: boolean
  isEditMode: boolean
}
export type TTodoList = TTask[] | []

export const useTodoStore = defineStore('todoStore', () => {
  // State
  const idCount = ref<number>(0)
  const todoList = ref<TTodoList>([])

  // Getters
  const sortedTodoListGetter = computed(() => {
    return [
      ...todoList.value.filter((task) => !task.isDone),
      ...todoList.value.filter((task) => task.isDone)
    ]
  })
  const isEditModeGetter = computed(() => {
    return !!todoList.value.find((task) => task.isEditMode)
  })

  // Actions
  const incrementTaskId = (): void => {
    idCount.value++
  }
  const getTaskById = (id: TTaskId): TTask | undefined =>
    todoList.value.find((task) => task.id === id)
  const addTask = (): void => {
    incrementTaskId()
    const newTask: TTask = {
      id: idCount.value,
      text: '',
      isDone: false,
      isEditMode: false
    }
    // Конструкция todoList.value.unshift(newTask) приводит к ошибке типа (требует, чтобы newTask имел тип never)
    todoList.value = [newTask, ...todoList.value]
    saveInLocalStorage()
  }
  const deleteTask = (id: TTaskId): void => {
    todoList.value = todoList.value.filter((todo) => todo.id !== id)
    saveInLocalStorage()
  }
  const updateTask = (id: TTaskId, text: string): void => {
    if (!text) return
    const targetTask = todoList.value.find((task) => task.id === id)
    if (!targetTask) return
    targetTask.text = text
    saveInLocalStorage()
  }
  const toggleIsDone = (id: TTaskId): void => {
    const task = getTaskById(id)
    if (!task) return
    task.isDone = !task.isDone
  }
  const setTodoFromLocalStorage = (): void => {
    if (!stateLocalStorage?.value) return
    todoList.value = stateLocalStorage.value.todoListInStorage
      .filter((task) => task.text)
      .map((task) => {
        task.isEditMode = false
        return task
      })
    idCount.value = stateLocalStorage.value.idCountInStorage
  }
  const saveInLocalStorage = (): void => {
    stateLocalStorage.value.todoListInStorage = [...todoList.value]
    stateLocalStorage.value.idCountInStorage = idCount.value
  }
  const setIsEditMode = (id: TTaskId, bool: boolean): void => {
    const task = getTaskById(id)
    if (!task) return
    task.isEditMode = bool
  }

  // Others
  const stateLocalStorage = useStorage('todoList', {
    todoListInStorage: todoList.value,
    idCountInStorage: idCount.value
  })

  onMounted(() => {
    setTodoFromLocalStorage()
  })

  return {
    todoList,
    sortedTodoListGetter,
    isEditModeGetter,
    addTask,
    deleteTask,
    updateTask,
    toggleIsDone,
    setIsEditMode
  }
})
