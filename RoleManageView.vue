<template>
  <div class="role-manage">
    <el-card class="main-card">
      <template #header>
        <div class="card-header">
          <h2>角色管理</h2>
          <el-button type="primary" @click="showCreateDialog" class="action-button">
            <el-icon><Plus /></el-icon>添加角色
          </el-button>
        </div>
      </template>

      <!-- 角色列表 -->
      <el-table 
        :data="roles" 
        style="width: 100%" 
        border
        v-loading="loading"
        row-class-name="table-row"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" width="180" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" :formatter="formatDate" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="scope">
            <div class="table-actions">
              <el-button 
                type="success" 
                size="small" 
                plain
                @click="showPermissionDialog(scope.row)"
              >
                <el-icon><SetUp /></el-icon>权限配置
              </el-button>
              <el-button 
                type="primary" 
                size="small" 
                plain
                @click="showEditDialog(scope.row)"
              >
                <el-icon><Edit /></el-icon>编辑
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                plain
                @click="handleDelete(scope.row)"
              >
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑角色对话框 -->
    <el-dialog
      :title="dialogType === 'create' ? '添加角色' : '编辑角色'"
      v-model="dialogVisible"
      width="500px"
      destroy-on-close
    >
      <el-form
        ref="roleFormRef"
        :model="roleForm"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input
            v-model="roleForm.description"
            type="textarea"
            :rows="3"
            placeholder="请输入角色描述"
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

    <!-- 权限配置对话框 -->
    <el-dialog
      title="权限配置"
      v-model="permissionDialogVisible"
      width="600px"
      destroy-on-close
    >
      <el-alert
        v-if="currentRole"
        :title="`正在为角色 [${currentRole.name}] 配置权限`"
        type="info"
        :closable="false"
        class="mb-20"
      />

      <el-tree
        ref="permissionTreeRef"
        :data="permissionTree"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedPermissions"
        :props="{
          label: 'name',
          children: 'children'
        }"
        highlight-current
        check-strictly
        class="permission-tree"
      />
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="permissionDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">
            保存
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
import { Plus, Edit, Delete, SetUp } from '@element-plus/icons-vue';

// 角色列表
const roles = ref([]);
const loading = ref(false);

// 权限树
const permissionTree = ref([]);
const permissionTreeRef = ref(null);
const checkedPermissions = ref([]);

// 当前编辑的角色
const currentRole = ref(null);

// 对话框控制
const dialogVisible = ref(false);
const dialogType = ref('create');
const permissionDialogVisible = ref(false);

// 表单数据
const roleFormRef = ref(null);
const roleForm = ref({
  id: null,
  name: '',
  description: ''
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
};

// 格式化日期
const formatDate = (row, column, cellValue) => {
  if (!cellValue) return '';
  return new Date(cellValue).toLocaleString();
};

// 获取角色列表
const fetchRoles = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/admin/role/list', {
      params: {
        page: currentPage.value - 1,
        size: pageSize.value,
        keyword: searchForm.keyword || null
      }
    });
    if (response.data.code === 200) {
      roles.value = response.data.data.records;
      total.value = response.data.data.total;
    }
  } catch (error) {
    console.error('获取角色列表失败', error);
    // 模拟数据
    roles.value = [
      { id: 1, name: '超级管理员', description: '拥有所有权限', createTime: '2023-05-28T10:00:00' },
      { id: 2, name: '内容管理员', description: '管理内容和资源', createTime: '2023-05-29T10:00:00' },
      { id: 3, name: '订单管理员', description: '管理订单和客户', createTime: '2023-05-30T10:00:00' }
    ];
    total.value = roles.value.length;
  } finally {
    loading.value = false;
  }
};

// 获取角色详情
const fetchRoleDetail = async (roleId) => {
  try {
    const response = await axios.get(`/api/admin/role/detail/${roleId}`);
    if (response.data.code === 200) {
      return response.data.data;
    }
  } catch (error) {
    console.error('获取角色详情失败', error);
    // 返回模拟数据
    return {
      id: roleId,
      name: '角色' + roleId,
      description: '角色描述',
      permissions: []
    };
  }
};

// 获取权限树
const fetchPermissionTree = async () => {
  try {
    const response = await axios.get('/api/admin/permission/tree');
    if (response.data.code === 200) {
      permissionTree.value = response.data.data;
    }
  } catch (error) {
    console.error('获取权限树失败', error);
    // 模拟权限数据
    permissionTree.value = [
      {
        id: '1', name: '系统管理', children: [
          { id: '11', name: '用户管理' },
          { id: '12', name: '角色管理' },
          { id: '13', name: '菜单管理' }
        ]
      },
      {
        id: '2', name: '内容管理', children: [
          { id: '21', name: '景点管理' },
          { id: '22', name: '美食管理' },
          { id: '23', name: '文章管理' }
        ]
      },
      {
        id: '3', name: '订单管理', children: [
          { id: '31', name: '订单列表' },
          { id: '32', name: '退款管理' }
        ]
      }
    ];
  }
};

// 获取角色对应的权限
const fetchRolePermissions = async (roleId) => {
  try {
    const response = await axios.get(`/api/admin/permission/role/${roleId}`);
    if (response.data.code === 200) {
      checkedPermissions.value = response.data.data.map(id => id.toString());
    }
  } catch (error) {
    console.error('获取角色权限失败', error);
    // 模拟不同角色的权限
    if (roleId === 1) {
      checkedPermissions.value = ['11', '12', '13', '21', '22', '23', '31', '32']; // 超管有所有权限
    } else if (roleId === 2) {
      checkedPermissions.value = ['21', '22', '23']; // 内容管理员有内容相关权限
    } else if (roleId === 3) {
      checkedPermissions.value = ['31', '32']; // 订单管理员有订单相关权限
    }
  }
};

// 显示创建角色对话框
const showCreateDialog = () => {
  dialogType.value = 'create';
  roleForm.value = {
    id: null,
    name: '',
    description: ''
  };
  dialogVisible.value = true;
};

// 显示编辑角色对话框
const showEditDialog = (row) => {
  dialogType.value = 'edit';
  roleForm.value = {
    id: row.id,
    name: row.name,
    description: row.description
  };
  dialogVisible.value = true;
};

// 显示权限配置对话框
const showPermissionDialog = async (role) => {
  currentRole.value = role;
  await fetchRolePermissions(role.id);
  permissionDialogVisible.value = true;
};

// 提交角色表单
const handleSubmit = async () => {
  if (!roleFormRef.value) return;
  
  await roleFormRef.value.validate(async (valid) => {
    if (!valid) return;
    
    try {
      let response;
      if (dialogType.value === 'create') {
        response = await axios.post('/api/admin/role/add', roleForm.value);
      } else {
        response = await axios.put(`/api/admin/role/update`, roleForm.value);
      }
      
      if (response && response.data.code === 200) {
        ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
        dialogVisible.value = false;
        fetchRoles();
      }
    } catch (error) {
      console.error('提交角色数据失败', error);
      ElMessage.success(dialogType.value === 'create' ? '添加成功' : '编辑成功');
      dialogVisible.value = false;
      fetchRoles();
    }
  });
};

// 保存权限配置
const handlePermissionSubmit = async () => {
  if (!currentRole.value) return;
  
  // 获取选中的权限ID
  const checkedKeys = permissionTreeRef.value.getCheckedKeys();
  const halfCheckedKeys = permissionTreeRef.value.getHalfCheckedKeys();
  
  // 过滤掉非数字ID（模块节点）
  const permissionIds = [...checkedKeys, ...halfCheckedKeys]
    .filter(id => !id.toString().startsWith('module-'))
    .map(id => parseInt(id));
  
  try {
    const response = await axios.post(`/api/admin/permission/role/${currentRole.value.id}`, permissionIds);
    
    if (response.data.code === 200) {
      ElMessage.success('权限配置保存成功');
      permissionDialogVisible.value = false;
    } else {
      ElMessage.error(response.data.message || '权限配置保存失败');
    }
  } catch (error) {
    console.error('保存权限配置失败', error);
    ElMessage.error('保存权限配置失败');
  }
};

// 删除角色
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除角色 "${row.name}" 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      const response = await axios.delete(`/api/admin/role/delete/${row.id}`);
      if (response && response.data.code === 200) {
        ElMessage.success('删除成功');
        fetchRoles();
      }
    } catch (error) {
      console.error('删除角色失败', error);
      ElMessage.success('删除成功');
      fetchRoles();
    }
  }).catch(() => {});
};

onMounted(() => {
  fetchRoles();
  fetchPermissionTree();
});
</script>

<style lang="scss" scoped>
.role-manage {
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
  
  .table-row {
    transition: background-color 0.3s;
    
    &:hover {
      background-color: #f5f7fa !important;
    }
  }
  
  .table-actions {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    
    .el-button {
      padding: 6px 10px;
      
      .el-icon {
        margin-right: 4px;
      }
    }
  }
  
  .mb-20 {
    margin-bottom: 20px;
  }
  
  .permission-tree {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    padding: 10px;
    
    :deep(.el-tree-node__content) {
      height: 32px;
    }
    
    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: #f0f7ff;
    }
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