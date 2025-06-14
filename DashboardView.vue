<template>
  <div class="admin-dashboard">
    <h1>管理仪表盘</h1>
    
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon user-icon">
              <el-icon><icon-user /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.userCount }}</div>
              <div class="stat-label">用户数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon site-icon">
              <el-icon><icon-location /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.siteCount }}</div>
              <div class="stat-label">景点数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon article-icon">
              <el-icon><icon-document /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.articleCount }}</div>
              <div class="stat-label">文章数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <el-card>
          <div class="stat-card">
            <div class="stat-icon order-icon">
              <el-icon><icon-shopping-cart /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ stats.orderCount }}</div>
              <div class="stat-label">订单数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最近7天订单趋势</span>
            </div>
          </template>
          <el-empty v-if="!orderTrendReady" description="数据加载中..."></el-empty>
          <div v-else ref="orderTrendChart" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>热门景点排行</span>
            </div>
          </template>
          <el-table :data="hotSites" stripe style="width: 100%">
            <el-table-column prop="siteName" label="景点名称" width="180" />
            <el-table-column prop="orderCount" label="订单数量" width="100" />
            <el-table-column prop="totalSales" label="销售额">
              <template #default="scope">
                {{ scope.row.totalSales.toFixed(2) }} 元
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';
import {
  User as IconUser,
  Document as IconDocument,
  Location as IconLocation,
  ShoppingCart as IconShoppingCart,
} from '@element-plus/icons-vue';

// 统计数据
const stats = ref({
  userCount: 0,
  siteCount: 0,
  articleCount: 0,
  orderCount: 0
});

// 订单趋势图相关
const orderTrendChart = ref(null);
const orderTrendReady = ref(false);
const orderTrend = ref([]);

// 热门景点数据
const hotSites = ref([]);

// 获取仪表盘统计数据
const fetchDashboardStats = async () => {
  try {
    const response = await axios.get('/api/admin/dashboard/stat');
    if (response.data.code === 200) {
      stats.value = response.data.data;
    }
  } catch (error) {
    console.error('获取仪表盘统计数据失败', error);
    stats.value = {
      userCount: 128,
      siteCount: 45,
      articleCount: 67,
      orderCount: 298
    };
  }
};

// 获取订单趋势数据
const fetchOrderTrend = async () => {
  try {
    const response = await axios.get('/api/admin/dashboard/order-trend');
    if (response.data.code === 200) {
      orderTrend.value = response.data.data;
      orderTrendReady.value = true;
      renderOrderTrendChart();
    }
  } catch (error) {
    console.error('获取订单趋势数据失败', error);
    // 模拟数据
    orderTrend.value = [
      { date: '05-28', count: 12 },
      { date: '05-29', count: 19 },
      { date: '05-30', count: 23 },
      { date: '05-31', count: 31 },
      { date: '06-01', count: 27 },
      { date: '06-02', count: 38 },
      { date: '06-03', count: 42 }
    ];
    orderTrendReady.value = true;
    renderOrderTrendChart();
  }
};

// 渲染订单趋势图
const renderOrderTrendChart = () => {
  if (!orderTrendChart.value) return;
  
  const chart = echarts.init(orderTrendChart.value);
  const dates = orderTrend.value.map(item => item.date);
  const counts = orderTrend.value.map(item => item.count);
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: {
        rotate: 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单数量',
        type: 'line',
        data: counts,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(58, 71, 212, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(58, 71, 212, 0.05)'
              }
            ]
          }
        },
        itemStyle: {
          color: '#3a47d4'
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  };
  
  chart.setOption(option);
  
  // 窗口大小变化时重绘图表
  window.addEventListener('resize', () => {
    chart.resize();
  });
};

// 获取热门景点数据
const fetchHotSites = async () => {
  try {
    const response = await axios.get('/api/admin/stat/hot-sites', {
      params: { limit: 5 }
    });
    if (response.data.code === 200) {
      hotSites.value = response.data.data;
    }
  } catch (error) {
    console.error('获取热门景点数据失败', error);
    // 模拟数据
    hotSites.value = [
      { siteName: '福州三坊七巷', orderCount: 156, totalSales: 15600 },
      { siteName: '鼓山', orderCount: 124, totalSales: 12400 },
      { siteName: '西湖公园', orderCount: 98, totalSales: 9800 },
      { siteName: '福州国家森林公园', orderCount: 87, totalSales: 8700 },
      { siteName: '烟台山', orderCount: 76, totalSales: 7600 }
    ];
  }
};

onMounted(() => {
  fetchDashboardStats();
  fetchOrderTrend();
  fetchHotSites();
});
</script>

<style scoped>
.admin-dashboard {
  padding: 20px 0;
}

.mt-20 {
  margin-top: 20px;
}

.stat-card {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.stat-icon .el-icon {
  font-size: 28px;
  color: #fff;
}

.user-icon {
  background-color: #409eff;
}

.site-icon {
  background-color: #67c23a;
}

.article-icon {
  background-color: #e6a23c;
}

.order-icon {
  background-color: #f56c6c;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.chart-container {
  height: 300px;
}
</style> 