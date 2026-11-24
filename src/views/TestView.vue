<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const message = ref('')

const openDialog = () => {
    console.log('打开对话框')
    dialogVisible.value = true
}

const handleConfirm = () => {
    console.log('确认', message.value)
    dialogVisible.value = false
}
</script>

<template>
    <div class="container">
        <h2>测试页面</h2>
        <el-button type="primary" @click="openDialog">打开对话框</el-button>

        <el-dialog v-model="dialogVisible" title="测试对话框" width="400px">
            <el-input v-model="message" placeholder="请输入内容"></el-input>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>