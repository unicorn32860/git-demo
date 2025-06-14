<template>
  <div 
    class="fuzhou-navbar" 
    :class="{ 
      'navbar-scrolled': isScrolled, 
      'navbar-transparent': transparent && !isScrolled,
      'navbar-dark': dark && !isScrolled
    }"
  >
    <div class="navbar-container">
      <!-- Logo 区域 -->
      <div class="navbar-logo" @click="$router.push('/')">
        <div class="logo-wrapper shine">
          <img src="@/assets/images/logo.png" alt="福州旅游规划" class="logo" />
        </div>
        <div class="logo-text">
          <span class="gradient-text">福州旅游规划</span>
        </div>
      </div>
      
      <!-- 导航菜单 -->
      <nav class="navbar-menu">
        <ul class="menu-list">
          <li 
            v-for="item in menuItems" 
            :key="item.path" 
            class="menu-item"
            :class="{ active: isActive(item.path) }"
          >
            <router-link :to="item.path">
              <span class="menu-icon" v-if="item.icon">
                <el-icon><component :is="item.icon" /></el-icon>
              </span>
              <span class="menu-label">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      
      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <!-- 天气小部件 -->
        <div class="weather-widget" v-if="weatherData" @click="$router.push('/weather')">
          <el-icon><Sunny /></el-icon>
          <span>{{ weatherData.temperature }}°C</span>
        </div>
        
        <!-- 用户信息 -->
        <div class="user-section">
          <template v-if="isLoggedIn">
            <el-dropdown trigger="click">
              <div class="user-avatar-wrapper">
                <img :src="userAvatar" alt="用户头像" class="user-avatar" />
                <span class="username">{{ username }}</span>
                <el-icon><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="!isAdmin" @click="$router.push('/user/profile')">
                    <el-icon><UserFilled /></el-icon>
                    个人中心
                  </el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/user/orders')">
                    <el-icon><Tickets /></el-icon>
                    我的订单
                  </el-dropdown-item>
                  <el-dropdown-item @click="$router.push('/user/favorites')">
                    <el-icon><Star /></el-icon>
                    我的收藏
                  </el-dropdown-item>
                  <el-dropdown-item v-if="isAdmin" @click="$router.push('/admin')">
                    <el-icon><Setting /></el-icon>
                    管理后台
                  </el-dropdown-item>
                  <el-dropdown-item divided @click="logout">
                    <el-icon><SwitchButton /></el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="primary" size="small" class="login-btn" @click="$router.push('/login')">
              <el-icon><User /></el-icon>
              登录
            </el-button>
            <el-button type="default" size="small" class="register-btn" @click="$router.push('/register')">
              注册
            </el-button>
          </template>
        </div>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <div class="navbar-toggle" @click="toggleMobileMenu">
        <div class="toggle-icon" :class="{ 'active': mobileMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    
    <!-- 移动端菜单 -->
    <transition name="slide-down">
      <div class="mobile-menu" v-show="mobileMenuOpen">
        <ul class="mobile-menu-list">
          <li 
            v-for="item in menuItems" 
            :key="item.path" 
            class="mobile-menu-item"
            :class="{ active: isActive(item.path) }"
            @click="closeMobileMenu"
          >
            <router-link :to="item.path">
              <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { 
  HomeFilled, Place, MapLocation, Food, House, Reading, 
  Sunny, User, UserFilled, Tickets, Star, Setting, SwitchButton, ArrowDown
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  // 透明导航栏（初始状态）
  transparent: {
    type: Boolean,
    default: false
  },
  // 深色模式（初始状态）
  dark: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
const router = useRouter();
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// 导航菜单项
const menuItems = [
  { label: '首页', path: '/', icon: 'HomeFilled' },
  { label: '景点导览', path: '/attractions', icon: 'Place' },
  { label: '路线推荐', path: '/routes', icon: 'MapLocation' },
  { label: '美食特产', path: '/food', icon: 'Food' },
  { label: '住宿交通', path: '/accommodation', icon: 'House' },
];

// 检查路由是否激活
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(path);
};

// 模拟天气数据
const weatherData = ref({
  temperature: 25,
  condition: '晴'
});

// 用户信息
const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

const userInfo = computed(() => {
  const userInfoStr = localStorage.getItem('userInfo');
  return userInfoStr ? JSON.parse(userInfoStr) : {};
});

const username = computed(() => {
  return userInfo.value?.username || '游客';
});

const userAvatar = computed(() => {
  return userInfo.value?.avatar || '/images/avatars/guest.png';
});

const isAdmin = computed(() => {
  return userInfo.value?.role === 'admin' || userInfo.value?.username === 'admin';
});

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  ElMessage.success('已退出登录');
  
  if (route.path.startsWith('/admin') || route.path.startsWith('/user')) {
    window.location.href = '/';
  } else {
    // 刷新当前页面
    window.location.reload();
  }
};

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  
  // 禁止/恢复背景滚动
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : '';
};

// 关闭移动端菜单
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始检查
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = ''; // 恢复背景滚动
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.fuzhou-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, $fuzhou-brick, $fuzhou-sea, $fuzhou-tea);
    z-index: 1010;
  }
  
  // 默认状态
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  // 滚动状态
  &.navbar-scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    .navbar-container {
      height: 60px;
    }
    
    .logo-wrapper {
      width: 35px;
      height: 35px;
    }
    
    .logo {
      width: 24px;
      height: 24px;
    }
    
    .logo-text {
      font-size: 20px;
    }
  }
  
  // 透明状态
  &.navbar-transparent {
    background-color: transparent;
    box-shadow: none;
    
    .navbar-container {
      height: 80px;
    }
  }
  
  // 深色状态
  &.navbar-dark {
    .navbar-menu .menu-item a {
      color: rgba(255, 255, 255, 0.85);
      
      &:hover {
        color: white;
      }
    }
    
    .logo-text span {
      background: white;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      color: transparent;
    }
    
    .navbar-toggle .toggle-icon span {
      background-color: white;
    }
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 20px;
  max-width: $breakpoint-xl;
  margin: 0 auto;
  transition: height 0.3s ease;
}

// Logo 样式
.navbar-logo {
  display: flex;
  align-items: center;
  cursor: pointer;
  
  .logo-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba($primary-color, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .logo {
    width: 28px;
    height: 28px;
    transition: all 0.3s ease;
    z-index: 2;
  }
  
  .logo-text {
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    
    span {
      transition: all 0.3s ease;
    }
  }
}

// 导航菜单
.navbar-menu {
  display: flex;
  margin-left: 20px;
  
  .menu-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .menu-item {
    position: relative;
    margin: 0 5px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 50%;
      width: 0;
      height: 3px;
      background-color: $primary-color;
      transition: all 0.3s ease;
      transform: translateX(-50%);
      border-radius: 3px;
      opacity: 0;
    }
    
    &:hover::after,
    &.active::after {
      width: 70%;
      opacity: 1;
    }
    
    a {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      color: $text-primary;
      font-size: 16px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        color: $primary-color;
        transform: translateY(-2px);
      }
    }
    
    &.active a {
      color: $primary-color;
      font-weight: 600;
    }
    
    .menu-icon {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}

// 右侧操作区
.navbar-actions {
  display: flex;
  align-items: center;
  
  .weather-widget {
    display: flex;
    align-items: center;
    margin-right: 20px;
    padding: 5px 10px;
    border-radius: 20px;
    background-color: rgba($fuzhou-sea, 0.1);
    color: $fuzhou-sea;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .el-icon {
      margin-right: 5px;
      font-size: 16px;
    }
  }
  
  .user-section {
    .user-avatar-wrapper {
      display: flex;
      align-items: center;
      padding: 3px 10px 3px 3px;
      border-radius: 25px;
      background-color: rgba($primary-color, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid white;
      }
      
      .username {
        margin: 0 5px;
        font-size: 14px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .el-icon {
        font-size: 12px;
        color: $text-secondary;
      }
    }
    
    .login-btn {
      margin-right: 8px;
      border-radius: 20px;
      
      .el-icon {
        margin-right: 5px;
      }
    }
    
    .register-btn {
      border-radius: 20px;
    }
  }
}

// 移动端菜单按钮
.navbar-toggle {
  display: none;
  cursor: pointer;
  padding: 10px;
  
  .toggle-icon {
    position: relative;
    width: 24px;
    height: 20px;
    
    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: $text-primary;
      border-radius: 2px;
      transition: all 0.3s ease;
      
      &:nth-child(1) {
        top: 0;
      }
      
      &:nth-child(2) {
        top: 9px;
      }
      
      &:nth-child(3) {
        bottom: 0;
      }
    }
    
    &.active {
      span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      
      span:nth-child(2) {
        opacity: 0;
      }
      
      span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
    }
  }
}

// 移动端菜单
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 999;
  
  .mobile-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .mobile-menu-item {
    a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: $text-primary;
      font-size: 16px;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: rgba($primary-color, 0.05);
        color: $primary-color;
      }
      
      .el-icon {
        margin-right: 10px;
        font-size: 18px;
      }
    }
    
    &.active a {
      color: $primary-color;
      font-weight: 600;
      background-color: rgba($primary-color, 0.1);
    }
  }
}

// 移动端菜单动画
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  max-height: 400px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

// 响应式布局
@media (max-width: $breakpoint-lg) {
  .navbar-logo .logo-text {
    font-size: 20px;
  }
  
  .navbar-menu .menu-item a {
    padding: 8px 10px;
    font-size: 15px;
  }
}

@media (max-width: $breakpoint-md) {
  .navbar-menu {
    display: none;
  }
  
  .navbar-toggle {
    display: block;
  }
  
  .navbar-actions .weather-widget {
    display: none;
  }
  
  .navbar-container {
    padding: 0 15px;
  }
}

@media (max-width: $breakpoint-sm) {
  .user-section .user-avatar-wrapper .username {
    display: none;
  }
}
</style> 