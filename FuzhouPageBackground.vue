<template>
  <div class="fuzhou-page-background" :class="backgroundClass">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // 背景类型: 'default', 'light', 'dark', 'primary', 'traditional'
  type: {
    type: String,
    default: 'default'
  },
  // 是否使用渐变背景
  gradient: {
    type: Boolean,
    default: false
  }
});

// 根据类型设置样式类
const backgroundClass = computed(() => {
  return {
    [`bg-${props.type}`]: true,
    'bg-gradient': props.gradient
  };
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.fuzhou-page-background {
  min-height: 100vh;
  width: 100%;
  
  // 默认背景
  &.bg-default {
    background-color: $background-color-base;
  }
  
  // 浅色背景
  &.bg-light {
    background-color: $background-color-light;
  }
  
  // 深色背景
  &.bg-dark {
    background-color: #333;
    color: #fff;
  }
  
  // 主题色背景
  &.bg-primary {
    background-color: rgba($primary-color, 0.05);
  }
  
  // 传统风格背景
  &.bg-traditional {
    background-color: $background-color-base;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%238a1c1c' fill-opacity='0.08'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E");
  }
  
  // 渐变背景效果
  &.bg-gradient {
    background: linear-gradient(135deg, rgba($fuzhou-brick, 0.05) 0%, rgba($fuzhou-sea, 0.05) 50%, rgba($fuzhou-tea, 0.05) 100%);
  }
}
</style> 