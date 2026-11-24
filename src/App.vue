<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const currentTitle = computed(() => route.meta.title || '首页')
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header height="60px">
        <h2>作业待办系统</h2>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <el-menu router :default-active="route.path" class="el-menu-vertical">
            <el-menu-item index="/">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/categories">
              <el-icon>
                <Folder />
              </el-icon>
              <span>作业分类</span>
            </el-menu-item>
            <el-menu-item index="/tasks">
              <el-icon>
                <Document />
              </el-icon>
              <span>作业管理</span>
            </el-menu-item>
            <el-menu-item index="/todos">
              <el-icon>
                <List />
              </el-icon>
              <span>作业待办</span>
            </el-menu-item>
            <el-menu-item index="/history">
              <el-icon>
                <Calendar />
              </el-icon>
              <span>完成历史</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 内容区 -->
        <el-container>
          <el-header height="50px" style="background-color: #f5f7fa; color: #333; border-bottom: 1px solid #e6e6e6;">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-if="route.path !== '/'">{{ currentTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-header>

          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-menu-vertical {
  height: 100%;
  border-right: none;
}
</style>