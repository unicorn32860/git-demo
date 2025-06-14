<template>
  <el-card class="weather-widget">
    <template #header>
      <div class="weather-header">
        <span>福州天气</span>
        <el-tag size="small" type="info">{{ updateTime }}</el-tag>
      </div>
    </template>
    <div class="weather-content">
      <div class="weather-main">
        <el-icon :size="40" class="weather-icon">
          <component :is="weatherIcon" />
        </el-icon>
        <div class="temperature">{{ weather.temperature }}°C</div>
      </div>
      <div class="weather-info">
        <div class="info-item">
          <span>天气：</span>
          <span>{{ weather.weather }}</span>
        </div>
        <div class="info-item">
          <span>风向：</span>
          <span>{{ weather.wind }}</span>
        </div>
        <div class="info-item">
          <span>湿度：</span>
          <span>{{ weather.humidity }}%</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { Sunny, Cloudy, Lightning, Moon } from '@element-plus/icons-vue'

const appStore = useAppStore()
const updateTime = ref('')

// 根据天气状况返回对应的图标
const weatherIcon = computed(() => {
  const weather = appStore.weather.weather
  switch (weather) {
    case '晴':
      return Sunny
    case '多云':
      return Cloudy
    case '雷阵雨':
      return Lightning
    case '夜间晴':
      return Moon
    default:
      return Sunny
  }
})

// 获取天气信息
const getWeather = async () => {
  try {
    const res = await fetch('/api/v1/weather')
    const data = await res.json()
    appStore.updateWeather(data)
    updateTime.value = new Date().toLocaleTimeString()
  } catch (error) {
    console.error('获取天气信息失败：', error)
  }
}

onMounted(() => {
  getWeather()
  // 每30分钟更新一次天气
  setInterval(getWeather, 30 * 60 * 1000)
})

const weather = computed(() => appStore.weather)
</script>

<style scoped>
.weather-widget {
  .weather-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .weather-content {
    padding: 10px 0;
  }

  .weather-main {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    .weather-icon {
      margin-right: 20px;
      color: var(--primary-color);
    }

    .temperature {
      font-size: 32px;
      font-weight: bold;
    }
  }

  .weather-info {
    .info-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      color: #666;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style> 