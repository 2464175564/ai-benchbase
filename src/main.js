import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { supabase } from './supabase/client'

// 创建Vue应用
const app = createApp(App)

// 使用路由
app.use(router)

// 初始化Supabase会话
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' && session) {
    localStorage.setItem('supabase_user', JSON.stringify(session.user));
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem('supabase_user');
  }
});

// 延迟移除加载动画
setTimeout(() => {
  const loadingEl = document.getElementById('app-loading')
  if (loadingEl) {
    loadingEl.style.opacity = '0'
    setTimeout(() => {
      loadingEl.style.display = 'none'
    }, 500)
  }
}, 1000)

// 挂载到DOM
app.mount('#app')