import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/attractions',
      name: 'attractions',
      component: () => import('@/views/Attractions.vue'),
      meta: { title: '景点导览' }
    },
    {
      path: '/routes',
      name: 'routes',
      component: () => import('@/views/Routes.vue'),
      meta: { title: '路线推荐' }
    },
    {
      path: '/food',
      name: 'food',
      component: () => import('@/views/Food.vue'),
      meta: { title: '美食特产' }
    },
    {
      path: '/accommodation',
      name: 'accommodation',
      component: () => import('@/views/Accommodation.vue'),
      meta: { title: '住宿交通' }
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/views/Guide.vue'),
      meta: { title: '旅游攻略' }
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('@/views/Weather.vue'),
      meta: { title: '实时天气' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { title: '注册' }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/ForgotPassword.vue'),
      meta: { title: '忘记密码' }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      meta: { title: '管理后台', requiresAuth: true },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
          meta: { title: '仪表盘', requiresAuth: true }
        },
        {
          path: 'role',
          name: 'admin-role',
          component: () => import('@/views/admin/RoleManageView.vue'),
          meta: { title: '角色管理', requiresAuth: true }
        },
        {
          path: 'user',
          name: 'admin-user',
          component: () => import('@/views/admin/UserManageView.vue'),
          meta: { title: '用户管理', requiresAuth: true }
        },
        {
          path: 'permission',
          name: 'admin-permission',
          component: () => import('@/views/admin/PermissionManageView.vue'),
          meta: { title: '权限管理', requiresAuth: true }
        },
        {
          path: 'article',
          name: 'admin-article',
          component: () => import('@/views/admin/ArticleManageView.vue'),
          meta: { title: '内容管理', requiresAuth: true }
        },
        {
          path: 'resource',
          name: 'admin-resource',
          component: () => import('@/views/admin/ResourceManageView.vue'),
          meta: { title: '资源管理', requiresAuth: true }
        },
        {
          path: 'operation',
          name: 'admin-operation',
          component: () => import('@/views/admin/OperationManageView.vue'),
          meta: { title: '内容运营', requiresAuth: true }
        },
        {
          path: 'stat',
          name: 'admin-stat',
          component: () => import('@/views/admin/StatView.vue'),
          meta: { title: '数据分析', requiresAuth: true }
        },
        {
          path: 'order',
          name: 'admin-order',
          component: () => import('@/views/admin/OrderManageView.vue'),
          meta: { title: '订单管理', requiresAuth: true }
        },
        {
          path: 'attraction',
          name: 'admin-attraction',
          component: () => import('@/views/admin/AttractionManageView.vue'),
          meta: { title: '景点管理', requiresAuth: true }
        }
      ]
    },
    {
      path: '/order/confirm',
      name: 'order-confirm',
      component: () => import('@/views/OrderConfirm.vue'),
      meta: { title: '订单确认' }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('@/views/Payment.vue'),
      meta: { title: '订单支付' }
    },
    {
      path: '/user/orders',
      name: 'user-orders',
      component: () => import('@/views/UserOrders.vue'),
      meta: { title: '我的订单' }
    },
    {
      path: '/user/orders/:id',
      name: 'order-detail',
      component: () => import('@/views/UserOrders.vue'),
      meta: { title: '订单详情' }
    },
    // 亮点景点路由
    {
      path: '/highlights/sanfang-qixiang',
      name: 'SanfangQixiang',
      component: () => import('@/views/highlights/SanfangQixiang.vue'),
      meta: { title: '三坊七巷' }
    },
    {
      path: '/highlights/gushan',
      name: 'Gushan',
      component: () => import('@/views/highlights/Gushan.vue'),
      meta: { title: '鼓山风景区' }
    },
    {
      path: '/highlights/min-cuisine',
      name: 'MinCuisine',
      component: () => import('@/views/highlights/MinCuisine.vue'),
      meta: { title: '闽菜文化' }
    },
    {
      path: '/highlights/minjiang-night',
      name: 'MinjiangNight',
      component: () => import('@/views/highlights/MinjiangNight.vue'),
      meta: { title: '闽江夜景' }
    },
    {
      path: '/highlights/historical-celebrities',
      name: 'HistoricalCelebrities',
      component: () => import('@/views/highlights/HistoricalCelebrities.vue'),
      meta: { title: '历史名人故居' }
    },
    {
      path: '/highlights/hot-springs',
      name: 'HotSprings',
      component: () => import('@/views/highlights/HotSprings.vue'),
      meta: { title: '温泉资源' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: '页面不存在' }
    }
  ],
  // 添加滚动行为配置，让页面跳转时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如使用浏览器的后退按钮）
    if (savedPosition) {
      return savedPosition;
    }
    // 对于所有其他路由导航，滚动到顶部
    return { top: 0 };
  }
})

// 全局前置守卫，设置页面标题和验证权限
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 福州旅游指南`;
  } else {
    document.title = '福州旅游指南';
  }
  
  // 检查是否需要登录权限
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查用户是否已登录
    const token = localStorage.getItem('token')
    const adminUserInfo = localStorage.getItem('adminUserInfo')
    
    if (!token && !adminUserInfo) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录，继续
      next()
    }
  } else {
    // 不需要登录权限，继续
    next()
  }
});

export default router