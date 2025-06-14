<template>
  <div class="admin-dashboard">
    <h1>管理后台仪表盘</h1>
    
    <el-row :gutter="20" class="module-cards">
      <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="module in adminModules" :key="module.path">
        <el-card shadow="hover" class="module-card" @click="navigateTo(module.path)">
          <div class="module-icon">
            <el-icon :size="32">
              <component :is="module.icon" />
            </el-icon>
          </div>
          <div class="module-name">{{ module.name }}</div>
          <div class="module-desc">{{ module.description }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin';
import { 
  User, 
  Setting, 
  Document, 
  Picture, 
  DataAnalysis, 
  Grid, 
  Location, 
  ShoppingCart 
} from '@element-plus/icons-vue';

const router = useRouter();
const adminStore = useAdminStore();

// 所有可能的管理模块
const allAdminModules = [
  {
    name: '用户管理',
    path: '/admin/user',
    icon: User,
    description: '管理系统用户和权限',
    permission: 'user:view'
  },
  {
    name: '角色管理',
    path: '/admin/role',
    icon: Setting,
    description: '管理系统角色和权限',
    permission: 'role:view'
  },
  {
    name: '内容管理',
    path: '/admin/article',
    icon: Document,
    description: '管理文章和内容发布',
    permission: 'article:view'
  },
  {
    name: '景点管理',
    path: '/admin/attraction',
    icon: Location,
    description: '管理旅游景点信息',
    permission: 'attraction:view'
  },
  {
    name: '资源管理',
    path: '/admin/resource',
    icon: Picture,
    description: '管理系统资源和文件',
    permission: 'resource:view'
  },
  {
    name: '内容运营',
    path: '/admin/operation',
    icon: Grid,
    description: '管理运营活动和推广',
    permission: 'activity:view'
  },
  {
    name: '数据分析',
    path: '/admin/stat',
    icon: DataAnalysis,
    description: '查看系统数据统计',
    permission: 'stat:view'
  },
  {
    name: '订单管理',
    path: '/admin/order',
    icon: ShoppingCart,
    description: '管理用户订单',
    permission: 'order:view'
  }
];

// 根据权限过滤显示的模块
const adminModules = ref([]);

// 加载可访问模块
const loadAccessibleModules = () => {
  // 显示所有模块，不进行权限过滤
  adminModules.value = allAdminModules;
  
  // 以下是原有的权限过滤逻辑，暂时注释掉
  /*
  // 超级管理员显示所有模块
  if (adminStore.roleName === '超级管理员' || adminStore.roleName === '管理员') {
    adminModules.value = allAdminModules;
    return;
  }
  
  // 根据权限过滤模块
  adminModules.value = allAdminModules.filter(module => 
    !module.permission || adminStore.hasPermission(module.permission)
  );
  */
};

// 初始化
onMounted(() => {
  // 加载可访问模块
  loadAccessibleModules();
  console.log('管理后台仪表盘已挂载，临时显示所有模块');
});

const navigateTo = (path) => {
  console.log('导航到:', path);
  try {
    router.push(path);
    console.log('导航成功');
  } catch (error) {
    console.error('导航失败:', error);
  }
};
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}

.module-cards {
  margin-top: 30px;
}

.module-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s;
  margin-bottom: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.module-card:hover {
  transform: translateY(-5px);
}

.module-icon {
  margin-bottom: 15px;
  font-size: 36px;
}

.module-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.module-desc {
  font-size: 14px;
  color: #909399;
}
</style> 