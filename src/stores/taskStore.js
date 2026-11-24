import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: []
    }),

    getters: {
        uncompletedTasks: (state) => state.tasks.filter(task => !task.completed),
        completedTasks: (state) => state.tasks.filter(task => task.completed)
    },

    actions: {
        addTask(task) {
            console.log('添加任务:', task)
            this.tasks.push(task)
        },

        updateTask(updatedTask) {
            const index = this.tasks.findIndex(task => task.id === updatedTask.id)
            if (index !== -1) {
                this.tasks[index] = { ...this.tasks[index], ...updatedTask }
            }
        },

        deleteTask(id) {
            const index = this.tasks.findIndex(task => task.id === id)
            if (index !== -1) {
                this.tasks.splice(index, 1)
            }
        },

        toggleTaskStatus(id) {
            const index = this.tasks.findIndex(task => task.id === id)
            if (index !== -1) {
                this.tasks[index].completed = !this.tasks[index].completed

                if (this.tasks[index].completed) {
                    this.tasks[index].completedTime = new Date().toISOString()
                } else {
                    this.tasks[index].completedTime = null
                }
            }
        }
    },

    persist: true
}) 