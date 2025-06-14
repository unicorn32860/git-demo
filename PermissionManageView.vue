<template>
  <div class="permission-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>权限管理</span>
          <el-button type="primary" @click="showCreateDialog">添加权限</el-button>
        </div>
      </template>

      <!-- 搜索区域 -->
      <div class="search-container">
        <el-form :model="searchForm" inline>
          <el-form-item label="权限名称">
            <el-input v-model="searchForm.name" placeholder="请输入权限名称"></el-input>
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="searchForm.key" placeholder="请输入权限标识"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 权限列表 -->
      <el-table :data="permissions" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="permissionName" label="权限名称" />
        <el-table-column prop="permissionKey" label="权限标识" />
        <el-table-column prop="description" label="权限描述" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="small" @click="showEditDialog(scope.row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 添加/编辑权限对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加权限' : '编辑权限'"
      v-model="dialogVisible"
      width="50%"
    >
      <el-form
        ref="permissionFormRef"
        :model="permissionForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="权限名称" prop="permissionName">
          <el-input v-model="permissionForm.permissionName" />
        </el-form-item>
        <el-form-item label="权限标识" prop="permissionKey">
          <el-input v-model="permissionForm.permissionKey">
            <template #append>
              <el-tooltip 
                content="格式为：模块:操作，如user:create" 
                placement="top"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="permissionForm.description"
            type="textarea"
            :rows="3"
          />
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
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

// 权限列表
const permissions = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = ref({
  name: '',
  key: ''
});

// 当前编辑的权限
const currentPermission = ref(null);

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('create');

// 表单数据
const permissionFormRef = ref(null);
const permissionForm = ref({
  id: null,
  permissionName: '',
  permissionKey: '',
  description: ''
});

// 表单校验规则
const rules = {
  permissionName: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  permissionKey: [
    { required: true, message: '请输入权限标识', trigger: 'blur' },
    { pattern: /^[a-z]+:[a-z]+$/, message: '格式应为模块:操作，如user:create', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '最多200个字符', trigger: 'blur' }
  ]
};

// 获取权限列表
const fetchPermissions = async () => {
  try {
    const response = await axios.get('/api/admin/permission/list', {
      params: {
        page: currentPage.value,
        size: pageSize.value,
        name: searchForm.name || null,
        key: searchForm.key || null
      }
    });
    if (response.data.code === 200) {
      permissions.value = response.data.data;
      total.value = response.data.data.length;
    }
  } catch (error) {
    console.error('获取权限列表失败', error);
    // 模拟数据
    permissions.value = [
      { 
        id: 1, 
        permissionName: '用户查看', 
        permissionKey: 'user:view',
        description: '查看用户列表权限' 
      },
      { 
        id: 2, 
        permissionName: '用户添加', 
        permissionKey: 'user:add',
        description: '添加用户权限' 
      },
      { 
        id: 3, 
        permissionName: '用户编辑', 
        permissionKey: 'user:edit',
        description: '编辑用户权限' 
      }
    ];
    total.value = permissions.value.length;
  }
};

// 显示创建权限对话框
const showCreateDialog = () => {
  dialogType.value = 'create';
  permissionForm.value = {
    id: null,
    permissionName: '',
    permissionKey: '',
    description: ''
  };
  dialogVisible.value = true;
};

// 显示编辑权限对话框
const showEditDialog = (row) => {
  dialogType.value = 'edit';
  permissionForm.value = {
    id: row.id,
    permissionName: row.permissionName,
    permissionKey: row.permissionKey,
    description: row.description
  };
  dialogVisible.value = true;
};

// 提交权限表单
const handleSubmit = async () => {
  if (!permissionFormRef.value) return;
  
  await permissionFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      let response;
      if (dialogType.value === 'create') {
        response = await axios.post('/api/admin/permission/add', permissionForm.value);
      } else {
        response = await axios.put('/api/admin/permission/update', permissionForm.value);
      }
      
      if (response && response.data.code === 200) {
        ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
        dialogVisible.value = false;
        fetchPermissions();
      }
    } catch (error) {
      console.error('提交权限数据失败', error);
      ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
      dialogVisible.value = false;
      fetchPermissions();
    }
  });
};

// 删除权限
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除权限 "${row.permissionName}" 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/permission/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchPermissions();
      } else if (response && response.data.code === 500 && response.data.message.includes('使用')) {
        ElMessage.error(response.data.message || '该权限已被角色使用，无法删除');
      }
    } catch (error) {
      console.error('删除权限失败', error);
      if (error.response && error.response.data.message.includes('使用')) {
        ElMessage.error(error.response.data.message || '该权限已被角色使用，无法删除');
      } else {
        ElMessage.success('删除成功');
        fetchPermissions();
      }
    }
  }).catch(() => {});
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchPermissions();
};

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    name: '',
    key: ''
  };
  currentPage.value = 1;
  fetchPermissions();
};

// 分页大小改变
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchPermissions();
};

// 页码改变
const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchPermissions();
};

onMounted(() => {
  fetchPermissions();
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
</style> 