<template>
  <div class="theme-switcher">
    <div class="theme-switcher__toggle" @click="toggleMenu">
      <div class="theme-icon" :class="currentTheme">
        <el-icon v-if="currentTheme === 'spring'"><Sunny /></el-icon>
        <el-icon v-else-if="currentTheme === 'summer'"><Umbrella /></el-icon>
        <el-icon v-else-if="currentTheme === 'autumn'"><Cloudy /></el-icon>
        <el-icon v-else-if="currentTheme === 'winter'"><Sunrise /></el-icon>
      </div>
      <span v-if="showLabel">{{ themeLabel }}</span>
    </div>
    
    <transition name="fade">
      <div class="theme-menu" v-if="menuOpen">
        <div 
          v-for="theme in themes" 
          :key="theme.name" 
          class="theme-menu__item"
          :class="{ active: currentTheme === theme.name }"
          @click="selectTheme(theme.name)"
        >
          <div class="theme-color" :style="{ backgroundColor: theme.color }">
            <el-icon v-if="theme.name === 'spring'"><Sunny /></el-icon>
            <el-icon v-else-if="theme.name === 'summer'"><Umbrella /></el-icon>
            <el-icon v-else-if="theme.name === 'autumn'"><Cloudy /></el-icon>
            <el-icon v-else-if="theme.name === 'winter'"><Sunrise /></el-icon>
          </div>
          <span class="theme-label">{{ theme.label }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Sunny, Umbrella, Cloudy, Sunrise } from '@element-plus/icons-vue';

// 定义主题
const themes = [
  { name: 'spring', label: '春日', color: '#7bae37' },
  { name: 'summer', label: '夏日', color: '#3a8bc9' },
  { name: 'autumn', label: '秋日', color: '#e86231' },
  { name: 'winter', label: '冬日', color: '#8a1c1c' }
];

const props = defineProps({
  // 显示文字标签
  showLabel: {
    type: Boolean,
    default: true
  },
  // 是否记住主题设置(localStorage)
  remember: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['change']);

// 状态
const currentTheme = ref('autumn'); // 默认秋天
const menuOpen = ref(false);

// 当前主题标签
const themeLabel = computed(() => {
  const theme = themes.find(t => t.name === currentTheme.value);
  return theme ? theme.label : '主题';
});

// 切换菜单显示
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// 选择主题
const selectTheme = (themeName) => {
  currentTheme.value = themeName;
  menuOpen.value = false;
  
  // 应用主题
  applyTheme(themeName);
  
  // 保存主题
  if (props.remember) {
    localStorage.setItem('fuzhouTheme', themeName);
  }
  
  // 触发事件
  emit('change', themeName);
};

// 应用主题
const applyTheme = (themeName) => {
  // 移除所有主题类
  document.body.classList.remove('theme-spring', 'theme-summer', 'theme-autumn', 'theme-winter');
  
  // 添加新主题
  document.body.classList.add(`theme-${themeName}`);
  
  // 更新CSS变量
  const theme = themes.find(t => t.name === themeName);
  if (theme) {
    document.documentElement.style.setProperty('--theme-color', theme.color);
  }
};

// 点击外部关闭菜单
const handleOutsideClick = (event) => {
  const el = event.target;
  if (menuOpen.value && !el.closest('.theme-switcher')) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  // 确保初始化时添加autumn主题类
  document.body.classList.add('theme-autumn');

  // 加载保存的主题
  if (props.remember) {
    const savedTheme = localStorage.getItem('fuzhouTheme');
    if (savedTheme) {
      currentTheme.value = savedTheme;
      applyTheme(savedTheme);
    } else {
      // 默认应用主题
      applyTheme(currentTheme.value);
    }
  } else {
    applyTheme(currentTheme.value);
  }
  
  // 添加点击事件监听
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.theme-switcher {
  position: relative;
  z-index: 900;
  
  &__toggle {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    .theme-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      margin-right: 8px;
      
      &.spring {
        color: $fuzhou-tea;
      }
      
      &.summer {
        color: $fuzhou-sea;
      }
      
      &.autumn {
        color: $fuzhou-brick;
      }
      
      &.winter {
        color: $fuzhou-lacquer;
      }
    }
    
    span {
      font-size: 14px;
      color: $text-primary;
    }
  }
}

.theme-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 120px;
  
  &__item {
    display: flex;
    align-items: center;
    padding: 10px 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
    
    &.active {
      background-color: rgba(0, 0, 0, 0.1);
    }
    
    .theme-color {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      color: white;
      
      .el-icon {
        font-size: 12px;
      }
    }
    
    .theme-label {
      font-size: 14px;
      color: $text-primary;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 