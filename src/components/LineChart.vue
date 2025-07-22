<template>
  <div class="chart-wrapper">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

export default {
  props: {
    chartData: Object,
    options: Object
  },
  
  mounted() {
    this.initChart();
  },
  
  methods: {
    initChart() {
      if (!this.$refs.chartCanvas) return;
      
      // 清理旧实例
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      
      // 创建新图表
      Chart.register(...registerables);
      this.chartInstance = new Chart(this.$refs.chartCanvas, {
        type: 'line',
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'AI硬件性能对比',
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(200, 200, 200, 0.1)'
              }
            },
            x: {
              grid: {
                color: 'rgba(200, 200, 200, 0.1)'
              }
            }
          },
          ...this.options
        }
      });
    }
  },
  
  watch: {
    chartData: {
      handler(newData) {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      deep: true
    },
    
    options: {
      handler(newOptions) {
        if (this.chartInstance) {
          this.chartInstance.options = {
            ...this.chartInstance.options,
            ...newOptions
          };
          this.chartInstance.update();
        }
      },
      deep: true
    }
  },
  
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  height: 60vh;
  min-height: 400px;
  width: 100%;
}
</style>
