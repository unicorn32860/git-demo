<template>
  <div class="stat-view">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>访问量趋势</span>
              <el-radio-group v-model="visitTimeRange" size="small">
                <el-radio-button label="week">最近7天</el-radio-button>
                <el-radio-button label="month">最近30天</el-radio-button>
                <el-radio-button label="year">最近12个月</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="visitChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>热门景点排行</span>
            </div>
          </template>
          <div ref="hotSpotsChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户来源分布</span>
            </div>
          </template>
          <div ref="userSourceChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>订单统计</span>
              <el-select v-model="orderStatYear" size="small" style="width: 120px">
                <el-option
                  v-for="year in availableYears"
                  :key="year"
                  :label="year + '年'"
                  :value="year"
                />
              </el-select>
            </div>
          </template>
          <div ref="orderStatChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card class="chart-card">
          <template #header>
            <div class="card-header">
              <span>用户设备分布</span>
            </div>
          </template>
          <div ref="deviceChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>内容访问排行</span>
              <el-radio-group v-model="contentType" size="small">
                <el-radio-button label="article">文章</el-radio-button>
                <el-radio-button label="attraction">景点</el-radio-button>
                <el-radio-button label="route">路线</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <el-table :data="contentRankData" style="width: 100%">
            <el-table-column prop="rank" label="排名" width="80" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="viewCount" label="访问量" width="120" />
            <el-table-column prop="likeCount" label="点赞数" width="120" />
            <el-table-column prop="commentCount" label="评论数" width="120" />
            <el-table-column prop="shareCount" label="分享数" width="120" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

// 图表引用
const visitChartRef = ref(null);
const hotSpotsChartRef = ref(null);
const userSourceChartRef = ref(null);
const orderStatChartRef = ref(null);
const deviceChartRef = ref(null);

// 图表实例
let visitChart = null;
let hotSpotsChart = null;
let userSourceChart = null;
let orderStatChart = null;
let deviceChart = null;

// 筛选条件
const visitTimeRange = ref('week');
const orderStatYear = ref(new Date().getFullYear());
const contentType = ref('article');

// 可选年份
const currentYear = new Date().getFullYear();
const availableYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3, currentYear - 4];

// 内容排行数据
const contentRankData = ref([]);

// 获取访问量趋势数据
const fetchVisitTrend = async () => {
  try {
    const response = await axios.get('/api/admin/stat/visit-trend', {
      params: { timeRange: visitTimeRange.value }
    });
    if (response.data.code === 200) {
      renderVisitChart(response.data.data);
    }
  } catch (error) {
    console.error('获取访问量趋势数据失败', error);
    // 模拟数据
    let mockData;
    if (visitTimeRange.value === 'week') {
      mockData = {
        dates: ['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07'],
        values: [1200, 1350, 1800, 1640, 1720, 2100, 1950]
      };
    } else if (visitTimeRange.value === 'month') {
      mockData = {
        dates: Array.from({ length: 30 }, (_, i) => `05-${String(i + 1).padStart(2, '0')}`),
        values: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000) + 1000)
      };
    } else {
      mockData = {
        dates: ['2023-06', '2023-07', '2023-08', '2023-09', '2023-10', '2023-11', '2023-12', 
                '2024-01', '2024-02', '2024-03', '2024-04', '2024-05'],
        values: [32000, 38000, 45000, 40000, 35000, 30000, 28000, 
                 25000, 28000, 32000, 36000, 42000]
      };
    }
    renderVisitChart(mockData);
  }
};

// 获取热门景点数据
const fetchHotSpots = async () => {
  try {
    const response = await axios.get('/api/admin/stat/hot-spots');
    if (response.data.code === 200) {
      renderHotSpotsChart(response.data.data);
    }
  } catch (error) {
    console.error('获取热门景点数据失败', error);
    // 模拟数据
    const mockData = {
      names: ['福州三坊七巷', '鼓山', '西湖公园', '福州国家森林公园', '烟台山'],
      values: [4500, 3800, 3200, 2900, 2600]
    };
    renderHotSpotsChart(mockData);
  }
};

// 获取用户来源数据
const fetchUserSource = async () => {
  try {
    const response = await axios.get('/api/admin/stat/user-source');
    if (response.data.code === 200) {
      renderUserSourceChart(response.data.data);
    }
  } catch (error) {
    console.error('获取用户来源数据失败', error);
    // 模拟数据
    const mockData = [
      { name: '福建省', value: 65 },
      { name: '浙江省', value: 10 },
      { name: '广东省', value: 8 },
      { name: '江苏省', value: 5 },
      { name: '北京市', value: 4 },
      { name: '上海市', value: 3 },
      { name: '其他', value: 5 }
    ];
    renderUserSourceChart(mockData);
  }
};

// 获取订单统计数据
const fetchOrderStat = async () => {
  try {
    const response = await axios.get('/api/admin/stat/order-stat', {
      params: { year: orderStatYear.value }
    });
    if (response.data.code === 200) {
      renderOrderStatChart(response.data.data);
    }
  } catch (error) {
    console.error('获取订单统计数据失败', error);
    // 模拟数据
    const mockData = {
      months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      orderCount: [120, 132, 145, 160, 178, 195, 210, 232, 201, 184, 168, 152],
      orderAmount: [24000, 26400, 29000, 32000, 35600, 39000, 42000, 46400, 40200, 36800, 33600, 30400]
    };
    renderOrderStatChart(mockData);
  }
};

// 获取设备分布数据
const fetchDeviceStat = async () => {
  try {
    const response = await axios.get('/api/admin/stat/device-stat');
    if (response.data.code === 200) {
      renderDeviceChart(response.data.data);
    }
  } catch (error) {
    console.error('获取设备分布数据失败', error);
    // 模拟数据
    const mockData = [
      { name: '手机', value: 68 },
      { name: '电脑', value: 25 },
      { name: '平板', value: 7 }
    ];
    renderDeviceChart(mockData);
  }
};

// 获取内容排行数据
const fetchContentRank = async () => {
  try {
    const response = await axios.get('/api/admin/stat/content-rank', {
      params: { type: contentType.value }
    });
    if (response.data.code === 200) {
      contentRankData.value = response.data.data;
    }
  } catch (error) {
    console.error('获取内容排行数据失败', error);
    // 模拟数据
    if (contentType.value === 'article') {
      contentRankData.value = [
        { rank: 1, title: '福州三坊七巷游玩攻略', viewCount: 5680, likeCount: 320, commentCount: 156, shareCount: 89 },
        { rank: 2, title: '福州美食推荐：闽菜精选', viewCount: 4890, likeCount: 276, commentCount: 134, shareCount: 72 },
        { rank: 3, title: '福州周边自驾游路线', viewCount: 4350, likeCount: 245, commentCount: 118, shareCount: 65 },
        { rank: 4, title: '福州历史文化探索', viewCount: 3980, likeCount: 210, commentCount: 98, shareCount: 54 },
        { rank: 5, title: '福州最佳住宿推荐', viewCount: 3540, likeCount: 186, commentCount: 87, shareCount: 48 }
      ];
    } else if (contentType.value === 'attraction') {
      contentRankData.value = [
        { rank: 1, title: '福州三坊七巷', viewCount: 8760, likeCount: 542, commentCount: 287, shareCount: 156 },
        { rank: 2, title: '鼓山', viewCount: 7650, likeCount: 476, commentCount: 245, shareCount: 134 },
        { rank: 3, title: '西湖公园', viewCount: 6540, likeCount: 398, commentCount: 213, shareCount: 112 },
        { rank: 4, title: '福州国家森林公园', viewCount: 5890, likeCount: 365, commentCount: 187, shareCount: 98 },
        { rank: 5, title: '烟台山', viewCount: 5320, likeCount: 324, commentCount: 168, shareCount: 87 }
      ];
    } else {
      contentRankData.value = [
        { rank: 1, title: '福州经典一日游', viewCount: 4560, likeCount: 287, commentCount: 143, shareCount: 76 },
        { rank: 2, title: '福州美食之旅', viewCount: 4120, likeCount: 254, commentCount: 127, shareCount: 68 },
        { rank: 3, title: '福州历史文化探索路线', viewCount: 3780, likeCount: 234, commentCount: 112, shareCount: 61 },
        { rank: 4, title: '福州周边自然风光游', viewCount: 3450, likeCount: 213, commentCount: 98, shareCount: 54 },
        { rank: 5, title: '福州亲子游路线', viewCount: 3120, likeCount: 187, commentCount: 89, shareCount: 47 }
      ];
    }
  }
};

// 渲染访问量趋势图
const renderVisitChart = (data) => {
  if (!visitChartRef.value) return;
  
  if (!visitChart) {
    visitChart = echarts.init(visitChartRef.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.dates,
      axisLabel: {
        rotate: visitTimeRange.value === 'year' ? 0 : 30
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: data.values,
        itemStyle: {
          color: '#409EFF'
        }
      }
    ]
  };
  
  visitChart.setOption(option);
};

// 渲染热门景点图
const renderHotSpotsChart = (data) => {
  if (!hotSpotsChartRef.value) return;
  
  if (!hotSpotsChart) {
    hotSpotsChart = echarts.init(hotSpotsChartRef.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: data.names,
      axisLabel: {
        interval: 0
      }
    },
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: data.values,
        itemStyle: {
          color: '#67C23A'
        }
      }
    ]
  };
  
  hotSpotsChart.setOption(option);
};

// 渲染用户来源图
const renderUserSourceChart = (data) => {
  if (!userSourceChartRef.value) return;
  
  if (!userSourceChart) {
    userSourceChart = echarts.init(userSourceChartRef.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: data.map(item => item.name)
    },
    series: [
      {
        name: '用户来源',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
  
  userSourceChart.setOption(option);
};

// 渲染订单统计图
const renderOrderStatChart = (data) => {
  if (!orderStatChartRef.value) return;
  
  if (!orderStatChart) {
    orderStatChart = echarts.init(orderStatChartRef.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    legend: {
      data: ['订单数量', '订单金额']
    },
    xAxis: [
      {
        type: 'category',
        data: data.months,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '订单数量',
        position: 'left'
      },
      {
        type: 'value',
        name: '订单金额',
        position: 'right',
        axisLabel: {
          formatter: '{value} 元'
        }
      }
    ],
    series: [
      {
        name: '订单数量',
        type: 'bar',
        data: data.orderCount
      },
      {
        name: '订单金额',
        type: 'line',
        yAxisIndex: 1,
        data: data.orderAmount,
        lineStyle: {
          width: 3,
          color: '#E6A23C'
        },
        itemStyle: {
          color: '#E6A23C'
        }
      }
    ]
  };
  
  orderStatChart.setOption(option);
};

// 渲染设备分布图
const renderDeviceChart = (data) => {
  if (!deviceChartRef.value) return;
  
  if (!deviceChart) {
    deviceChart = echarts.init(deviceChartRef.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: 10,
      data: data.map(item => item.name)
    },
    series: [
      {
        name: '设备分布',
        type: 'pie',
        radius: '70%',
        center: ['50%', '45%'],
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  
  deviceChart.setOption(option);
};

// 监听筛选条件变化
watch(visitTimeRange, () => {
  fetchVisitTrend();
});

watch(orderStatYear, () => {
  fetchOrderStat();
});

watch(contentType, () => {
  fetchContentRank();
});

// 监听窗口大小变化，重绘图表
window.addEventListener('resize', () => {
  visitChart?.resize();
  hotSpotsChart?.resize();
  userSourceChart?.resize();
  orderStatChart?.resize();
  deviceChart?.resize();
});

onMounted(() => {
  fetchVisitTrend();
  fetchHotSpots();
  fetchUserSource();
  fetchOrderStat();
  fetchDeviceStat();
  fetchContentRank();
});
</script>

<style scoped>
.mt-20 {
  margin-top: 20px;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  height: 350px;
}
</style> 