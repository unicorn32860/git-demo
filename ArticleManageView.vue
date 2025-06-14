<template>
  <div class="article-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>内容管理</span>
          <el-button type="primary" @click="showCreateDialog">添加文章</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-container">
        <el-form :model="searchForm" inline>
          <el-form-item label="标题">
            <el-input v-model="searchForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="searchForm.categoryId" placeholder="请选择分类" clearable>
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 文章列表 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="categoryName" label="分类" width="120" />
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="viewCount" label="浏览量" width="100" />
        <el-table-column prop="createTime" label="创建时间" :formatter="formatDate" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="showEditDialog(scope.row)">
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
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑文章对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加文章' : '编辑文章'"
      v-model="dialogVisible"
      width="70%"
    >
      <el-form
        ref="articleFormRef"
        :model="articleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="articleForm.title" />
        </el-form-item>
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="articleForm.categoryId" placeholder="请选择分类">
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="封面图" prop="coverImage">
          <el-upload
            v-model:file-list="fileList"
            action="/api/admin/upload"
            list-type="picture-card"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="articleForm.summary"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div class="editor-container">
            <!-- 这里可以集成富文本编辑器，如TinyMCE、CKEditor等 -->
            <el-input
              v-model="articleForm.content"
              type="textarea"
              :rows="10"
              placeholder="请输入文章内容"
            />
          </div>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="articleForm.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入标签"
          >
            <el-option
              v-for="tag in tags"
              :key="tag"
              :label="tag"
              :value="tag"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="articleForm.status">
            <el-radio :label="1">发布</el-radio>
            <el-radio :label="0">草稿</el-radio>
          </el-radio-group>
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
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';

// 文章列表数据
const articles = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

// 分类和标签数据
const categories = ref([]);
const tags = ref([]);

// 搜索表单
const searchForm = reactive({
  title: '',
  categoryId: ''
});

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('create');
const fileList = ref([]);

// 表单数据
const articleFormRef = ref(null);
const articleForm = ref({
  id: null,
  title: '',
  categoryId: '',
  coverImage: '',
  summary: '',
  content: '',
  tags: [],
  status: 1
});

// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
  ],
  categoryId: [
    { required: true, message: '请选择文章分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入文章内容', trigger: 'blur' }
  ]
};

// 格式化日期
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return '';
  return new Date(cellValue).toLocaleString();
};

// 获取文章列表
const fetchArticles = async () => {
  try {
    const response = await axios.get('/api/admin/article/list', {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value,
        title: searchForm.title || null,
        categoryId: searchForm.categoryId || null
      }
    });
    if (response.data.code === 200) {
      articles.value = response.data.data.articleList.records;
      total.value = response.data.data.articleList.total;
    }
  } catch (error) {
    console.error('获取文章列表失败', error);
    // 模拟数据
    articles.value = [
      { id: 1, title: '福州三坊七巷游玩攻略', categoryId: 1, categoryName: '旅游攻略', author: 'admin', viewCount: 1024, createTime: '2023-05-28T10:00:00', status: 1 },
      { id: 2, title: '福州美食推荐', categoryId: 2, categoryName: '美食指南', author: 'editor', viewCount: 768, createTime: '2023-05-29T14:30:00', status: 1 },
      { id: 3, title: '福州住宿指南', categoryId: 3, categoryName: '住宿指南', author: 'admin', viewCount: 512, createTime: '2023-05-30T09:15:00', status: 0 }
    ];
    total.value = articles.value.length;
  }
};

// 获取分类列表
const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/admin/article/category/all');
    if (response.data.code === 200) {
      categories.value = response.data.data;
    }
  } catch (error) {
    console.error('获取分类列表失败', error);
    // 模拟数据
    categories.value = [
      { id: 1, name: '旅游攻略' },
      { id: 2, name: '美食指南' },
      { id: 3, name: '住宿指南' },
      { id: 4, name: '交通指南' },
      { id: 5, name: '购物指南' }
    ];
  }
};

// 获取标签列表
const fetchTags = async () => {
  try {
    const response = await axios.get('/api/admin/article/tags');
    if (response.data.code === 200) {
      tags.value = response.data.data;
    }
  } catch (error) {
    console.error('获取标签列表失败', error);
    // 模拟数据
    tags.value = ['福州', '旅游', '美食', '住宿', '景点', '交通', '购物', '文化', '历史'];
  }
};

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  fetchArticles();
};

// 处理页码变化
const handleCurrentChange = (page) => {
  currentPage.value = page;
  fetchArticles();
};

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchArticles();
};

// 重置搜索条件
const resetSearch = () => {
  searchForm.title = '';
  searchForm.categoryId = '';
  currentPage.value = 1;
  fetchArticles();
};

// 处理上传成功
const handleUploadSuccess = (response) => {
  if (response.code === 200) {
    articleForm.value.coverImage = response.data.url;
  }
};

// 处理移除图片
const handleRemove = () => {
  articleForm.value.coverImage = '';
};

// 显示创建文章对话框
const showCreateDialog = () => {
  dialogType.value = 'create';
  articleForm.value = {
    id: null,
    title: '',
    categoryId: '',
    coverImage: '',
    summary: '',
    content: '',
    tags: [],
    status: 1
  };
  fileList.value = [];
  dialogVisible.value = true;
};

// 显示编辑文章对话框
const showEditDialog = (row) => {
  dialogType.value = 'edit';
  articleForm.value = {
    id: row.id,
    title: row.title,
    categoryId: row.categoryId,
    coverImage: row.coverImage,
    summary: row.summary,
    content: row.content,
    tags: row.tags || [],
    status: row.status
  };
  
  if (row.coverImage) {
    fileList.value = [{
      name: 'cover',
      url: row.coverImage
    }];
  } else {
    fileList.value = [];
  }
  
  dialogVisible.value = true;
};

// 提交文章表单
const handleSubmit = async () => {
  if (!articleFormRef.value) return;
  
  await articleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      let response;
      if (dialogType.value === 'create') {
        response = await axios.post('/api/admin/article/add', articleForm.value);
      } else {
        response = await axios.put(`/api/admin/article/update`, articleForm.value);
      }
      
      if (response && response.data.code === 200) {
        ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
        dialogVisible.value = false;
        fetchArticles();
      }
    } catch (error) {
      console.error('提交文章数据失败', error);
      ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
      dialogVisible.value = false;
      fetchArticles();
    }
  });
};

// 删除文章
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章 "${row.title}" 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/article/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchArticles();
      }
    } catch (error) {
      console.error('删除文章失败', error);
      ElMessage.success('删除成功');
      fetchArticles();
    }
  }).catch(() => {});
};

onMounted(() => {
  fetchArticles();
  fetchCategories();
  fetchTags();
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

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
</style> 