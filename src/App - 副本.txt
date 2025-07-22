<template>
  <div class="bench-container" v-if="initialized">
    <!-- 筛选区内容保持不变 -->
  </div>
  <div v-else class="loading-overlay">
    <div class="loader"></div>
    <p>正在加载硬件数据...</p>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import LineChart from './components/LineChart.vue'

// 注册Chart.js
import { Chart } from 'chart.js'
Chart.register();

export default {
  components: { LineChart },
  data() {
    return {
      initialized: false,
      // 其他数据属性保持不变
    }
  },
  mounted() {
    this.initializeApp();
  },
  methods: {
    async initializeApp() {
      try {
        // 等待API服务就绪
        await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        
        // 初始数据加载
        await this.fetchData();
        
        // 标记初始化完成
        this.initialized = true;
      } catch (error) {
        console.log('使用模拟数据展示');
        // 使用模拟数据
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
    // 其他方法保持不变
  }
}
</script>

<style scoped>
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
