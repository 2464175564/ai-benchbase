import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 创建Vue应用
const app = createApp(App)

// 使用路由
app.use(router)

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

// 路由重定向处理
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect
  delete sessionStorage.redirect
  router.push(redirect)
}
