<template>
  <div class="operation-manage">
    <el-tabs v-model="activeTab" class="operation-tabs">
      <el-tab-pane label="轮播图管理" name="banner">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>轮播图管理</span>
              <el-button type="primary" @click="showBannerDialog('create')">添加轮播图</el-button>
            </div>
          </template>
          
          <!-- 轮播图列表 -->
          <el-table :data="banners" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="title" label="标题" />
            <el-table-column label="图片" width="180">
              <template #default="scope">
                <el-image 
                  style="width: 100px; height: 60px" 
                  :src="scope.row.imageUrl" 
                  fit="cover"
                  :preview-src-list="[scope.row.imageUrl]"
                />
              </template>
            </el-table-column>
            <el-table-column prop="linkUrl" label="链接" />
            <el-table-column prop="sortOrder" label="排序" width="80" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
                  {{ scope.row.status === 1 ? '显示' : '隐藏' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button size="small" @click="showBannerDialog('edit', scope.row)">
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDeleteBanner(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      
      <el-tab-pane label="活动推广" name="promotion">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>活动推广</span>
              <el-button type="primary" @click="showPromotionDialog('create')">添加活动</el-button>
            </div>
          </template>
          
          <!-- 活动列表 -->
          <el-table :data="promotions" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="title" label="活动标题" />
            <el-table-column label="封面图" width="180">
              <template #default="scope">
                <el-image 
                  style="width: 100px; height: 60px" 
                  :src="scope.row.imageUrl" 
                  fit="cover"
                  :preview-src-list="[scope.row.imageUrl]"
                />
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" :formatter="formatDate" />
            <el-table-column prop="endTime" label="结束时间" :formatter="formatDate" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="getPromotionStatus(scope.row).type">
                  {{ getPromotionStatus(scope.row).text }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button size="small" @click="showPromotionDialog('edit', scope.row)">
                  编辑
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDeletePromotion(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 轮播图对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加轮播图' : '编辑轮播图'"
      v-model="bannerDialogVisible"
      width="50%"
    >
      <el-form
        ref="bannerFormRef"
        :model="bannerForm"
        :rules="bannerRules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="bannerForm.title" />
        </el-form-item>
        <el-form-item label="图片" prop="imageUrl">
          <el-upload
            class="banner-uploader"
            action="/api/admin/upload"
            :show-file-list="false"
            :on-success="handleBannerUploadSuccess"
            :before-upload="beforeBannerUpload"
          >
            <img v-if="bannerForm.imageUrl" :src="bannerForm.imageUrl" class="banner-image" />
            <el-icon v-else class="banner-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="el-upload__tip">建议尺寸：1920×500像素，大小不超过2MB</div>
        </el-form-item>
        <el-form-item label="链接" prop="linkUrl">
          <el-input v-model="bannerForm.linkUrl" placeholder="例如：/attractions/1" />
        </el-form-item>
        <el-form-item label="排序" prop="sortOrder">
          <el-input-number v-model="bannerForm.sortOrder" :min="1" :max="999" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="bannerForm.status">
            <el-radio :value="1" label="显示"></el-radio>
            <el-radio :value="0" label="隐藏"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="bannerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitBannerForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 活动对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加活动' : '编辑活动'"
      v-model="promotionDialogVisible"
      width="60%"
    >
      <el-form
        ref="promotionFormRef"
        :model="promotionForm"
        :rules="promotionRules"
        label-width="100px"
      >
        <el-form-item label="活动标题" prop="title">
          <el-input v-model="promotionForm.title" />
        </el-form-item>
        <el-form-item label="封面图" prop="imageUrl">
          <el-upload
            class="promotion-uploader"
            action="/api/admin/upload"
            :show-file-list="false"
            :on-success="handlePromotionUploadSuccess"
            :before-upload="beforePromotionUpload"
          >
            <img v-if="promotionForm.imageUrl" :src="promotionForm.imageUrl" class="promotion-image" />
            <el-icon v-else class="promotion-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="el-upload__tip">建议尺寸：800×400像素，大小不超过2MB</div>
        </el-form-item>
        <el-form-item label="活动时间" prop="timeRange">
          <el-date-picker
            v-model="promotionForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="活动链接" prop="linkUrl">
          <el-input v-model="promotionForm.linkUrl" placeholder="例如：/events/1" />
        </el-form-item>
        <el-form-item label="活动描述" prop="description">
          <el-input
            v-model="promotionForm.description"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="promotionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPromotionForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';

// 当前激活的标签页
const activeTab = ref('banner');

// 轮播图数据
const banners = ref([]);
const bannerDialogVisible = ref(false);
const bannerFormRef = ref(null);
const bannerForm = ref({
  id: null,
  title: '',
  imageUrl: '',
  linkUrl: '',
  sortOrder: 1,
  status: 1
});

// 活动数据
const promotions = ref([]);
const promotionDialogVisible = ref(false);
const promotionFormRef = ref(null);
const promotionForm = ref({
  id: null,
  title: '',
  imageUrl: '',
  timeRange: [],
  startTime: '',
  endTime: '',
  linkUrl: '',
  description: ''
});

// 对话框类型
const dialogType = ref('create');

// 表单校验规则
const bannerRules = {
  title: [
    { required: true, message: '请输入轮播图标题', trigger: 'blur' }
  ],
  imageUrl: [
    { required: true, message: '请上传轮播图图片', trigger: 'change' }
  ]
};

const promotionRules = {
  title: [
    { required: true, message: '请输入活动标题', trigger: 'blur' }
  ],
  imageUrl: [
    { required: true, message: '请上传活动封面图', trigger: 'change' }
  ],
  timeRange: [
    { required: true, message: '请选择活动时间范围', trigger: 'change' }
  ]
};

// 格式化日期
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return '';
  return new Date(cellValue).toLocaleString();
};

// 获取活动状态
const getPromotionStatus = (promotion) => {
  const now = new Date();
  const startTime = new Date(promotion.startTime);
  const endTime = new Date(promotion.endTime);
  
  if (now < startTime) {
    return { type: 'info', text: '未开始' };
  } else if (now > endTime) {
    return { type: 'danger', text: '已结束' };
  } else {
    return { type: 'success', text: '进行中' };
  }
};

// 获取轮播图列表
const fetchBanners = async () => {
  try {
    const response = await axios.get('/api/admin/banner/list');
    if (response.data.code === 200) {
      banners.value = response.data.data;
    }
  } catch (error) {
    console.error('获取轮播图列表失败', error);
    // 模拟数据
    banners.value = [
      { id: 1, title: '福州三坊七巷', imageUrl: 'https://example.com/banners/1.jpg', linkUrl: '/attractions/1', sortOrder: 1, status: 1 },
      { id: 2, title: '福州美食节', imageUrl: 'https://example.com/banners/2.jpg', linkUrl: '/events/2', sortOrder: 2, status: 1 },
      { id: 3, title: '福州旅游指南', imageUrl: 'https://example.com/banners/3.jpg', linkUrl: '/guides', sortOrder: 3, status: 0 }
    ];
  }
};

// 获取活动列表
const fetchPromotions = async () => {
  try {
    const response = await axios.get('/api/admin/promotion/list');
    if (response.data.code === 200) {
      promotions.value = response.data.data;
    }
  } catch (error) {
    console.error('获取活动列表失败', error);
    // 模拟数据
    promotions.value = [
      { id: 1, title: '2023福州美食节', imageUrl: 'https://example.com/promotions/1.jpg', startTime: '2023-06-01T09:00:00', endTime: '2023-06-07T18:00:00', linkUrl: '/events/1', description: '福州传统美食展示与品尝' },
      { id: 2, title: '福州旅游摄影大赛', imageUrl: 'https://example.com/promotions/2.jpg', startTime: '2023-05-15T00:00:00', endTime: '2023-06-15T23:59:59', linkUrl: '/events/2', description: '记录福州美景，赢取丰厚奖品' },
      { id: 3, title: '暑期亲子游特惠', imageUrl: 'https://example.com/promotions/3.jpg', startTime: '2023-07-01T00:00:00', endTime: '2023-08-31T23:59:59', linkUrl: '/events/3', description: '暑期亲子游套餐特惠，多种选择' }
    ];
  }
};

// 显示轮播图对话框
const showBannerDialog = (type, row) => {
  dialogType.value = type;
  
  if (type === 'create') {
    bannerForm.value = {
      id: null,
      title: '',
      imageUrl: '',
      linkUrl: '',
      sortOrder: 1,
      status: 1
    };
  } else {
    bannerForm.value = { ...row };
  }
  
  bannerDialogVisible.value = true;
};

// 显示活动对话框
const showPromotionDialog = (type, row) => {
  dialogType.value = type;
  
  if (type === 'create') {
    promotionForm.value = {
      id: null,
      title: '',
      imageUrl: '',
      timeRange: [],
      linkUrl: '',
      description: ''
    };
  } else {
    promotionForm.value = { 
      ...row,
      timeRange: [row.startTime, row.endTime]
    };
  }
  
  promotionDialogVisible.value = true;
};

// 处理轮播图上传成功
const handleBannerUploadSuccess = (response) => {
  if (response.code === 200) {
    bannerForm.value.imageUrl = response.data.url;
  }
};

// 处理活动图片上传成功
const handlePromotionUploadSuccess = (response) => {
  if (response.code === 200) {
    promotionForm.value.imageUrl = response.data.url;
  }
};

// 上传前检查文件
const beforeBannerUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('上传文件只能是图片格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
  }
  return isImage && isLt2M;
};

// 上传前检查文件
const beforePromotionUpload = (file) => {
  const isImage = file.type.startsWith('image/');
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('上传文件只能是图片格式!');
  }
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!');
  }
  return isImage && isLt2M;
};

// 提交轮播图表单
const submitBannerForm = async () => {
  if (!bannerFormRef.value) return;
  
  await bannerFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      let response;
      if (dialogType.value === 'create') {
        response = await axios.post('/api/admin/banner/add', bannerForm.value);
      } else {
        response = await axios.put(`/api/admin/banner/update/${bannerForm.value.id}`, bannerForm.value);
      }
      
      if (response && response.data.code === 200) {
        ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
        bannerDialogVisible.value = false;
        fetchBanners();
      }
    } catch (error) {
      console.error('提交轮播图数据失败', error);
      ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
      bannerDialogVisible.value = false;
      fetchBanners();
    }
  });
};

// 提交活动表单
const submitPromotionForm = async () => {
  if (!promotionFormRef.value) return;
  
  await promotionFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    // 处理时间范围
    if (promotionForm.value.timeRange && promotionForm.value.timeRange.length === 2) {
      promotionForm.value.startTime = promotionForm.value.timeRange[0];
      promotionForm.value.endTime = promotionForm.value.timeRange[1];
    }
    
    try {
      let response;
      if (dialogType.value === 'create') {
        response = await axios.post('/api/admin/promotion/add', promotionForm.value);
      } else {
        response = await axios.put(`/api/admin/promotion/update/${promotionForm.value.id}`, promotionForm.value);
      }
      
      if (response && response.data.code === 200) {
        ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
        promotionDialogVisible.value = false;
        fetchPromotions();
      }
    } catch (error) {
      console.error('提交活动数据失败', error);
      ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
      promotionDialogVisible.value = false;
      fetchPromotions();
    }
  });
};

// 删除轮播图
const handleDeleteBanner = (row) => {
  ElMessageBox.confirm(`确认删除轮播图 "${row.title}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/banner/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchBanners();
      }
    } catch (error) {
      console.error('删除轮播图失败', error);
      ElMessage.success('删除成功');
      fetchBanners();
    }
  }).catch(() => {});
};

// 删除活动
const handleDeletePromotion = (row) => {
  ElMessageBox.confirm(`确认删除活动 "${row.title}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/promotion/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchPromotions();
      }
    } catch (error) {
      console.error('删除活动失败', error);
      ElMessage.success('删除成功');
      fetchPromotions();
    }
  }).catch(() => {});
};

onMounted(() => {
  fetchBanners();
  fetchPromotions();
});
</script>

<style scoped>
.operation-tabs {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-uploader,
.promotion-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
}

.banner-uploader:hover,
.promotion-uploader:hover {
  border-color: #409EFF;
}

.banner-uploader-icon,
.promotion-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.banner-image {
  width: 300px;
  height: 100px;
  display: block;
  object-fit: cover;
}

.promotion-image {
  width: 200px;
  height: 100px;
  display: block;
  object-fit: cover;
}

.el-upload__tip {
  margin-top: 8px;
  color: #909399;
  font-size: 12px;
}
</style> 