import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: []
    }),

    actions: {
        addCategory(category) {
            this.categories.push(category)
        },

        deleteCategory(id) {
            const index = this.categories.findIndex(cat => cat.id === id)
            if (index !== -1) {
                this.categories.splice(index, 1)
            }
        },

        getCategoryName(id) {
            const category = this.categories.find(cat => cat.id === id)
            return category ? category.name : '未分类'
        }
    },

    persist: true
}) 