<template>
  <div class="scroll-progress" :class="{ 'scroll-progress--visible': isVisible }">
    <div 
      class="scroll-progress__bar" 
      :style="{ width: `${scrollPercentage}%` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  // 顶部偏移量（何时开始显示）
  offset: {
    type: Number,
    default: 200
  },
  // 进度条高度
  height: {
    type: Number,
    default: 4
  },
  // 进度条颜色（如果不设置，使用渐变）
  color: {
    type: String,
    default: ''
  },
  // 进度条位置 'top' 或 'bottom'
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom'].includes(value)
  }
});

const scrollPercentage = ref(0);
const isVisible = ref(false);

// 计算滚动百分比
const calculateScrollPercentage = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  // 计算百分比并限制在0-100之间
  scrollPercentage.value = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
  
  // 控制可见性
  isVisible.value = scrollTop > props.offset;
};

// 处理滚动事件
const handleScroll = () => {
  window.requestAnimationFrame(calculateScrollPercentage);
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  calculateScrollPercentage(); // 初始计算
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.scroll-progress {
  position: fixed;
  z-index: 1000;
  left: 0;
  width: 100%;
  height: v-bind('height + "px"');
  opacity: 0;
  transition: opacity 0.3s ease;
  
  &--visible {
    opacity: 1;
  }
  
  &[class*='top'] {
    top: 0;
  }
  
  &[class*='bottom'] {
    bottom: 0;
  }
  
  &__bar {
    height: 100%;
    width: 0;
    background: v-bind('color ? color : `linear-gradient(to right, $fuzhou-brick, $fuzhou-sea, $fuzhou-tea)`');
    transition: width 0.2s ease;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
}
</style> 