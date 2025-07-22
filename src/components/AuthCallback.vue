<template>
  <div class="auth-loading">
    <div class="loader"></div>
    <p>正在验证登录状态...</p>
  </div>
</template>

<script>
import { supabase } from '../supabase/client'

export default {
  name: 'AuthCallback',
  async mounted() {
    try {
      // 检查URL中是否有错误参数
      const error = this.$route.query.error;
      if (error) throw new Error(`认证错误: ${error}`);
      
      // 获取会话信息
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw sessionError;
      
      if (session && session.user) {
        // 存储用户信息到本地存储
        localStorage.setItem('supabase_user', JSON.stringify(session.user));
        
        // 检查是否有重定向URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        
        // 重定向到原页面
        this.$router.push(redirectUrl);
      } else {
        this.$router.push('/');
      }
    } catch (error) {
      console.error('认证失败:', error);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.auth-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  z-index: 1000;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4285f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>