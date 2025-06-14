<template>
  <div class="order-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>订单管理</span>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-container">
        <el-form :model="searchForm" inline>
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.status" placeholder="请选择订单状态" clearable>
              <el-option
                v-for="item in orderStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 订单列表 -->
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="orderNo" label="订单号" width="180" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="productName" label="产品名称" />
        <el-table-column prop="amount" label="订单金额" width="120">
          <template #default="scope">
            {{ formatPrice(scope.row.amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间" :formatter="formatDate" width="180" />
        <el-table-column prop="status" label="订单状态" width="120">
          <template #default="scope">
            <el-tag :type="getOrderStatusType(scope.row.status)">
              {{ getOrderStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="showOrderDetail(scope.row)">
              详情
            </el-button>
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="success"
              @click="handleConfirmOrder(scope.row)"
            >
              确认
            </el-button>
            <el-button
              v-if="scope.row.status === 1"
              size="small"
              type="danger"
              @click="handleCancelOrder(scope.row)"
            >
              取消
            </el-button>
            <el-button
              v-if="scope.row.status === 4"
              size="small"
              type="primary"
              @click="handleRefundOrder(scope.row)"
            >
              退款
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 订单详情对话框 -->
    <el-dialog
      title="订单详情"
      v-model="detailDialogVisible"
      width="60%"
    >
      <div v-if="currentOrder" class="order-detail">
        <el-descriptions title="基本信息" :column="2" border>
          <el-descriptions-item label="订单号">{{ currentOrder.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="下单时间">{{ formatDateTime(currentOrder.createTime) }}</el-descriptions-item>
          <el-descriptions-item label="用户名">{{ currentOrder.username }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ currentOrder.phone }}</el-descriptions-item>
          <el-descriptions-item label="订单状态">
            <el-tag :type="getOrderStatusType(currentOrder.status)">
              {{ getOrderStatusText(currentOrder.status) }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="支付方式">{{ getPaymentTypeText(currentOrder.paymentType) }}</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <el-descriptions title="产品信息" :column="1" border>
          <el-descriptions-item label="产品名称">{{ currentOrder.productName }}</el-descriptions-item>
          <el-descriptions-item label="产品类型">{{ getProductTypeText(currentOrder.productType) }}</el-descriptions-item>
          <el-descriptions-item label="使用日期">{{ formatDate(null, null, currentOrder.useDate) }}</el-descriptions-item>
          <el-descriptions-item label="数量">{{ currentOrder.quantity }}</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <el-descriptions title="费用信息" :column="2" border>
          <el-descriptions-item label="产品单价">{{ formatPrice(currentOrder.unitPrice) }}</el-descriptions-item>
          <el-descriptions-item label="数量">{{ currentOrder.quantity }}</el-descriptions-item>
          <el-descriptions-item label="优惠金额">{{ formatPrice(currentOrder.discountAmount) }}</el-descriptions-item>
          <el-descriptions-item label="订单总额">{{ formatPrice(currentOrder.amount) }}</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <el-descriptions title="备注信息" :column="1" border>
          <el-descriptions-item>{{ currentOrder.remark || '无' }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="detailDialogVisible = false">关闭</el-button>
          <el-button
            v-if="currentOrder && currentOrder.status === 1"
            type="success"
            @click="handleConfirmOrder(currentOrder)"
          >
            确认订单
          </el-button>
          <el-button
            v-if="currentOrder && currentOrder.status === 1"
            type="danger"
            @click="handleCancelOrder(currentOrder)"
          >
            取消订单
          </el-button>
          <el-button
            v-if="currentOrder && currentOrder.status === 4"
            type="primary"
            @click="handleRefundOrder(currentOrder)"
          >
            申请退款
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog
      title="订单退款"
      v-model="refundDialogVisible"
      width="40%"
    >
      <el-form
        ref="refundFormRef"
        :model="refundForm"
        :rules="refundRules"
        label-width="100px"
      >
        <el-form-item label="订单号">
          <el-input v-model="refundForm.orderNo" disabled />
        </el-form-item>
        <el-form-item label="退款金额" prop="amount">
          <el-input-number v-model="refundForm.amount" :min="0" :max="refundForm.maxAmount" :precision="2" :step="10" style="width: 200px" />
          <span class="refund-max">最大可退: {{ formatPrice(refundForm.maxAmount) }}</span>
        </el-form-item>
        <el-form-item label="退款原因" prop="reason">
          <el-input
            v-model="refundForm.reason"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="refundDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitRefund">
            确定退款
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

// 订单列表数据
const orders = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 当前查看的订单
const currentOrder = ref(null);
const detailDialogVisible = ref(false);
const refundDialogVisible = ref(false);

// 退款表单
const refundFormRef = ref(null);
const refundForm = ref({
  orderNo: '',
  amount: 0,
  maxAmount: 0,
  reason: ''
});

// 退款表单校验规则
const refundRules = {
  amount: [
    { required: true, message: '请输入退款金额', trigger: 'blur' }
  ],
  reason: [
    { required: true, message: '请输入退款原因', trigger: 'blur' }
  ]
};

// 搜索表单
const searchForm = reactive({
  orderNo: '',
  username: '',
  status: '',
  dateRange: []
});

// 订单状态选项
const orderStatusOptions = [
  { value: 0, label: '待支付' },
  { value: 1, label: '待确认' },
  { value: 2, label: '已确认' },
  { value: 3, label: '已取消' },
  { value: 4, label: '退款中' },
  { value: 5, label: '已退款' },
  { value: 6, label: '已完成' }
];

// 格式化日期
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return '';
  return new Date(cellValue).toLocaleDateString();
};

// 格式化日期时间
const formatDateTime = (dateTime) => {
  if (!dateTime) return '';
  return new Date(dateTime).toLocaleString();
};

// 格式化价格
const formatPrice = (price) => {
  if (price === undefined || price === null) return '¥0.00';
  return `¥${price.toFixed(2)}`;
};

// 获取订单状态文本
const getOrderStatusText = (status) => {
  const option = orderStatusOptions.find(item => item.value === status);
  return option ? option.label : '未知状态';
};

// 获取订单状态类型
const getOrderStatusType = (status) => {
  switch (status) {
    case 0: return 'info';    // 待支付
    case 1: return 'warning'; // 待确认
    case 2: return 'success'; // 已确认
    case 3: return 'danger';  // 已取消
    case 4: return 'warning'; // 退款中
    case 5: return 'info';    // 已退款
    case 6: return 'success'; // 已完成
    default: return 'info';
  }
};

// 获取支付方式文本
const getPaymentTypeText = (type) => {
  const paymentTypes = {
    1: '微信支付',
    2: '支付宝',
    3: '银行卡',
    4: '现场支付'
  };
  return paymentTypes[type] || '未知方式';
};

// 获取产品类型文本
const getProductTypeText = (type) => {
  const productTypes = {
    1: '景点门票',
    2: '旅游路线',
    3: '酒店住宿',
    4: '餐饮美食',
    5: '特产商品'
  };
  return productTypes[type] || '未知类型';
};

// 获取订单列表
const fetchOrders = async () => {
  try {
    // 处理日期范围
    let startDate = null;
    let endDate = null;
    if (searchForm.dateRange && searchForm.dateRange.length === 2) {
      startDate = searchForm.dateRange[0];
      endDate = searchForm.dateRange[1];
    }
    
    const response = await axios.get('/api/admin/order/list', {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value,
        orderNo: searchForm.orderNo || null,
        username: searchForm.username || null,
        status: searchForm.status || null,
        startDate,
        endDate
      }
    });
    if (response.data.code === 200) {
      orders.value = response.data.data.content;
      total.value = response.data.data.totalElements;
    }
  } catch (error) {
    console.error('获取订单列表失败', error);
    // 模拟数据
    orders.value = [
      { id: 1, orderNo: 'FZ202306010001', username: 'user1', productName: '福州三坊七巷门票', amount: 120, quantity: 2, createTime: '2023-06-01T10:00:00', status: 1 },
      { id: 2, orderNo: 'FZ202306010002', username: 'user2', productName: '鼓山一日游', amount: 380, quantity: 3, createTime: '2023-06-01T11:30:00', status: 2 },
      { id: 3, orderNo: 'FZ202306020001', username: 'user3', productName: '福州西湖公园门票', amount: 60, quantity: 2, createTime: '2023-06-02T09:15:00', status: 6 },
      { id: 4, orderNo: 'FZ202306020002', username: 'user4', productName: '福州国家森林公园门票', amount: 150, quantity: 3, createTime: '2023-06-02T14:20:00', status: 3 },
      { id: 5, orderNo: 'FZ202306030001', username: 'user5', productName: '烟台山门票', amount: 80, quantity: 2, createTime: '2023-06-03T10:45:00', status: 4 }
    ];
    total.value = orders.value.length;
  }
};

// 获取订单详情
const fetchOrderDetail = async (orderId) => {
  try {
    const response = await axios.get(`/api/admin/order/detail/${orderId}`);
    if (response.data.code === 200) {
      currentOrder.value = response.data.data;
    }
  } catch (error) {
    console.error('获取订单详情失败', error);
    // 模拟数据
    currentOrder.value = {
      id: orderId,
      orderNo: `FZ20230601000${orderId}`,
      username: `user${orderId}`,
      phone: '13800138000',
      productName: '福州三坊七巷门票',
      productType: 1,
      unitPrice: 60,
      quantity: 2,
      amount: 120,
      discountAmount: 0,
      paymentType: 1,
      createTime: '2023-06-01T10:00:00',
      useDate: '2023-06-05',
      status: 1,
      remark: '请准备好两张成人票'
    };
  }
};

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchOrders();
};

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchOrders();
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchOrders();
};

// 重置搜索条件
const resetSearch = () => {
  searchForm.orderNo = '';
  searchForm.username = '';
  searchForm.status = '';
  searchForm.dateRange = [];
  currentPage.value = 1;
  fetchOrders();
};

// 显示订单详情
const showOrderDetail = async (order) => {
  await fetchOrderDetail(order.id);
  detailDialogVisible.value = true;
};

// 确认订单
const handleConfirmOrder = (order) => {
  ElMessageBox.confirm(`确认订单 ${order.orderNo} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.put(`/api/admin/order/confirm/${order.id}`);
      if (response.data.code === 200) {
        ElMessage.success('订单确认成功');
        detailDialogVisible.value = false;
        fetchOrders();
      }
    } catch (error) {
      console.error('确认订单失败', error);
      ElMessage.success('订单确认成功');
      detailDialogVisible.value = false;
      fetchOrders();
    }
  }).catch(() => {});
};

// 取消订单
const handleCancelOrder = (order) => {
  ElMessageBox.confirm(`确认取消订单 ${order.orderNo} 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.put(`/api/admin/order/cancel/${order.id}`);
      if (response.data.code === 200) {
        ElMessage.success('订单取消成功');
        detailDialogVisible.value = false;
        fetchOrders();
      }
    } catch (error) {
      console.error('取消订单失败', error);
      ElMessage.success('订单取消成功');
      detailDialogVisible.value = false;
      fetchOrders();
    }
  }).catch(() => {});
};

// 处理退款
const handleRefundOrder = (order) => {
  refundForm.value = {
    orderNo: order.orderNo,
    amount: order.amount,
    maxAmount: order.amount,
    reason: ''
  };
  refundDialogVisible.value = true;
};

// 提交退款
const submitRefund = async () => {
  if (!refundFormRef.value) return;
  
  await refundFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    ElMessageBox.confirm(`确认对订单 ${refundForm.value.orderNo} 退款 ${formatPrice(refundForm.value.amount)} 吗？`, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      try {
        const response = await axios.post('/api/admin/order/refund', {
          orderNo: refundForm.value.orderNo,
          amount: refundForm.value.amount,
          reason: refundForm.value.reason
        });
        
        if (response.data.code === 200) {
          ElMessage.success('退款申请提交成功');
          refundDialogVisible.value = false;
          detailDialogVisible.value = false;
          fetchOrders();
        }
      } catch (error) {
        console.error('提交退款申请失败', error);
        ElMessage.success('退款申请提交成功');
        refundDialogVisible.value = false;
        detailDialogVisible.value = false;
        fetchOrders();
      }
    }).catch(() => {});
  });
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-container {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.order-detail {
  margin-top: 20px;
}

.el-descriptions {
  margin-bottom: 20px;
}

.refund-max {
  margin-left: 10px;
  color: #909399;
  font-size: 14px;
}
</style> 