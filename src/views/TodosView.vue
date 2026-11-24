<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { useCategoryStore } from '../stores/categoryStore'

const taskStore = useTaskStore()
const categoryStore = useCategoryStore()

// 过滤条件
const filterCategory = ref('')
const filterPriority = ref('')
const searchKeyword = ref('')

// 过滤后的任务列表
const filteredTasks = computed(() => {
  return taskStore.uncompletedTasks.filter(task => {
    // 分类过滤
    if (filterCategory.value && task.categoryId !== filterCategory.value) {
      return false
    }
    
    // 优先级过滤
    if (filterPriority.value && task.priority !== filterPriority.value) {
      return false
    }
    
    // 关键词搜索
    if (searchKeyword.value && !task.title.toLowerCase().includes(searchKeyword.value.toLowerCase())) {
      return false
    }
    
    return true
  })
})

// 完成作业
const completeTask = (id) => {
  taskStore.toggleTaskStatus(id)
}

// 重置过滤条件
const resetFilters = () => {
  filterCategory.value = ''
  filterPriority.value = ''
  searchKeyword.value = ''
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
</script>

<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>作业代办</h3>
        </div>
      </template>
      
      <!-- 过滤区域 -->
      <div style="margin-bottom: 20px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              v-model="searchKeyword"
              placeholder="搜索作业标题"
              clearable
              @clear="resetFilters"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
          </el-col>
          
          <el-col :span="6">
            <el-select
              v-model="filterCategory"
              placeholder="按分类筛选"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="category in categoryStore.categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              />
            </el-select>
          </el-col>
          
          <el-col :span="6">
            <el-select
              v-model="filterPriority"
              placeholder="按优先级筛选"
              clearable
              style="width: 100%"
            >
              <el-option label="高" value="high" />
              <el-option label="中" value="medium" />
              <el-option label="低" value="low" />
            </el-select>
          </el-col>
          
          <el-col :span="4">
            <el-button @click="resetFilters">重置</el-button>
          </el-col>
        </el-row>
      </div>
      
      <el-divider />
      
      <!-- 任务列表 -->
      <div v-if="filteredTasks.length > 0" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
        <el-card
          v-for="task in filteredTasks"
          :key="task.id"
          shadow="hover"
          style="margin-bottom: 10px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <h4 style="margin: 0;">{{ task.title }}</h4>
              <el-tag :type="priorityLabel(task.priority).type" size="small">
                {{ priorityLabel(task.priority).label }}优先级
              </el-tag>
              <el-tag type="info" size="small">
                {{ categoryStore.getCategoryName(task.categoryId) }}
              </el-tag>
            </div>
            <div>
              <el-button
                type="success"
                size="small"
                @click="completeTask(task.id)"
              >
                完成
              </el-button>
            </div>
          </div>
          
          <div style="margin-bottom: 10px; color: #666;">
            <p v-if="task.description">{{ task.description }}</p>
            <p v-else style="font-style: italic; color: #999;">暂无描述</p>
          </div>
          
          <div style="font-size: 12px; color: #666;">
            <span style="display: flex; align-items: center; gap: 5px;">
              <el-icon><Calendar /></el-icon>
              截止日期: {{ formatDate(task.deadline) }}
            </span>
          </div>
        </el-card>
      </div>
      
      <el-empty v-else description="暂无待办作业" />
    </el-card>
  </div>
</template> 