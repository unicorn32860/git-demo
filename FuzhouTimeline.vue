<template>
  <div class="fuzhou-timeline">
    <div 
      class="timeline-item" 
      v-for="(item, index) in items" 
      :key="index"
      :class="{ 'active': activeItem === index }"
      @mouseover="activeItem = index"
      @mouseleave="activeItem = null"
    >
      <div class="timeline-time" v-if="item.time">
        <span>{{ item.time }}</span>
      </div>
      
      <div class="timeline-connector">
        <div class="timeline-dot" :style="{ backgroundColor: item.color || defaultColor }"></div>
        <div class="timeline-line" v-if="index !== items.length - 1"></div>
      </div>
      
      <div class="timeline-content">
        <div class="timeline-card" :style="{ borderColor: item.color || defaultColor }">
          <div class="timeline-header">
            <div class="timeline-badge" v-if="item.type">
              <span :style="{ backgroundColor: item.color || defaultColor }">{{ item.type }}</span>
            </div>
            <h3 class="timeline-title">{{ item.title }}</h3>
          </div>
          
          <div class="timeline-body">
            <div class="timeline-image" v-if="item.image">
              <img :src="item.image" :alt="item.title">
            </div>
            <p class="timeline-description">{{ item.description }}</p>
          </div>
          
          <div class="timeline-tags" v-if="item.tags && item.tags.length">
            <span 
              class="fuzhou-tag" 
              v-for="(tag, tagIndex) in item.tags" 
              :key="tagIndex"
              :class="getTagClass(tag)"
            >
              {{ tag }}
            </span>
          </div>
          
          <div class="timeline-footer" v-if="item.action">
            <el-button 
              size="small" 
              type="primary" 
              @click="handleAction(item, index)"
            >
              {{ item.actionText || '查看详情' }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  // 时间线项目
  items: {
    type: Array,
    required: true
  },
  // 默认颜色
  defaultColor: {
    type: String,
    default: '#e86231'
  }
});

const emit = defineEmits(['item-click']);

const activeItem = ref(null);

// 根据标签获取对应的类名
const getTagClass = (tag) => {
  const tagMap = {
    '历史': 'history',
    '古迹': 'history',
    '文化': 'culture',
    '艺术': 'culture',
    '自然': 'nature',
    '山水': 'nature',
    '公园': 'nature',
    '美食': 'food',
    '海鲜': 'sea',
    '海景': 'sea'
  };
  
  for (const key in tagMap) {
    if (tag.includes(key)) {
      return tagMap[key];
    }
  }
  
  return 'culture'; // 默认类名
};

// 处理操作点击
const handleAction = (item, index) => {
  emit('item-click', { item, index });
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.fuzhou-timeline {
  position: relative;
  padding: 20px 0;
  
  .timeline-item {
    display: flex;
    margin-bottom: 30px;
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.active {
      .timeline-dot {
        transform: scale(1.3);
      }
      
      .timeline-card {
        transform: translateX(10px);
        box-shadow: $box-shadow-dark;
      }
    }
  }
  
  .timeline-time {
    width: 80px;
    text-align: right;
    padding-right: 20px;
    color: $text-secondary;
    font-size: 14px;
    font-weight: 500;
    align-self: flex-start;
    margin-top: 2px;
    
    span {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 12px;
      background-color: rgba($fuzhou-stone, 0.1);
    }
  }
  
  .timeline-connector {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    
    .timeline-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: $primary-color;
      z-index: 2;
      transition: transform 0.3s ease;
      box-shadow: 0 0 0 4px rgba($primary-color, 0.2);
    }
    
    .timeline-line {
      position: absolute;
      top: 14px;
      width: 2px;
      height: calc(100% + 30px);
      background-color: rgba($fuzhou-stone, 0.2);
      z-index: 1;
    }
  }
  
  .timeline-content {
    flex: 1;
  }
  
  .timeline-card {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: $border-radius-large;
    overflow: hidden;
    padding: 15px;
    box-shadow: $box-shadow-light;
    transition: all 0.3s ease;
    border-left: 3px solid $primary-color;
    
    &:hover {
      box-shadow: $box-shadow-dark;
    }
  }
  
  .timeline-header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    
    .timeline-badge {
      margin-right: 10px;
      
      span {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 12px;
        background-color: $primary-color;
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
    
    .timeline-title {
      margin: 0;
      font-size: 18px;
      color: $text-primary;
    }
  }
  
  .timeline-body {
    display: flex;
    margin-bottom: 10px;
    
    .timeline-image {
      width: 120px;
      height: 80px;
      border-radius: $border-radius-base;
      overflow: hidden;
      margin-right: 15px;
      flex-shrink: 0;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    
    .timeline-description {
      margin: 0;
      color: $text-secondary;
      font-size: 14px;
      line-height: 1.5;
    }
  }
  
  .timeline-tags {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }
  
  .timeline-footer {
    display: flex;
    justify-content: flex-end;
  }
}

@media (max-width: $breakpoint-md) {
  .fuzhou-timeline {
    .timeline-time {
      display: none;
    }
    
    .timeline-body {
      flex-direction: column;
      
      .timeline-image {
        width: 100%;
        height: 150px;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
}
</style> 