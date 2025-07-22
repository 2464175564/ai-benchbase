<template>
  <div class="bench-container" v-if="initialized">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="logo">AI BenchBase</div>
      <div class="auth-section">
        <template v-if="currentUser">
          <span>欢迎, {{ currentUser.user_metadata.name || currentUser.email }}</span>
          <button @click="signOut" class="sign-out-btn">退出</button>
        </template>
        <button v-else @click="signIn" class="sign-in-btn">登录</button>
      </div>
    </div>
    
    <!-- 筛选区内容保持不变 -->
  </div>
  <div v-else class="loading-overlay">
    <div class="loader"></div>
    <p>正在加载硬件数据...</p>
  </div>
</template>

<script>
import { supabase, getCurrentUser, signIn, signOut } from './supabase/client'
import LineChart from './components/LineChart.vue'

export default {
  components: { LineChart },
  data() {
    return {
      initialized: false,
      currentUser: null,
      // 其他数据属性保持不变
      comparisonData: []
    }
  },
  mounted() {
    this.initializeApp();
  },
  methods: {
    async initializeApp() {
      // 检查用户登录状态
      this.currentUser = getCurrentUser()
      
      try {
        // 从Supabase获取数据
        const { data, error } = await supabase
          .from('hardware_benchmarks')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20)
        
        if (error) throw error
        
        this.comparisonData = data
        this.prepareChartData(data)
        this.initialized = true
      } catch (error) {
        console.error('数据库连接失败:', error)
        // 使用模拟数据作为后备
        this.comparisonData = [
          { id: 1, device: "NVIDIA RTX 4090", value: 90.5, created_at: "2023-10-05T14:30:00Z" },
          { id: 2, device: "AMD RX 7900 XTX", value: 78.2, created_at: "2023-10-05T15:15:00Z" },
          { id: 3, device: "Intel Arc A770", value: 42.3, created_at: "2023-10-05T16:20:00Z" },
          { id: 4, device: "Apple M2 Ultra", value: 85.7, created_at: "2023-10-06T09:45:00Z" },
          { id: 5, device: "NVIDIA A100", value: 95.8, created_at: "2023-10-06T11:30:00Z" }
        ];
        this.prepareChartData(this.comparisonData);
        this.initialized = true;
      }
    },
    
    signIn() {
      signIn()
    },
    
    signOut() {
      signOut()
    },
    
    // 其他方法保持不变
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4285f4;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sign-in-btn, .sign-out-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.sign-in-btn {
  background: #4285f4;
  color: white;
}

.sign-out-btn {
  background: #f5f7fa;
  border: 1px solid #e2e8f0;
}

/* 保留原有的加载样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #4285f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>