import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '../views/TodoListView.vue'

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_APP_BASE_URL : ''
const homeLink = `${baseURL}/`
const todoListLink = `${baseURL}/todo-list`

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // path: '/',
      path: homeLink,
      name: 'home',
      component: HomeView
    },
    {
      // path: '/todo-list',
      path: todoListLink,
      name: 'todo-list',
      component: TodoListView
    }
  ]
})

export default router
