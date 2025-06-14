<template>
  <div class="map-view" ref="mapContainer">
    <div class="map-controls" v-if="showControls">
      <el-button-group>
        <el-button 
          v-for="layer in layers" 
          :key="layer.id"
          :type="currentLayer === layer.id ? 'primary' : 'default'"
          @click="switchLayer(layer.id)"
        >
          {{ layer.name }}
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as L from 'leaflet'
import { ElMessage } from 'element-plus'

const props = defineProps({
  center: {
    type: Array as unknown as () => [number, number],
    default: () => [26.0745, 119.2965] // 福州市中心坐标
  },
  zoom: {
    type: Number,
    default: 13
  },
  markers: {
    type: Array as unknown as () => Array<{
      id: string | number
      position: [number, number]
      title: string
      icon?: string
      popup?: string
    }>,
    default: () => []
  },
  showControls: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['marker-click', 'layer-change'])

const mapContainer = ref<HTMLElement | null>(null)
const map = ref<L.Map | null>(null)
const markersLayer = ref<L.LayerGroup | null>(null)
const currentLayer = ref('default')

const layers = [
  { id: 'default', name: '默认地图' },
  { id: 'satellite', name: '卫星地图' }
]

// 初始化地图
const initMap = () => {
  if (!mapContainer.value) return

  map.value = L.map(mapContainer.value).setView(props.center, props.zoom)
  
  // 添加默认图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)

  // 创建标记图层组
  markersLayer.value = L.layerGroup().addTo(map.value)

  // 添加缩放控件
  map.value.addControl(L.control.zoom({ position: 'bottomright' }))
}

// 更新标记
const updateMarkers = () => {
  if (!map.value || !markersLayer.value) return

  markersLayer.value.clearLayers()

  props.markers.forEach(marker => {
    const markerIcon = marker.icon
      ? L.icon({
          iconUrl: marker.icon,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        })
      : undefined

    const mapMarker = L.marker(marker.position, { icon: markerIcon })
      .bindPopup(marker.popup || marker.title)
      .on('click', () => emit('marker-click', marker))

    markersLayer.value?.addLayer(mapMarker)
  })
}

// 切换地图图层
const switchLayer = (layerId: string) => {
  if (!map.value) return
  
  currentLayer.value = layerId
  emit('layer-change', layerId)
  
  // 这里可以根据实际需求切换不同的地图图层
  ElMessage.info(`切换到${layerId === 'default' ? '默认' : '卫星'}地图`)
}

// 监听标记变化
watch(() => props.markers, updateMarkers, { deep: true })

// 监听中心点变化
watch(() => props.center, (newCenter) => {
  map.value?.setView(newCenter, props.zoom)
})

onMounted(() => {
  initMap()
  updateMarkers()
})

onUnmounted(() => {
  map.value?.remove()
})

// 暴露方法给父组件
defineExpose({
  panTo: (position: [number, number]) => {
    map.value?.panTo(position)
  },
  setZoom: (zoom: number) => {
    map.value?.setZoom(zoom)
  }
})
</script>

<style lang="scss" scoped>
.map-view {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  .map-controls {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    background: white;
    padding: 5px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style> 