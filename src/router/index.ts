import { createRouter, createWebHashHistory } from 'vue-router'

import MainView from '@/views/MainVIew/MainView'
const router = createRouter({
  history: createWebHashHistory(),
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
    },
    {
      path: '/behindTheScenes',
      name: 'behind-the-scenes',
      component: () => import('@/views/BehindTheScenesView/BehindTheScenesView')
    }
  ]
})

export default router
