import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: App
    },
    // GitHub Pages 刷新处理
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
