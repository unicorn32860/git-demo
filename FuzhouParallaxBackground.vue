<template>
  <div class="parallax-container">
    <div 
      class="parallax-layer" 
      v-for="(layer, index) in layers" 
      :key="index"
      :style="{ 
        backgroundImage: `url(${layer.image})`,
        transform: `translateY(${calculateTransform(layer.speed)}px)`,
        opacity: layer.opacity,
        zIndex: layer.zIndex || 0
      }"
    ></div>
    <div class="parallax-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  layers: {
    type: Array,
    default: () => [
      { 
        image: '/src/assets/images/fuzhou-background.jpg', 
        speed: 0.2,
        opacity: 1,
        zIndex: 1
      },
      { 
        image: '/src/assets/images/fuzhou-mist.png', 
        speed: 0.4,
        opacity: 0.7,
        zIndex: 2
      },
      { 
        image: '/src/assets/images/fuzhou-mountains.png', 
        speed: 0.6,
        opacity: 0.8,
        zIndex: 3
      }
    ]
  }
});

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

const calculateTransform = (speed) => {
  return scrollY.value * speed;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.parallax-container {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  will-change: transform;
}

.parallax-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  color: white;
  text-align: center;
  padding: 0 20px;
}
</style> 