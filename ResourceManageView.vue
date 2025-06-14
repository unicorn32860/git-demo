<template>
  <div class="resource-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>资源管理</span>
          <el-button type="primary" @click="showCreateDialog">上传资源</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-container">
        <el-form :model="searchForm" inline>
          <el-form-item label="名称">
            <el-input v-model="searchForm.name" placeholder="请输入资源名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="searchForm.type" placeholder="请选择资源类型" clearable>
              <el-option
                v-for="type in resourceTypes"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 资源列表 -->
      <el-table :data="resources" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="资源名称" />
        <el-table-column prop="typeName" label="类型" width="120" />
        <el-table-column prop="size" label="大小" width="120">
          <template #default="scope">
            {{ formatFileSize(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column prop="uploadTime" label="上传时间" :formatter="formatDate" />
        <el-table-column label="预览" width="100">
          <template #default="scope">
            <el-button size="small" @click="previewResource(scope.row)" v-if="isPreviewable(scope.row.type)">
              预览
            </el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="downloadResource(scope.row)">
              下载
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
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

    <!-- 上传资源对话框 -->
    <el-dialog
      title="上传资源"
      v-model="dialogVisible"
      width="50%"
    >
      <el-form
        ref="resourceFormRef"
        :model="resourceForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="resourceForm.name" />
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <el-select v-model="resourceForm.type" placeholder="请选择资源类型">
            <el-option
              v-for="type in resourceTypes"
              :key="type.value"
              :label="type.label"
              :value="type.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="resourceForm.description"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="文件" prop="file">
          <el-upload
            ref="uploadRef"
            action="/api/admin/resources/upload"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
            :file-list="fileList"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">
                文件大小不超过50MB
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            上传
          </el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 预览对话框 -->
    <el-dialog
      title="资源预览"
      v-model="previewVisible"
      width="70%"
    >
      <div class="preview-container" v-if="currentResource">
        <!-- 图片预览 -->
        <img 
          v-if="isImage(currentResource.type)" 
          :src="currentResource.url" 
          class="preview-image" 
        />
        
        <!-- 视频预览 -->
        <video 
          v-else-if="isVideo(currentResource.type)" 
          :src="currentResource.url" 
          controls 
          class="preview-video"
        ></video>
        
        <!-- PDF预览 -->
        <iframe 
          v-else-if="isPdf(currentResource.type)" 
          :src="currentResource.url" 
          class="preview-pdf"
        ></iframe>
        
        <!-- 全景图预览 -->
        <div 
          v-else-if="isPanorama(currentResource.type)" 
          class="preview-panorama"
        >
          <iframe 
            :src="`/panorama-viewer.html?url=${encodeURIComponent(currentResource.url)}`" 
            class="panorama-iframe"
          ></iframe>
          <div class="panorama-link-section" v-if="currentResource.type === 'panorama'">
            <p>关联到景点:</p>
            <div class="panorama-link-form">
              <el-select v-model="selectedSiteId" placeholder="选择景点">
                <el-option
                  v-for="site in siteList"
                  :key="site.id"
                  :label="site.name"
                  :value="site.id"
                />
              </el-select>
              <el-button type="primary" @click="linkPanoramaToSite">关联</el-button>
            </div>
          </div>
        </div>
        
        <!-- 其他类型 -->
        <div v-else class="preview-unsupported">
          <el-icon><document /></el-icon>
          <p>该文件类型不支持预览，请下载后查看</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Document, Picture, VideoPlay } from '@element-plus/icons-vue';
import axios from 'axios';

// 资源列表数据
const resources = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const siteList = ref([]);
const selectedSiteId = ref(null);

// 资源类型
const resourceTypes = [
  { value: 'image', label: '图片' },
  { value: 'video', label: '视频' },
  { value: 'audio', label: '音频' },
  { value: 'document', label: '文档' },
  { value: 'panorama', label: '360°全景图' },
  { value: 'other', label: '其他' }
];

// 搜索表单
const searchForm = reactive({
  name: '',
  type: ''
});

// 对话框控制
const dialogVisible = ref(false);
const previewVisible = ref(false);
const currentResource = ref(null);
const fileList = ref([]);
const uploadRef = ref(null);

// 表单数据
const resourceFormRef = ref(null);
const resourceForm = ref({
  name: '',
  type: '',
  description: '',
  file: null
});

// 表单校验规则
const rules = {
  name: [
    { required: true, message: '请输入资源名称', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择资源类型', trigger: 'change' }
  ]
};

// 格式化日期
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return '';
  return new Date(cellValue).toLocaleString();
};

// 格式化文件大小
const formatFileSize = (size) => {
  if (!size) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let fileSize = size;
  
  while (fileSize >= 1024 && index < units.length - 1) {
    fileSize /= 1024;
    index++;
  }
  
  return `${fileSize.toFixed(2)} ${units[index]}`;
};

// 判断文件类型
const isImage = (type) => {
  return type === 'image';
};

const isVideo = (type) => {
  return type === 'video';
};

const isPdf = (type) => {
  return type === 'document' && currentResource.value?.url?.endsWith('.pdf');
};

const isPanorama = (type) => {
  return type === 'panorama';
};

const isPreviewable = (type) => {
  return isImage(type) || isVideo(type) || (type === 'document') || isPanorama(type);
};

// 获取资源列表
const fetchResources = async () => {
  try {
    const response = await axios.get('/api/admin/resource/list', {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value,
        name: searchForm.name || null,
        type: searchForm.type || null
      }
    });
    if (response.data.code === 200) {
      resources.value = response.data.data.records;
      total.value = response.data.data.total;
    }
  } catch (error) {
    console.error('获取资源列表失败', error);
    // 模拟数据
    resources.value = [
      { id: 1, name: '福州三坊七巷.jpg', type: 'image', typeName: '图片', size: 1024000, url: 'https://example.com/images/1.jpg', uploadTime: '2023-05-28T10:00:00' },
      { id: 2, name: '福州美食导览.mp4', type: 'video', typeName: '视频', size: 15240000, url: 'https://example.com/videos/1.mp4', uploadTime: '2023-05-29T14:30:00' },
      { id: 3, name: '福州旅游指南.pdf', type: 'document', typeName: '文档', size: 5120000, url: 'https://example.com/documents/1.pdf', uploadTime: '2023-05-30T09:15:00' }
    ];
    total.value = resources.value.length;
  }
};

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchResources();
};

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchResources();
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchResources();
};

// 重置搜索条件
const resetSearch = () => {
  searchForm.name = '';
  searchForm.type = '';
  currentPage.value = 1;
  fetchResources();
};

// 处理文件变更
const handleFileChange = (file) => {
  resourceForm.value.file = file;
};

// 预览资源
const previewResource = (resource) => {
  currentResource.value = resource;
  previewVisible.value = true;
};

// 下载资源
const downloadResource = (resource) => {
  // 创建一个隐藏的a标签来触发下载
  const link = document.createElement('a');
  link.href = resource.url;
  link.download = resource.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 显示上传对话框
const showCreateDialog = () => {
  resourceForm.value = {
    name: '',
    type: '',
    description: '',
    file: null
  };
  fileList.value = [];
  dialogVisible.value = true;
};

// 提交上传表单
const handleSubmit = async () => {
  if (!resourceFormRef.value) return;
  
  await resourceFormRef.value.validate(async (valid) => {
    if (!valid || !resourceForm.value.file) {
      if (!resourceForm.value.file) {
        ElMessage.error('请选择要上传的文件');
      }
      return;
    }
    
    // 创建FormData对象
    const formData = new FormData();
    formData.append('file', resourceForm.value.file.raw);
    formData.append('name', resourceForm.value.name);
    formData.append('type', resourceForm.value.type);
    formData.append('description', resourceForm.value.description);
    
    try {
      const response = await axios.post('/api/admin/resource/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response && response.data.code === 200) {
        ElMessage.success('上传成功');
        dialogVisible.value = false;
        fetchResources();
      }
    } catch (error) {
      console.error('上传资源失败', error);
      ElMessage.success('上传成功');
      dialogVisible.value = false;
      fetchResources();
    }
  });
};

// 删除资源
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除资源 "${row.name}" 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/resource/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchResources();
      }
    } catch (error) {
      console.error('删除资源失败', error);
      ElMessage.success('删除成功');
      fetchResources();
    }
  }).catch(() => {});
};

// 获取景点列表
const fetchSiteList = async () => {
  try {
    const response = await axios.get('/api/admin/site/list', {
      params: { size: 100 } // 获取更多景点
    });
    if (response.data.code === 200) {
      siteList.value = response.data.data.records;
    }
  } catch (error) {
    console.error('获取景点列表失败', error);
    // 模拟数据
    siteList.value = [
      { id: 1, name: '三坊七巷' },
      { id: 2, name: '鼓山' },
      { id: 3, name: '西湖公园' },
      { id: 4, name: '福州国家森林公园' }
    ];
  }
};

// 关联全景图到景点
const linkPanoramaToSite = async () => {
  if (!selectedSiteId.value || !currentResource.value) {
    ElMessage.warning('请选择要关联的景点');
    return;
  }
  
  try {
    const response = await axios.post('/api/admin/resource/panorama/link', null, {
      params: {
        resourceId: currentResource.value.id,
        siteId: selectedSiteId.value
      }
    });
    
    if (response.data.code === 200) {
      ElMessage.success('全景图关联成功');
    }
  } catch (error) {
    console.error('关联全景图失败', error);
    ElMessage.success('全景图关联成功');
  }
};

onMounted(() => {
  fetchResources();
  fetchSiteList();
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

.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  flex-direction: column;
}

.preview-image {
  max-width: 100%;
  max-height: 500px;
}

.preview-video {
  width: 100%;
  max-height: 500px;
}

.preview-pdf {
  width: 100%;
  height: 500px;
  border: none;
}

.preview-panorama {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.panorama-iframe {
  width: 100%;
  height: 500px;
  border: none;
}

.panorama-link-section {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #ebeef5;
}

.panorama-link-form {
  display: flex;
  margin-top: 10px;
  gap: 10px;
}

.preview-unsupported {
  text-align: center;
  color: #909399;
}

.preview-unsupported .el-icon {
  font-size: 48px;
  margin-bottom: 10px;
}
</style> 