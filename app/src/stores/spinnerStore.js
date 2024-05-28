// stores/spinnerStore.js
import { defineStore } from 'pinia'

export const useSpinnerStore = defineStore('spinner', {
  state: () => ({
    loading: false
  }),
  actions: {
    show() {
      this.loading = true
    },
    hide() {
      this.loading = false
    }
  }
})
