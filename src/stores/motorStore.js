import { defineStore } from 'pinia'
import motorService from '../services/motor.service'

export const useMotorStore = defineStore('motor', {
  state: () => ({
    motors: [],
    loading: false,
    error: null
  }),
  getters: {
    getMotorById: (state) => (id) => {
      return state.motors.find(motor => String(motor.id) === String(id))
    }
  },
  actions: {
    async fetchMotors() {
      this.loading = true;
      this.error = null;
      try {
        const res = await motorService.getAll();
        if (res.success) {
          this.motors = res.data;
        } else {
          this.error = res.message || 'Failed to fetch motors';
        }
      } catch (err) {
        this.error = err.response?.data?.message || 'Error fetching motors';
        console.error(this.error);
      } finally {
        this.loading = false;
      }
    }
  }
})
