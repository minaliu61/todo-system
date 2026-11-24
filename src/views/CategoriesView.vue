<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '../stores/categoryStore'

const categoryStore = useCategoryStore()
const categoryName = ref('')

// 添加分类
const addCategory = () => {
  if (categoryName.value.trim()) {
    categoryStore.addCategory({
      id: Date.now(),
      name: categoryName.value.trim()
    })
    categoryName.value = ''
  }
}

// 处理键盘事件
const handleKeyup = (event) => {
  if (event.key === 'Enter') {
    addCategory()
  }
}

// 删除分类
const deleteCategory = (id) => {
  categoryStore.deleteCategory(id)
}
</script>

<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>作业分类管理</h3>
        </div>
      </template>
      
      <div style="max-width: 500px; margin: 0 auto;">
        <el-input
          v-model="categoryName"
          placeholder="请输入分类名称"
          @keyup="handleKeyup"
        >
          <template #append>
            <el-button @click="addCategory">添加分类</el-button>
          </template>
        </el-input>
      </div>
      
      <el-divider content-position="center">分类列表</el-divider>
      
      <el-empty v-if="categoryStore.categories.length === 0" description="暂无分类" />
      
      <el-table v-else :data="categoryStore.categories" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              type="danger"
              size="small"
              @click="deleteCategory(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template> 