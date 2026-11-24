<template>
  <div class="container">
    <el-card>
      <template #header>
        <div class="card-header">
          <h3>欢迎使用作业代办系统</h3>
        </div>
      </template>
      
      <div style="text-align: center; padding: 40px;">
        <el-empty description="开始您的学习旅程吧！">
          <el-button type="primary" @click="$router.push('/todos')">
            开始管理作业
          </el-button>
        </el-empty>
      </div>
    </el-card>
  </div>
</template> 