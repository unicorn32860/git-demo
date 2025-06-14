<template>
  <div class="attraction-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>景点管理</span>
          <el-button type="primary" @click="showCreateDialog">添加景点</el-button>
        </div>
      </template>

      <!-- 景点列表 -->
      <el-table :data="attractions" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="areaName" label="所属区域" />
        <el-table-column prop="averageRating" label="评分" width="120">
          <template #default="scope">
            <el-rate
              v-model="scope.row.averageRating"
              disabled
              show-score
              text-color="#ff9900"
            />
          </template>
        </el-table-column>
        <el-table-column prop="visitCount" label="访问次数" width="100" />
        <el-table-column prop="isFeatured" label="是否推荐" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.isFeatured ? 'success' : 'info'">
              {{ scope.row.isFeatured ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button
              size="small"
              @click="showEditDialog(scope.row)"
            >
              编辑
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
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑景点对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加景点' : '编辑景点'"
      v-model="dialogVisible"
      width="70%"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" />
        </el-form-item>
        <el-form-item label="开放时间" prop="openingHours">
          <el-input v-model="form.openingHours" />
        </el-form-item>
        <el-form-item label="门票价格" prop="ticketPrice">
          <el-input-number
            v-model="form.ticketPrice"
            :min="0"
            :precision="2"
            :step="10"
          />
        </el-form-item>
        <el-form-item label="经纬度" required>
          <el-col :span="11">
            <el-form-item prop="longitude">
              <el-input-number
                v-model="form.longitude"
                :precision="6"
                :step="0.000001"
                placeholder="经度"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="latitude">
              <el-input-number
                v-model="form.latitude"
                :precision="6"
                :step="0.000001"
                placeholder="纬度"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaName">
          <el-select v-model="form.areaName">
            <el-option
              v-for="area in areas"
              :key="area"
              :label="area"
              :value="area"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="form.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择标签"
          >
            <el-option
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="images">
          <el-upload
            v-model:file-list="fileList"
            action="/api/v1/upload"
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="虚拟导览URL" prop="virtualTourUrl">
          <el-input v-model="form.virtualTourUrl" />
        </el-form-item>
        <el-form-item label="语音导览URL" prop="audioGuideUrl">
          <el-input v-model="form.audioGuideUrl" />
        </el-form-item>
        <el-form-item label="是否推荐" prop="isFeatured">
          <el-switch v-model="form.isFeatured" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'

const attractions = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const areas = ref([])
const tags = ref([])
const dialogVisible = ref(false)
const dialogType = ref('create')
const fileList = ref([])

const form = ref({
  name: '',
  description: '',
  address: '',
  openingHours: '',
  ticketPrice: 0,
  longitude: null,
  latitude: null,
  areaName: '',
  tags: [],
  images: [],
  virtualTourUrl: '',
  audioGuideUrl: '',
  isFeatured: false
})

const rules = {
  name: [{ required: true, message: '请输入景点名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入景点描述', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  longitude: [{ required: true, message: '请输入经度', trigger: 'blur' }],
  latitude: [{ required: true, message: '请输入纬度', trigger: 'blur' }],
  areaName: [{ required: true, message: '请选择所属区域', trigger: 'change' }]
}

const formRef = ref()

// 获取景点列表
const fetchAttractions = async () => {
  try {
    const response = await axios.get('/api/v1/attractions/search', {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value
      }
    })
    attractions.value = response.data.data.content
    total.value = response.data.data.totalElements
  } catch (error) {
    ElMessage.error('获取景点列表失败')
  }
}

// 获取所有区域
const fetchAreas = async () => {
  try {
    const response = await axios.get('/api/v1/attractions/areas')
    areas.value = response.data.data
  } catch (error) {
    ElMessage.error('获取区域列表失败')
  }
}

// 获取所有标签
const fetchTags = async () => {
  try {
    const response = await axios.get('/api/v1/attractions/tags')
    tags.value = response.data.data
  } catch (error) {
    ElMessage.error('获取标签列表失败')
  }
}

// 显示创建对话框
const showCreateDialog = () => {
  dialogType.value = 'create'
  form.value = {
    name: '',
    description: '',
    address: '',
    openingHours: '',
    ticketPrice: 0,
    longitude: null,
    latitude: null,
    areaName: '',
    tags: [],
    images: [],
    virtualTourUrl: '',
    audioGuideUrl: '',
    isFeatured: false
  }
  fileList.value = []
  dialogVisible.value = true
}

// 显示编辑对话框
const showEditDialog = (row) => {
  dialogType.value = 'edit'
  form.value = { ...row }
  fileList.value = row.images.map(url => ({
    url,
    name: url.substring(url.lastIndexOf('/') + 1)
  }))
  dialogVisible.value = true
}

// 处理文件上传成功
const handleUploadSuccess = (response, file) => {
  form.value.images.push(response.data)
}

// 处理文件移除
const handleRemove = (file) => {
  const index = form.value.images.indexOf(file.url)
  if (index !== -1) {
    form.value.images.splice(index, 1)
  }
}

// 处理表单提交
const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        if (dialogType.value === 'create') {
          await axios.post('/api/v1/attractions', form.value)
          ElMessage.success('添加景点成功')
        } else {
          await axios.put(`/api/v1/attractions/${form.value.id}`, form.value)
          ElMessage.success('更新景点成功')
        }
        dialogVisible.value = false
        fetchAttractions()
      } catch (error) {
        ElMessage.error(dialogType.value === 'create' ? '添加景点失败' : '更新景点失败')
      }
    }
  })
}

// 处理删除
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该景点吗？', '提示', {
      type: 'warning'
    })
    await axios.delete(`/api/v1/attractions/${row.id}`)
    ElMessage.success('删除成功')
    fetchAttractions()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 处理分页
const handleSizeChange = (val) => {
  pageSize.value = val
  fetchAttractions()
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchAttractions()
}

onMounted(() => {
  fetchAttractions()
  fetchAreas()
  fetchTags()
})
</script>

<style scoped>
.attraction-manage {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

.text-center {
  text-align: center;
}
</style> 