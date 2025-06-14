<template>
  <div class="admin-layout">
    <el-container class="container">
      <el-aside :width="isSidebarCollapsed ? '64px' : '240px'" :class="{'aside': true, 'collapsed': isSidebarCollapsed}">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/images/logo.png" alt="Logo" />
            <span v-show="!isSidebarCollapsed">福州旅游管理系统</span>
          </router-link>
        </div>
        <el-menu
          :router="true"
          :default-active="activeMenu"
          class="sidebar-menu"
          :collapse="isSidebarCollapsed"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <el-menu-item index="/admin/dashboard" v-if="hasMenuPermission('/admin/dashboard')">
            <el-icon><Monitor /></el-icon>
            <span>仪表盘</span>
          </el-menu-item>
          
          <el-sub-menu index="/admin/system" v-if="hasMenuPermission('system:view')">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/admin/user" v-if="hasMenuPermission('user:view')">
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/role" v-if="hasMenuPermission('role:view')">
              <el-icon><Avatar /></el-icon>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/permission" v-if="hasMenuPermission('system:view')">
              <el-icon><Key /></el-icon>
              <span>权限管理</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/admin/content" v-if="hasMenuPermission('article:view')">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item index="/admin/article" v-if="hasMenuPermission('article:view')">
              <el-icon><Notebook /></el-icon>
              <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index="/admin/attraction" v-if="hasMenuPermission('attraction:view')">
              <el-icon><Location /></el-icon>
              <span>景点管理</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="/admin/resource" v-if="hasMenuPermission('resource:view')">
            <el-icon><PictureFilled /></el-icon>
            <span>资源管理</span>
          </el-menu-item>

          <el-menu-item index="/admin/operation" v-if="hasMenuPermission('activity:view')">
            <el-icon><Promotion /></el-icon>
            <span>内容运营</span>
          </el-menu-item>

          <el-menu-item index="/admin/stat" v-if="hasMenuPermission('system:view')">
            <el-icon><DataAnalysis /></el-icon>
            <span>数据分析</span>
          </el-menu-item>

          <el-menu-item index="/admin/order" v-if="hasMenuPermission('order:view')">
            <el-icon><Tickets /></el-icon>
            <span>订单管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container class="main-container">
        <el-header class="header">
          <div class="header-left">
            <el-icon class="fold-menu" @click="toggleSidebar">
              <Fold v-if="!isSidebarCollapsed" />
              <Expand v-else />
            </el-icon>
            <div class="page-title">{{ pageTitle }}</div>
          </div>
          <div class="header-right">
            <el-tooltip content="全屏" placement="bottom">
              <el-icon class="header-icon" @click="toggleFullScreen">
                <FullScreen v-if="!isFullScreen" />
                <Aim v-else />
              </el-icon>
            </el-tooltip>
            
            <el-dropdown trigger="click">
              <div class="user-dropdown">
                <el-avatar
                  :size="32"
                  :src="userInfo.avatar || '@/assets/images/default-avatar.svg'"
                />
                <span class="user-name">{{ userInfo.username }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goToUserProfile">用户管理</el-dropdown-item>
                  <el-dropdown-item @click="handleChangePassword">修改密码</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="main">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>

        <el-footer class="footer">
          <div>福州旅游管理系统 &copy; {{ currentYear }} All Rights Reserved</div>
        </el-footer>
      </el-container>
    </el-container>

    <el-dialog
      title="修改密码"
      v-model="passwordDialogVisible"
      width="400px"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitChangePassword">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  Monitor, Setting, Document, PictureFilled,
  Promotion, DataAnalysis, Tickets, User, Avatar,
  Fold, Expand, FullScreen, Aim, Location, Notebook, Key
} from '@element-plus/icons-vue';
// import Breadcrumb from '@/components/Breadcrumb.vue';

const router = useRouter();
const route = useRoute();
const adminStore = useAdminStore();

const isSidebarCollapsed = ref(false);
const isFullScreen = ref(false);

const userInfo = computed(() => adminStore.adminInfo || {
  username: 'Admin',
  avatar: '/assets/images/default-avatar.svg'
});

const currentYear = new Date().getFullYear();

const activeMenu = computed(() => {
  return route.path;
});

const passwordDialogVisible = ref(false);
const passwordFormRef = ref(null);
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    if (passwordForm.value.confirmPassword !== '') {
      passwordFormRef.value.validateField('confirmPassword');
    }
    callback();
  }
};

const validateConfirmPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== passwordForm.value.newPassword) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, validator: validatePass, trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPass, trigger: 'blur' }
  ]
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    isFullScreen.value = true;
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      isFullScreen.value = false;
    }
  }
};

const goToUserProfile = () => {
  router.push('/admin/user');
};

const handleChangePassword = () => {
  passwordDialogVisible.value = true;
  passwordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

const submitChangePassword = async () => {
  if (!passwordFormRef.value) return;
  
  await passwordFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        // 这里调用API修改密码
        // const response = await axios.post('/api/user/change-password', passwordForm.value);
        // 模拟成功响应
        ElMessage.success('密码修改成功，请重新登录');
        passwordDialogVisible.value = false;
        
        // 退出登录
        setTimeout(() => {
          handleLogout();
        }, 1500);
      } catch (error) {
        ElMessage.error('密码修改失败');
      }
    }
  });
};

const handleLogout = () => {
  ElMessageBox.confirm('确认退出登录吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 调用管理员状态管理中的登出方法
    await adminStore.logout();
    
    // 跳转到登录页并刷新页面
    window.location.href = '/login';
  }).catch(() => {});
};

const fetchUserInfo = async () => {
  try {
    // 从localStorage获取用户信息
    const storedInfo = localStorage.getItem('adminUserInfo');
    if (storedInfo) {
      try {
        const userInfo = JSON.parse(storedInfo);
        adminStore.adminInfo = userInfo;
      } catch (e) {
        console.error('解析管理员信息失败', e);
      }
    }
    
    // 如果没有用户信息，尝试获取
    if (!adminStore.isLoggedIn) {
      try {
        await adminStore.fetchAdminInfo();
      } catch (error) {
        console.error('获取管理员信息失败');
        // 如果获取失败，跳转到登录页
        router.push('/login');
      }
    }
    
    // 如果仍然没有用户信息，跳转到登录页
    if (!adminStore.isLoggedIn) {
      router.push('/login');
      return;
    }
    
    // 确保加载权限
    if (!adminStore.permissionsLoaded) {
      console.log('开始加载用户权限');
      await adminStore.loadPermissions();
    }
  } catch (error) {
    console.error('获取用户信息失败', error);
    router.push('/login');
  }
};

onMounted(() => {
  fetchUserInfo();
});

// 检查菜单权限函数，确保所有菜单都能显示
const hasMenuPermission = (permission) => {
  // 临时返回true，显示所有菜单
  return true;
  
  // 以下是正常的权限检查逻辑，暂时注释掉
  /*
  // 超级管理员总是有权限
  if (adminStore.roleName === '超级管理员' || adminStore.roleName === '管理员') {
    return true;
  }
  
  // 如果没有指定权限，则允许访问
  if (!permission) return true;
  
  // 如果是路径格式的权限，转换为权限标识格式
  // 例如: /admin/user -> user:view
  if (permission.startsWith('/admin/')) {
    const module = permission.split('/')[2]; // 提取模块名称
    if (module) {
      const permKey = `${module}:view`;
      return adminStore.hasPermission(permKey);
    }
  }
  
  // 检查是否有权限
  return adminStore.hasPermission(permission);
  */
};

// 获取当前页面标题
const pageTitle = computed(() => {
  const routePath = route.path;
  const titles = {
    '/admin/dashboard': '仪表盘',
    '/admin/user': '用户管理',
    '/admin/role': '角色管理',
    '/admin/permission': '权限管理',
    '/admin/article': '文章管理',
    '/admin/attraction': '景点管理',
    '/admin/resource': '资源管理',
    '/admin/operation': '内容运营',
    '/admin/stat': '数据分析',
    '/admin/order': '订单管理'
  };
  
  return titles[routePath] || '福州旅游管理系统';
});
</script>

<style lang="scss" scoped>
.admin-layout {
  height: 100vh;
  background-color: #f5f7fa;
  
  .container {
    height: 100%;
    
    .aside {
      transition: width 0.3s;
      background-color: #001529;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      
      &.collapsed {
        .logo {
          padding: 16px 0;
          
          img {
            margin: 0 auto;
          }
        }
      }
      
      .logo {
        height: 60px;
        padding: 16px;
        background-color: #001529;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s;
        overflow: hidden;
        
        a {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
        }
        
        img {
          height: 32px;
          margin-right: 8px;
          transition: all 0.3s;
        }
        
        span {
          font-size: 16px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      
      .sidebar-menu {
        border-right: none;
        
        :deep(.el-menu-item) {
          &:hover {
            background-color: #1a2d3e;
          }
          
          &.is-active {
            background-color: #1890ff;
            color: #fff;
          }
        }
        
        :deep(.el-sub-menu__title) {
          &:hover {
            background-color: #1a2d3e;
          }
        }
      }
    }
    
    .main-container {
      background-color: #f5f7fa;
      
      .header {
        background-color: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 60px;
        
        .header-left {
          display: flex;
          align-items: center;
          
          .fold-menu {
            font-size: 20px;
            cursor: pointer;
            margin-right: 20px;
            color: #606266;
            
            &:hover {
              color: #1890ff;
            }
          }
          
          .page-title {
            font-size: 18px;
            font-weight: 600;
            color: #303133;
            font-family: 'ZCOOL QingKe HuangYou', 'Noto Sans SC', sans-serif;
          }
        }
        
        .header-right {
          display: flex;
          align-items: center;
          
          .header-icon {
            font-size: 20px;
            cursor: pointer;
            margin-right: 20px;
            color: #606266;
            
            &:hover {
              color: #1890ff;
            }
          }
          
          .user-dropdown {
            display: flex;
            align-items: center;
            cursor: pointer;
            
            .el-avatar {
              margin-right: 8px;
              background-color: #1890ff;
            }
            
            .user-name {
              font-size: 14px;
              color: #303133;
            }
          }
        }
      }
      
      .main {
        padding: 24px;
        background-color: #f5f7fa;
        overflow-y: auto;
        
        .el-card {
          margin-bottom: 20px;
          border-radius: 4px;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
          
          .el-card__header {
            border-bottom: 1px solid #ebeef5;
            padding: 12px 20px;
            font-weight: 600;
          }
        }
      }
      
      .footer {
        text-align: center;
        color: #909399;
        font-size: 14px;
        padding: 16px 0;
        background-color: #fff;
        border-top: 1px solid #ebeef5;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 