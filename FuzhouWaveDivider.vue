<template>
  <div class="wave-divider" :class="[position, color]">
    <div class="wave-shape"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 波浪位置: 'top', 'bottom'
  position: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  // 波浪颜色主题: 'primary', 'light', 'dark', 'brick', 'sea', 'tea'
  color: {
    type: String,
    default: 'light',
    validator: (value) => ['primary', 'light', 'dark', 'brick', 'sea', 'tea'].includes(value)
  }
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.wave-divider {
  position: relative;
  width: 100%;
  height: 60px;
  overflow: hidden;
  
  .wave-shape {
    position: absolute;
    left: 0;
    width: 200%;
    height: 100%;
    background-repeat: repeat-x;
    background-size: 50% 100%;
    animation: wave-animation 15s linear infinite;
  }
  
  &.top {
    .wave-shape {
      top: 0;
      transform: rotate(180deg);
    }
  }
  
  &.bottom {
    .wave-shape {
      bottom: 0;
    }
  }
  
  &.primary .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%23e86231'/%3E%3C/svg%3E");
  }
  
  &.light .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%23ffffff'/%3E%3C/svg%3E");
  }
  
  &.dark .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%23333333'/%3E%3C/svg%3E");
  }
  
  &.brick .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%23e86231'/%3E%3C/svg%3E");
  }
  
  &.sea .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%233a8bc9'/%3E%3C/svg%3E");
  }
  
  &.tea .wave-shape {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.75' fill='%237bae37'/%3E%3C/svg%3E");
  }
}

@keyframes wave-animation {
  0% { transform: translateX(0); }
  50% { transform: translateX(-25%); }
  100% { transform: translateX(-50%); }
}
</style> 