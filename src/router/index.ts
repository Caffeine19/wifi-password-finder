import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainVIew/MainView'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'main'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView
    }
  ]
})

export default router
