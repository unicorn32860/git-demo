<template>
  <div class="fuzhou-highlights">
    <div class="section-header">
      <h2>福州旅游亮点</h2>
      <div class="section-subtitle">领略福建省会城市的独特魅力</div>
    </div>
    
    <div class="highlights-grid">
      <router-link 
        v-for="(highlight, index) in highlights" 
        :key="index" 
        :to="highlight.route"
        class="highlight-card-link"
      >
        <div 
          class="highlight-card"
          :class="{ 'active': activeHighlight === index }"
          @mouseover="activeHighlight = index"
          @mouseleave="activeHighlight = null"
        >
          <div class="highlight-icon" :style="{ background: highlight.color }">
            <el-icon><component :is="highlight.icon"/></el-icon>
          </div>
          <div class="highlight-content">
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.description }}</p>
            <div class="explore-link" v-show="activeHighlight === index">
              <span>了解更多</span>
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { House, Food, Ship, Reading, Postcard, Sunrise, ArrowRight } from '@element-plus/icons-vue';

const activeHighlight = ref(null);

const highlights = [
  {
    icon: 'House',
    title: '三坊七巷',
    description: '有"中国城市里坊制度活化石"之称，保存着大量明清古民居，彰显福州的历史文化底蕴。',
    color: 'var(--el-color-danger)',
    route: '/highlights/sanfang-qixiang'
  },
  {
    icon: 'Sunrise',
    title: '鼓山风景区',
    description: '素有"榕城第一山"的美誉，集自然山水与人文古迹于一体，是福州的象征。',
    color: 'var(--el-color-success)',
    route: '/highlights/gushan'
  },
  {
    icon: 'Food',
    title: '闽菜文化',
    description: '福州是闽菜的发源地，佛跳墙、鱼丸、肉燕等美食让人垂涎欲滴。',
    color: 'var(--el-color-warning)',
    route: '/highlights/min-cuisine'
  },
  {
    icon: 'Ship',
    title: '闽江夜景',
    description: '闽江穿城而过，夜晚的江边灯光璀璨，倒映在江面上，如同一幅流动的画卷。',
    color: 'var(--el-color-info)',
    route: '/highlights/minjiang-night'
  },
  {
    icon: 'Reading',
    title: '历史名人故居',
    description: '林则徐、沈葆桢、林觉民、严复等历史名人都诞生于福州，留下了丰富的人文遗迹。',
    color: 'var(--el-color-primary)',
    route: '/highlights/historical-celebrities'
  },
  {
    icon: 'Postcard',
    title: '温泉资源',
    description: '福州拥有丰富的温泉资源，青云山温泉、汤岭温泉等是放松身心的绝佳去处。',
    color: '#8a1c1c',
    route: '/highlights/hot-springs'
  }
];
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.fuzhou-highlights {
  margin: 3rem 0;
  position: relative;
  padding: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233a8bc9' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
    z-index: -1;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 2.5rem;
    
    h2 {
      font-size: $font-size-headline;
      color: $text-primary;
      margin-bottom: 0.5rem;
      position: relative;
      display: inline-block;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        width: 60px;
        height: 3px;
        background: linear-gradient(to right, $fuzhou-sea, $fuzhou-brick);
        border-radius: 3px;
        transform: translateX(-50%);
      }
    }
    
    .section-subtitle {
      font-size: $font-size-base;
      color: $text-secondary;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.5;
    }
  }
  
  .highlights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    
    .highlight-card-link {
      text-decoration: none;
    }
    
    .highlight-card {
      display: flex;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      border-radius: $border-radius-large;
      padding: 1.5rem;
      box-shadow: $box-shadow-light;
      transition: $transition-base;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.3);
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 0;
        background-color: var(--highlight-color, $primary-color);
        transition: $transition-base;
      }
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 30px 30px;
        border-color: transparent transparent rgba(232, 98, 49, 0.1) transparent;
        transition: $transition-base;
        z-index: -1;
      }
      
      &:hover, &.active {
        transform: translateY(-5px);
        box-shadow: $box-shadow-dark;
        
        &::before {
          height: 100%;
        }
        
        &::after {
          width: 100px;
          height: 100px;
          transform: translate(20px, 20px);
        }
        
        .highlight-icon {
          transform: scale(1.1) rotate(5deg);
        }
      }
      
      .highlight-icon {
        width: 50px;
        height: 50px;
        min-width: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1rem;
        transition: $transition-bounce;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        
        .el-icon {
          font-size: 24px;
          color: white;
        }
      }
      
      .highlight-content {
        flex: 1;
        
        h3 {
          font-size: $font-size-large;
          margin-bottom: 0.5rem;
          color: $text-primary;
          font-weight: 600;
        }
        
        p {
          font-size: $font-size-small;
          color: $text-secondary;
          line-height: 1.6;
        }
        
        .explore-link {
          display: flex;
          align-items: center;
          margin-top: 0.75rem;
          color: $primary-color;
          font-size: $font-size-small;
          font-weight: 500;
          animation: slideIn 0.3s forwards;
          
          .el-icon {
            margin-left: 0.25rem;
            transition: transform 0.2s ease;
          }
          
          &:hover .el-icon {
            transform: translateX(3px);
          }
        }
      }
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: $breakpoint-md) {
  .fuzhou-highlights {
    .highlights-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style> 