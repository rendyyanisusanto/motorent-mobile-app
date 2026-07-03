import api from './api';

const motorService = {
  async getAll(params = {}) {
    const response = await api.get('/motorcycles', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/motorcycles/${id}`);
    return response.data;
  }
};

export default motorService;
