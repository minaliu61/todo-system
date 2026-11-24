<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoryStore } from '../stores/categoryStore'

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()

// 按完成时间排序
const sortedCompletedTasks = computed(() => {
  return [...taskStore.completedTasks].sort((a, b) => {
    return new Date(b.completedTime) - new Date(a.completedTime)
  })
})

// 撤销完成
const undoComplete = (id) => {
  taskStore.toggleTaskStatus(id)
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
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
</script>

<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>完成历史</h3>
        </div>
      </template>
      
      <el-table
        v-if="sortedCompletedTasks.length > 0"
        :data="sortedCompletedTasks"
        style="width: 100%"
      >
        <el-table-column prop="title" label="标题" />
        <el-table-column label="分类">
          <template #default="scope">
            {{ categoryStore.getCategoryName(scope.row.categoryId) }}
          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template #default="scope">
            <el-tag :type="priorityLabel(scope.row.priority).type" size="small">
              {{ priorityLabel(scope.row.priority).label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="完成时间">
          <template #default="scope">
            {{ formatDate(scope.row.completedTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="undoComplete(scope.row.id)"
            >
              撤销完成
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-empty v-else description="暂无已完成作业" />
    </el-card>
  </div>
</template> 