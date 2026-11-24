# 作业代办系统

一个基于Vue 3、Pinia和Element Plus的作业代办系统。

## 功能

- 作业分类管理：添加、删除作业分类
- 作业管理：添加、编辑、删除作业
- 作业代办：查看未完成的作业，并标记为已完成
- 完成历史：查看已完成的作业，并可以撤销完成状态

## 技术栈

- Vue 3
- Vue Router
- Pinia (状态管理)
- pinia-plugin-persistedstate (状态持久化)
- Element Plus (UI组件库)

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 项目结构

```
src/
├── assets/       # 静态资源
├── components/   # 公共组件
├── router/       # 路由配置
├── stores/       # Pinia状态管理
├── views/        # 页面视图
├── App.vue       # 根组件
└── main.js       # 入口文件
``` 