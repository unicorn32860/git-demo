<template>
  <el-card class="route-card">
    <div class="route-header">
      <div class="route-title">
        <h3>{{ route.name }}</h3>
        <el-tag size="small" :type="route.type === '经典' ? 'success' : 'warning'">
          {{ route.type }}路线
        </el-tag>
      </div>
      <div class="route-info">
        <span class="duration">
          <el-icon><Timer /></el-icon>
          {{ route.duration }}
        </span>
        <span class="distance">
          <el-icon><Location /></el-icon>
          {{ route.distance }}
        </span>
      </div>
    </div>

    <div class="route-content">
      <div class="route-spots">
        <div 
          v-for="(spot, index) in route.spots" 
          :key="spot.id" 
          class="spot-item"
        >
          <div class="spot-index">{{ index + 1 }}</div>
          <div class="spot-info">
            <h4>{{ spot.name }}</h4>
            <p>{{ spot.description }}</p>
            <div class="spot-tags">
              <el-tag 
                v-for="tag in spot.tags" 
                :key="tag"
                size="small"
                effect="plain"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <div class="spot-time">
            <el-icon><Timer /></el-icon>
            <span>建议游览{{ spot.suggestedTime }}</span>
          </div>
        </div>
      </div>

      <div class="route-map" ref="mapContainer"></div>
    </div>

    <div class="route-footer">
      <div class="route-stats">
        <div class="stat-item">
          <span class="label">景点数量</span>
          <span class="value">{{ route.spots.length }}个</span>
        </div>
        <div class="stat-item">
          <span class="label">交通方式</span>
          <span class="value">{{ route.transportation }}</span>
        </div>
        <div class="stat-item">
          <span class="label">适合人群</span>
          <span class="value">{{ route.suitableFor.join('、') }}</span>
        </div>
      </div>

      <div class="route-actions">
        <el-button type="primary" @click="handleStart">开始导航</el-button>
        <el-button @click="handleSave">保存路线</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Timer, Location } from '@element-plus/icons-vue'
import * as L from 'leaflet'

interface Spot {
  id: string | number
  name: string
  description: string
  tags: string[]
  suggestedTime: string
  location: [number, number]
}

interface RouteProps {
  route: {
    id: string | number
    name: string
    type: '经典' | '自定义'
    duration: string
    distance: string
    spots: Spot[]
    transportation: string
    suitableFor: string[]
  }
}

const props = defineProps<RouteProps>()
const emit = defineEmits(['start', 'save'])

const mapContainer = ref<HTMLElement>()
let map: L.Map | null = null

// 初始化地图
const initMap = () => {
  if (mapContainer.value) {
    map = L.map(mapContainer.value).setView([26.0745, 119.2965], 13)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    // 添加景点标记
    props.route.spots.forEach((spot, index) => {
      L.marker(spot.location)
        .bindPopup(`${index + 1}. ${spot.name}`)
        .addTo(map)
    })

    // 连接各个景点
    const latlngs = props.route.spots.map(spot => spot.location)
    L.polyline(latlngs, { color: '#409EFF' }).addTo(map)
  }
}

const handleStart = () => {
  emit('start', props.route.id)
}

const handleSave = () => {
  emit('save', props.route.id)
}

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  map?.remove()
})
</script>

<style scoped>
.route-card {
  margin-bottom: 20px;
}

.route-header {
  margin-bottom: 20px;

  .route-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    h3 {
      margin: 0;
      font-size: 18px;
      color: #303133;
    }
  }

  .route-info {
    display: flex;
    gap: 20px;
    color: #606266;
    font-size: 14px;

    span {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
}

.route-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  .route-spots {
    .spot-item {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f5f7fa;
      border-radius: 8px;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .spot-index {
        width: 24px;
        height: 24px;
        background: #409EFF;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
      }

      .spot-info {
        flex: 1;

        h4 {
          margin: 0 0 8px;
          font-size: 16px;
          color: #303133;
        }

        p {
          margin: 0 0 8px;
          font-size: 14px;
          color: #606266;
        }

        .spot-tags {
          display: flex;
          gap: 4px;
        }
      }

      .spot-time {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #909399;
        font-size: 12px;
      }
    }
  }

  .route-map {
    height: 300px;
    border-radius: 8px;
    overflow: hidden;
  }
}

.route-footer {
  border-top: 1px solid #ebeef5;
  padding-top: 20px;

  .route-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .stat-item {
      text-align: center;

      .label {
        display: block;
        font-size: 12px;
        color: #909399;
        margin-bottom: 4px;
      }

      .value {
        font-size: 14px;
        color: #303133;
      }
    }
  }

  .route-actions {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
}
</style> 