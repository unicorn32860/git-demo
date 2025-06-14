<template>
  <div class="nav-bar">
    <el-menu
      class="nav-menu"
      mode="horizontal"
      :ellipsis="false"
      router
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <div class="logo-container" @click="$router.push('/')">
        <div class="logo-wrapper pulse">
          <img src="@/assets/images/logo.png" alt="福州旅游规划" class="logo" />
        </div>
        <span class="logo-text">福州旅游规划</span>
      </div>
      
      <div class="menu-items">
        <el-menu-item index="/" class="menu-item">
          <el-icon><HomeFilled /></el-icon>
          首页
        </el-menu-item>
        <el-menu-item index="/attractions" class="menu-item">
          <el-icon><Place /></el-icon>
          景点导览
        </el-menu-item>
        <el-menu-item index="/routes" class="menu-item">
          <el-icon><MapLocation /></el-icon>
          路线推荐
        </el-menu-item>
        <el-menu-item index="/food" class="menu-item">
          <el-icon><Food /></el-icon>
          美食特产
        </el-menu-item>
        <el-menu-item index="/accommodation" class="menu-item">
          <el-icon><House /></el-icon>
          住宿交通
        </el-menu-item>
        <el-menu-item index="/guide" class="menu-item">
          <el-icon><Reading /></el-icon>
          旅游攻略
        </el-menu-item>
      </div>
      
      <div class="right-menu">
        <div class="weather-widget" v-if="weatherData" @click="router.push('/weather')">
          <el-icon><Sunny /></el-icon>
          <span>{{ weatherData.temperature }}°C</span>
          <span class="weather-city">福州</span>
        </div>

        <el-dropdown trigger="click">
          <div class="quick-links ripple">
            <el-icon><Menu /></el-icon>
            <span>快捷入口</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/attractions')">
                <el-icon><MapLocation /></el-icon>
                智能导览地图
              </el-dropdown-item>
              <el-dropdown-item @click="router.push('/weather')">
                <el-icon><Sunny /></el-icon>
                实时天气
              </el-dropdown-item>
              <el-dropdown-item @click="showCustomerService">
                <el-icon><Service /></el-icon>
                在线客服
              </el-dropdown-item>
              <el-dropdown-item @click="router.push('/?section=coupons')">
                <el-icon><Ticket /></el-icon>
                优惠券领取
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        
        <!-- 用户登录区域 -->
        <div class="auth-buttons">
          <template v-if="isLoggedIn">
            <el-dropdown>
              <div class="user-avatar-wrapper">
                <img :src="userInfo.avatar || '/images/avatars/guest.png'" alt="用户头像" class="user-avatar" />
                <span class="username">{{ userInfo.username }}</span>
                <el-icon><ArrowDown /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="!isAdmin" @click="router.push('/user/profile')">
                    <el-icon><UserFilled /></el-icon>
                    个人信息
                  </el-dropdown-item>
                  <el-dropdown-item @click="router.push('/user/orders')">
                    <el-icon><Tickets /></el-icon>
                    我的订单
                  </el-dropdown-item>
                  <el-dropdown-item @click="router.push('/user/favorites')">
                    <el-icon><Star /></el-icon>
                    我的收藏
                  </el-dropdown-item>
                  <div class="dropdown-divider"></div>
                  <el-dropdown-item v-if="isAdmin" @click="goToAdmin">
                    <el-icon><Setting /></el-icon>
                    管理后台
                  </el-dropdown-item>
                  <el-dropdown-item @click="logout">
                    <el-icon><SwitchButton /></el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button type="primary" size="small" class="auth-button" @click="login">
              <el-icon><User /></el-icon>
              登录
            </el-button>
            <el-button plain size="small" class="auth-button" @click="router.push('/register')">
              <el-icon><Edit /></el-icon>
              注册
            </el-button>
          </template>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Menu, MapLocation, Sunny, Service, Ticket, ArrowDown,
  User, UserFilled, Avatar, Reading, HomeFilled, Place, Food,
  House, Star, Tickets, Setting, SwitchButton, Edit
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const route = useRoute()
const router = useRouter()
const activeIndex = ref('/')

// 模拟天气数据
const weatherData = ref({
  temperature: 25,
  condition: '晴',
  humidity: 65
})

// 用户信息
const userInfo = computed(() => {
  const userInfoStr = localStorage.getItem('userInfo');
  return userInfoStr ? JSON.parse(userInfoStr) : {};
});

// 检查用户是否已登录
const isLoggedIn = computed(() => {
  return !!localStorage.getItem('token');
});

// 检查是否是管理员
const isAdmin = computed(() => {
  return userInfo.value && (userInfo.value.role === 'admin' || userInfo.value.username === 'admin');
});

onMounted(() => {
  activeIndex.value = route.path
  
  // 检查用户信息是否存在并同步
  const adminUserInfo = localStorage.getItem('adminUserInfo');
  const userInfoStr = localStorage.getItem('userInfo');
  
  // 如果adminUserInfo存在但userInfo不存在，同步数据
  if (adminUserInfo && !userInfoStr) {
    localStorage.setItem('userInfo', adminUserInfo);
    console.log('已同步用户信息');
  }
})

const handleSelect = (key: string) => {
  activeIndex.value = key
}

// 跳转到登录页
const login = () => {
  router.push('/login');
}

// 游客登录处理
const guestLogin = () => {
  const guestToken = 'guest_' + Math.random().toString(36).substring(2, 15);
  localStorage.setItem('token', guestToken);
  localStorage.setItem('userInfo', JSON.stringify({
    id: 'guest',
    username: '游客用户',
    role: 'guest',
    avatar: '/images/avatars/guest.png'
  }));
  
  ElMessage.success('已以游客身份登录，部分功能可能受限');
  router.push('/');
}

// 跳转到管理后台
const goToAdmin = () => {
  router.push('/admin/dashboard');
}

// 退出登录
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  ElMessage.success('已退出登录');
  
  // 如果当前在管理页面，则跳转到首页
  if (route.path.startsWith('/admin')) {
    window.location.href = '/';
  } else {
    // 刷新当前页面
    window.location.reload();
  }
}

// 显示客服对话框
const showCustomerService = () => {
  ElMessage.info('正在连接客服，请稍候...');
  // 这里可以实现客服功能
}
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.nav-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(to right, $fuzhou-brick, $fuzhou-sea, $fuzhou-tea);
    z-index: 110;
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  background: transparent !important;
  border-bottom: none !important;
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 40px;
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
    animation: pulseEffect 2s infinite ease-in-out;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: rotate(45deg);
      animation: shine 3s infinite;
    }
  }
  
  .logo {
    width: 28px;
    height: 28px;
    transition: $transition-base;
    z-index: 2;
  }
  
  .logo-text {
    font-size: 22px;
    font-weight: bold;
    color: $primary-color;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    transition: $transition-base;
    background: linear-gradient(45deg, $fuzhou-brick, $fuzhou-tea);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    &:hover {
      text-shadow: 0 2px 4px rgba(0,0,0,0.15);
    }
  }
}

.menu-items {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .menu-item {
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    transition: $transition-base;
    position: relative;
    
    .el-icon {
      margin-right: 6px;
      font-size: 18px;
    }
    
    &:hover {
      color: $primary-color;
      transform: translateY(-2px);
    }
    
    &.is-active {
      color: $primary-color;
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 3px;
        background-color: $primary-color;
        border-radius: 3px 3px 0 0;
      }
    }
  }
}

.dropdown-divider {
  height: 1px;
  margin: 5px 0;
  overflow: hidden;
  background-color: #e9ecef;
  display: block;
}

.right-menu {
  display: flex;
  align-items: center;
  gap: 20px;
  
  .weather-widget {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: $text-regular;
    background: rgba($fuzhou-sea, 0.1);
    padding: 4px 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: $transition-base;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $box-shadow-light;
    }
    
    .el-icon {
      color: $fuzhou-sea;
      margin-right: 4px;
    }
    
    .weather-city {
      margin-left: 4px;
      font-size: 12px;
      color: $text-secondary;
    }
  }
  
  .quick-links {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 20px;
    background: rgba($fuzhou-stone, 0.1);
    transition: $transition-base;
    
    &:hover {
      background: rgba($fuzhou-stone, 0.15);
      transform: translateY(-2px);
    }
    
    .el-icon {
      margin-right: 4px;
      font-size: 16px;
    }
  }
  
  .auth-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    
    .el-button {
      border-radius: 20px;
      display: flex;
      align-items: center;
      
      .el-icon {
        margin-right: 4px;
      }
    }
    
    .user-avatar-wrapper {
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 2px 10px 2px 2px;
      border-radius: 20px;
      background: rgba($primary-color, 0.1);
      transition: $transition-base;
      
      &:hover {
        background: rgba($primary-color, 0.15);
        transform: translateY(-2px);
      }
      
      .user-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #fff;
      }
      
      .username {
        margin: 0 6px;
        font-size: 14px;
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

/* 自定义动画 */
@keyframes pulseEffect {
  0% { box-shadow: 0 0 0 0 rgba($primary-color, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba($primary-color, 0); }
  100% { box-shadow: 0 0 0 0 rgba($primary-color, 0); }
}

@keyframes shine {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

/* 响应式调整 */
@media (max-width: $breakpoint-lg) {
  .logo-text {
    font-size: 18px;
  }
  
  .menu-items .menu-item {
    font-size: 14px;
    padding: 0 12px;
    
    .el-icon {
      margin-right: 4px;
      font-size: 16px;
    }
  }
  
  .right-menu {
    gap: 10px;
  }
}

@media (max-width: $breakpoint-md) {
  .menu-items {
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
  }
}
</style> 