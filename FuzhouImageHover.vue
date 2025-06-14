<template>
  <div 
    class="fuzhou-image-hover" 
    :style="containerStyle"
    ref="imageContainer"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="fuzhou-image-inner" :style="innerStyle">
      <img :src="src" :alt="alt" class="hover-image" />
      <div class="image-overlay" :class="{ active: isHovered }">
        <slot>
          <div class="overlay-content">
            <slot name="overlay-content">
              <div class="zoom-icon">
                <el-icon><ZoomIn /></el-icon>
              </div>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { ZoomIn } from '@element-plus/icons-vue';

const props = defineProps({
  // 图片URL
  src: {
    type: String,
    required: true
  },
  // 图片alt属性
  alt: {
    type: String,
    default: '福州景点图片'
  },
  // 容器高度
  height: {
    type: [Number, String],
    default: 'auto'
  },
  // 视差效果强度 (0-10)
  intensity: {
    type: Number,
    default: 5
  },
  // 缩放效果 (1-1.5)
  zoom: {
    type: Number,
    default: 1.05
  },
  // 圆角
  borderRadius: {
    type: String,
    default: '12px'
  },
  // 是否启用视差效果
  enableParallax: {
    type: Boolean,
    default: true
  },
  // 是否显示悬浮效果
  enableHover: {
    type: Boolean,
    default: true
  }
});

// 状态变量
const imageContainer = ref(null);
const isHovered = ref(false);
const mousePosition = ref({ x: 0, y: 0 });
const transformOffset = ref({ x: 0, y: 0 });

// 计算容器样式
const containerStyle = computed(() => {
  return {
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
    borderRadius: props.borderRadius
  };
});

// 计算内部元素样式
const innerStyle = computed(() => {
  if (isHovered.value && props.enableParallax) {
    return {
      transform: `scale(${props.zoom}) translate3d(${transformOffset.value.x}px, ${transformOffset.value.y}px, 0)`,
    };
  }
  return {
    transform: 'scale(1) translate3d(0, 0, 0)',
  };
});

// 处理鼠标移动
const handleMouseMove = (e) => {
  if (!props.enableParallax) return;
  
  const rect = imageContainer.value.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  // 鼠标相对于元素中心的位置 (-1 到 1)
  const relX = (e.clientX - rect.left - centerX) / centerX;
  const relY = (e.clientY - rect.top - centerY) / centerY;
  
  // 计算移动偏移量
  const maxMovement = props.intensity; // 最大移动像素数
  transformOffset.value = {
    x: relX * -maxMovement, // 负值使效果更自然
    y: relY * -maxMovement
  };
};

// 鼠标进入
const handleMouseEnter = () => {
  if (!props.enableHover) return;
  isHovered.value = true;
};

// 鼠标离开
const handleMouseLeave = () => {
  isHovered.value = false;
  transformOffset.value = { x: 0, y: 0 };
};

// 检查图片加载状态
onMounted(() => {
  const img = new Image();
  img.src = props.src;
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.fuzhou-image-hover {
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  
  .fuzhou-image-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    will-change: transform;
    overflow: hidden;
  }
  
  .hover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    will-change: transform;
    display: block;
  }
  
  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.1) 30%,
      transparent 80%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.active {
      opacity: 1;
    }
    
    .overlay-content {
      transform: translateY(20px);
      transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      
      .zoom-icon {
        width: 50px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        
        .el-icon {
          font-size: 24px;
          color: var(--theme-color, $primary-color);
        }
      }
    }
  }
  
  &:hover {
    .image-overlay .overlay-content {
      transform: translateY(0);
    }
  }
}
</style> 