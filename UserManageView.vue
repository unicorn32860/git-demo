<template>
  <div class="user-manage">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <h2>用户管理</h2>
          <el-button type="primary" @click="showAddDialog" class="action-button">
            <el-icon><Plus /></el-icon>添加用户
          </el-button>
        </div>
      </template>

      <!-- 搜索栏 -->
      <div class="search-bar">
        <el-form :inline="true" :model="searchForm" class="search-form">
          <el-form-item label="关键词">
            <el-input v-model="searchForm.keyword" placeholder="用户名/邮箱" clearable />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="searchForm.roleId" placeholder="所有角色" clearable>
              <el-option
                v-for="role in roleOptions"
                :key="role.value"
                :label="role.label"
                :value="role.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">
              <el-icon><Search /></el-icon>搜索
            </el-button>
            <el-button @click="resetSearch">
              <el-icon><RefreshRight /></el-icon>重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 用户列表 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        row-class-name="table-row"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" min-width="120" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column label="头像" width="80" align="center">
          <template #default="scope">
            <el-avatar
              :size="40"
              :src="scope.row.avatar || '/assets/images/default-avatar.png'"
            />
          </template>
        </el-table-column>
        <el-table-column label="角色" width="120">
          <template #default="scope">
            <el-tag
              :type="scope.row.role?.name === '超级管理员' ? 'danger' : 'primary'"
              effect="plain"
            >
              {{ scope.row.role?.name || '无角色' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90" align="center">
          <template #default="scope">
            <div class="status-switch">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange(scope.row)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="scope">
            <div class="action-buttons">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
              >
                <el-icon><Edit /></el-icon>编辑
              </el-button>
              <el-button
                type="warning"
                size="small"
                @click="handleResetPwd(scope.row)"
              >
                <el-icon><Key /></el-icon>重置密码
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
              >
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
        />
      </div>
    </el-card>
    
    <!-- 用户表单对话框 -->
    <el-dialog
      :title="dialogType === 'add' ? '添加用户' : '编辑用户'"
      v-model="dialogVisible"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="userFormRef"
        :model="userForm"
        :rules="userRules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item 
          label="密码" 
          prop="password"
          v-if="dialogType === 'add'"
        >
          <el-input 
            v-model="userForm.password" 
            type="password"
            show-password 
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="userForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="role in roleOptions"
              :key="role.value"
              :label="role.label"
              :value="role.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userForm.status"
            :active-value="1"
            :inactive-value="0"
            inline-prompt
            active-text="启用"
            inactive-text="禁用"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 重置密码对话框 -->
    <el-dialog
      title="重置密码"
      v-model="pwdDialogVisible"
      width="400px"
      destroy-on-close
    >
      <el-form
        ref="pwdFormRef"
        :model="pwdForm"
        :rules="pwdRules"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="pwdForm.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="pwdForm.confirmPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pwdDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitPasswordReset">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Search, RefreshRight, Edit, Key, Delete } from '@element-plus/icons-vue';
import { useAdminStore } from '@/stores/admin';

const adminStore = useAdminStore();

// 表格数据
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 搜索表单
const searchForm = ref({
  keyword: '',
  roleId: ''
});

// 角色选项
const roleOptions = ref([
  { value: 1, label: '超级管理员' },
  { value: 2, label: '普通管理员' },
  { value: 3, label: '用户管理员' },
  { value: 4, label: '内容管理员' }
]);

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('add');
const userFormRef = ref(null);
const userForm = ref({
  id: null,
  username: '',
  password: '',
  email: '',
  roleId: '',
  status: 1
});

// 表单验证规则
const userRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  roleId: [
    { required: true, message: '请选择角色', trigger: 'change' }
  ]
};

// 重置密码对话框
const pwdDialogVisible = ref(false);
const pwdFormRef = ref(null);
const currentUserId = ref(null);
const pwdForm = ref({
  newPassword: '',
  confirmPassword: ''
});

// 重置密码表单验证
const validateConfirmPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== pwdForm.value.newPassword) {
    callback(new Error('两次输入密码不一致'));
  } else {
    callback();
  }
};

const pwdRules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPwd, trigger: 'blur' }
  ]
};

// 初始化
onMounted(() => {
  fetchUserList();
  fetchRoleOptions();
});

// 获取用户列表
const fetchUserList = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      size: pageSize.value,
      keyword: searchForm.value.keyword,
      roleId: searchForm.value.roleId || undefined
    };
    
    const response = await adminStore.fetchUserList(params);
    
    // 处理响应数据
    if (response) {
      // 检查是否有records属性 (来自模拟数据或API)
      if (Array.isArray(response.records)) {
        tableData.value = response.records;
        total.value = response.total || 0;
      } 
      // 检查userList结构 (之前代码预期的结构)
      else if (response.userList && Array.isArray(response.userList.records)) {
        tableData.value = response.userList.records;
        total.value = response.userList.total || 0;
      }
      // 检查是否直接是数组
      else if (Array.isArray(response)) {
        tableData.value = response;
        total.value = response.length;
      }
      // 检查list属性 (标准分页响应)
      else if (Array.isArray(response.list)) {
        tableData.value = response.list;
        total.value = response.pagination?.total || response.total || tableData.value.length;
      }
      // 兜底情况
      else {
        tableData.value = [];
        total.value = 0;
        console.warn('响应数据结构不符合预期:', response);
      }
    } else {
      tableData.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.error('获取用户列表失败:', error);
    ElMessage.error('获取用户列表失败');
    tableData.value = [];
    total.value = 0;
  } finally {
    loading.value = false;
  }
};

// 获取角色选项
const fetchRoleOptions = async () => {
  try {
    const roles = await adminStore.fetchAllRoles();
    if (roles && Array.isArray(roles) && roles.length > 0) {
      roleOptions.value = roles.map(role => ({
        value: role.id,
        label: role.name
      }));
    } else {
      console.warn('获取到的角色数据不是有效数组:', roles);
      roleOptions.value = [
        { value: 1, label: '超级管理员' },
        { value: 2, label: '普通管理员' },
        { value: 3, label: '用户管理员' },
        { value: 4, label: '内容管理员' }
      ];
    }
  } catch (error) {
    console.error('获取角色列表失败:', error);
  }
};

// 搜索
const handleSearch = () => {
  currentPage.value = 1;
  fetchUserList();
};

// 重置搜索
const resetSearch = () => {
  searchForm.value = {
    keyword: '',
    roleId: ''
  };
  currentPage.value = 1;
  fetchUserList();
};

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val;
  fetchUserList();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  fetchUserList();
};

// 添加用户对话框
const showAddDialog = () => {
  dialogType.value = 'add';
  userForm.value = {
    id: null,
    username: '',
    password: '',
    email: '',
    roleId: '',
    status: 1
  };
  dialogVisible.value = true;
};

// 编辑用户
const handleEdit = (row) => {
  dialogType.value = 'edit';
  userForm.value = {
    id: row.id,
    username: row.username,
    email: row.email,
    roleId: row.role?.id || '',
    status: row.status
  };
  dialogVisible.value = true;
};

// 提交表单
const submitForm = async () => {
  if (!userFormRef.value) return;
  
  await userFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      let result;
      
      if (dialogType.value === 'add') {
        result = await adminStore.addUser(userForm.value);
        if (result) {
          ElMessage.success('添加用户成功');
        }
      } else {
        result = await adminStore.updateUser(userForm.value);
        if (result) {
          ElMessage.success('更新用户成功');
        }
      }
      
      if (result) {
        dialogVisible.value = false;
        fetchUserList();
      }
    } catch (error) {
      console.error('提交用户表单失败:', error);
      ElMessage.error('操作失败');
    }
  });
};

// 重置密码
const handleResetPwd = (row) => {
  currentUserId.value = row.id;
  pwdForm.value = {
    newPassword: '',
    confirmPassword: ''
  };
  pwdDialogVisible.value = true;
};

// 提交密码重置
const submitPasswordReset = async () => {
  if (!pwdFormRef.value) return;
  
  await pwdFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      const result = await adminStore.resetUserPassword(
        currentUserId.value,
        pwdForm.value.newPassword
      );
      
      if (result) {
        ElMessage.success('密码重置成功');
        pwdDialogVisible.value = false;
      }
    } catch (error) {
      console.error('重置密码失败:', error);
      ElMessage.error('密码重置失败');
    }
  });
};

// 删除用户
const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确认删除用户 ${row.username} 吗?`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    try {
      const result = await adminStore.deleteUser(row.id);
      if (result) {
        ElMessage.success('删除用户成功');
        fetchUserList();
      }
    } catch (error) {
      console.error('删除用户失败:', error);
      ElMessage.error('删除用户失败');
    }
  }).catch(() => {});
};

// 状态变更
const handleStatusChange = async (row) => {
  try {
    await adminStore.updateUserStatus(row.id, row.status);
    ElMessage.success(`已${row.status === 1 ? '启用' : '禁用'}用户`);
  } catch (error) {
    console.error('更新用户状态失败:', error);
    // 状态变更失败，恢复原状态
    row.status = row.status === 1 ? 0 : 1;
  }
};
</script>

<style lang="scss" scoped>
.user-manage {
  padding: 0;
  
  .main-card {
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        color: #303133;
      }
      
      .action-button {
        font-weight: 500;
      }
    }
  }

  .search-bar {
    margin-bottom: 20px;
    padding: 18px;
    border-radius: 8px;
    background-color: #f9fafc;
    
    .el-form-item {
      margin-bottom: 0;
    }
  }
  
  .table-row {
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #f5f7fa !important;
    }
  }
  
  .status-switch {
    display: flex;
    justify-content: center;
    
    :deep(.el-switch) {
      height: 24px;
      
      .el-switch__core {
        min-width: 50px !important;
      }
    }
  }
  
  .action-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    
    .el-button {
      margin: 0;
      flex: 1 1 auto;
      
      .el-icon {
        margin-right: 4px;
      }
    }
  }

  .pagination {
    margin-top: 24px;
    text-align: right;
  }
  
  :deep(.el-tag) {
    border-radius: 4px;
    font-weight: 500;
  }
  
  :deep(.el-avatar) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ebeef5;
    background-color: #f5f7fa;
  }
  
  :deep(.el-dialog) {
    border-radius: 8px;
    overflow: hidden;
    
    .el-dialog__header {
      padding: 20px;
      background-color: #f5f7fa;
      margin: 0;
    }
    
    .el-dialog__body {
      padding: 24px;
    }
    
    .el-dialog__footer {
      padding: 16px 20px;
      border-top: 1px solid #ebeef5;
    }
  }
}
</style> 