import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoListView from '../views/TodoListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // path: '/',
      path: `${import.meta.env.VITE_APP_BASE_URL}/`,
      name: 'home',
      component: HomeView
    },
    {
      // path: '/todo-list',
      path: `${import.meta.env.VITE_APP_BASE_URL}/todo-list`,
      name: 'todo-list',
      component: TodoListView
    }
  ]
})

export default router
