import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import AuthCallback from '../components/AuthCallback.vue'

const routes = [
  {
    path: '/',
    component: App
  },
  {
    path: '/auth-callback',
    name: 'AuthCallback',
    component: AuthCallback
  },
  {
    path: '/login',
    beforeEnter: (to, from, next) => {
      localStorage.setItem('redirectAfterLogin', from.fullPath);
      next();
    },
    redirect: '/'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 添加路由守卫检查认证状态
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('supabase_user');
  
  // 需要认证的路由示例（实际根据业务添加）
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth && !user) {
    next('/login');
  } else {
    next();
  }
});

export default router;