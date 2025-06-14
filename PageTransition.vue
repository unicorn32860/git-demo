<template>
  <transition
    :name="transitionName"
    :mode="mode"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot></slot>
  </transition>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  // 过渡类型: 'fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down', 'zoom'
  name: {
    type: String,
    default: 'fade'
  },
  // 过渡模式: 'in-out', 'out-in'
  mode: {
    type: String,
    default: 'out-in'
  },
  // 过渡时长 (毫秒)
  duration: {
    type: Number,
    default: 300
  },
  // 是否使用CSS过渡
  css: {
    type: Boolean,
    default: true
  }
});

// 事件
const emit = defineEmits([
  'before-enter',
  'enter',
  'after-enter',
  'before-leave',
  'leave',
  'after-leave'
]);

// 计算过渡名称
const transitionName = computed(() => {
  if (!props.css) return '';
  return props.name;
});

// 生命周期钩子
const beforeEnter = (el) => {
  if (!props.css) {
    el.style.opacity = '0';
    switch (props.name) {
      case 'slide-left':
        el.style.transform = 'translateX(30px)';
        break;
      case 'slide-right':
        el.style.transform = 'translateX(-30px)';
        break;
      case 'slide-up':
        el.style.transform = 'translateY(30px)';
        break;
      case 'slide-down':
        el.style.transform = 'translateY(-30px)';
        break;
      case 'zoom':
        el.style.transform = 'scale(0.95)';
        break;
    }
    el.style.transition = `opacity ${props.duration}ms ease, transform ${props.duration}ms ease`;
  }
  emit('before-enter', el);
};

const enter = (el, done) => {
  if (!props.css) {
    // 触发回流
    el.offsetWidth;
    
    el.style.opacity = '1';
    el.style.transform = 'translateX(0) translateY(0) scale(1)';
    
    setTimeout(() => {
      done();
    }, props.duration);
  }
  emit('enter', el, done);
};

const afterEnter = (el) => {
  if (!props.css) {
    el.style.transition = '';
    el.style.opacity = '';
    el.style.transform = '';
  }
  emit('after-enter', el);
};

const beforeLeave = (el) => {
  if (!props.css) {
    el.style.opacity = '1';
    el.style.transition = `opacity ${props.duration}ms ease, transform ${props.duration}ms ease`;
  }
  emit('before-leave', el);
};

const leave = (el, done) => {
  if (!props.css) {
    // 触发回流
    el.offsetWidth;
    
    el.style.opacity = '0';
    switch (props.name) {
      case 'slide-left':
        el.style.transform = 'translateX(-30px)';
        break;
      case 'slide-right':
        el.style.transform = 'translateX(30px)';
        break;
      case 'slide-up':
        el.style.transform = 'translateY(-30px)';
        break;
      case 'slide-down':
        el.style.transform = 'translateY(30px)';
        break;
      case 'zoom':
        el.style.transform = 'scale(0.95)';
        break;
    }
    
    setTimeout(() => {
      done();
    }, props.duration);
  }
  emit('leave', el, done);
};

const afterLeave = (el) => {
  if (!props.css) {
    el.style.transition = '';
    el.style.opacity = '';
    el.style.transform = '';
  }
  emit('after-leave', el);
};
</script>

<style scoped lang="scss">
/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 左滑动 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease, transform v-bind('`${props.duration}ms`') ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* 右滑动 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease, transform v-bind('`${props.duration}ms`') ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 上滑动 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease, transform v-bind('`${props.duration}ms`') ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* 下滑动 */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease, transform v-bind('`${props.duration}ms`') ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* 缩放 */
.zoom-enter-active,
.zoom-leave-active {
  transition: opacity v-bind('`${props.duration}ms`') ease, transform v-bind('`${props.duration}ms`') ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 