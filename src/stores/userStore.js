import { defineStore } from 'pinia'
import { user } from '../mock/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: user,
    isAuthenticated: true
  })
})
