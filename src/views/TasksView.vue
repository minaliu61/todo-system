<script setup>
import { ref, reactive } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoryStore } from '../stores/categoryStore'

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()

const dialogVisible = ref(false)
const editingTaskId = ref(null)
const formRef = ref(null)

// 使用reactive管理表单数据
const taskForm = reactive({
  title: '',
  description: '',
  deadline: '',
  categoryId: '',
  priority: 'medium'
})

const rules = {
  title: [{ required: true, message: '请输入作业标题', trigger: 'blur' }],
  deadline: [{ required: true, message: '请选择截止日期', trigger: 'change' }]
}

// 打开添加对话框
const openAddDialog = () => {
  console.log('打开添加对话框')
  // 重置表单数据
  taskForm.title = ''
  taskForm.description = ''
  taskForm.deadline = ''
  taskForm.categoryId = ''
  taskForm.priority = 'medium'
  editingTaskId.value = null
  dialogVisible.value = true
}

// 添加或更新作业
const submitForm = () => {
  console.log('提交表单', taskForm)
  if (!formRef.value) {
    console.error('表单引用获取失败')
    return
  }

  formRef.value.validate((valid) => {
    console.log('表单验证结果', valid)
    if (valid) {
      if (editingTaskId.value) {
        // 更新作业
        taskStore.updateTask({
          id: editingTaskId.value,
          ...taskForm
        })
      } else {
        // 添加作业
        taskStore.addTask({
          id: Date.now(),
          ...taskForm,
          completed: false,
          createTime: new Date().toISOString()
        })
      }

      dialogVisible.value = false
    } else {
      return false
    }
  })
}

// 编辑作业
const editTask = (task) => {
  editingTaskId.value = task.id
  taskForm.title = task.title
  taskForm.description = task.description
  taskForm.deadline = task.deadline
  taskForm.categoryId = task.categoryId
  taskForm.priority = task.priority
  dialogVisible.value = true
}

// 删除作业
const deleteTask = (id) => {
  taskStore.deleteTask(id)
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString()
}

// 优先级标签
const priorityLabel = (priority) => {
  switch (priority) {
    case 'high': return { type: 'danger', label: '高' }
    case 'medium': return { type: 'warning', label: '中' }
    case 'low': return { type: 'info', label: '低' }
    default: return { type: 'info', label: '未知' }
  }
}

// 关闭对话框时重置表单
const handleDialogClose = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
}
</script>

<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
          <h3>作业管理</h3>
          <el-button type="primary" @click="openAddDialog">添加作业</el-button>
        </div>
      </template>

      <el-table v-if="taskStore.tasks.length > 0" :data="taskStore.tasks" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="分类">
          <template #default="scope">
            {{ categoryStore.getCategoryName(scope.row.categoryId) }}
          </template>
        </el-table-column>
        <el-table-column label="截止日期">
          <template #default="scope">
            {{ formatDate(scope.row.deadline) }}
          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template #default="scope">
            <el-tag :type="priorityLabel(scope.row.priority).type" size="small">
              {{ priorityLabel(scope.row.priority).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.completed ? 'success' : 'info'" size="small">
              {{ scope.row.completed ? '已完成' : '未完成' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="editTask(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteTask(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-else description="暂无作业" />
    </el-card>

    <!-- 添加/编辑作业对话框 -->
    <el-dialog v-model="dialogVisible" :title="editingTaskId ? '编辑作业' : '添加作业'" width="500px"
      @closed="handleDialogClose" destroy-on-close>
      <el-form ref="formRef" :model="taskForm" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="taskForm.title" placeholder="请输入作业标题" />
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="taskForm.description" type="textarea" placeholder="请输入作业描述" />
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="taskForm.categoryId" placeholder="请选择分类" style="width: 100%">
            <el-option v-for="category in categoryStore.categories" :key="category.id" :label="category.name"
              :value="category.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="截止日期" prop="deadline">
          <el-date-picker v-model="taskForm.deadline" type="date" placeholder="选择截止日期" style="width: 100%"
            value-format="YYYY-MM-DD" />
        </el-form-item>

        <el-form-item label="优先级">
          <el-select v-model="taskForm.priority" placeholder="请选择优先级" style="width: 100%">
            <el-option label="高" value="high" />
            <el-option label="中" value="medium" />
            <el-option label="低" value="low" />
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>