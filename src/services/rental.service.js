import api from './api';

export const rentalService = {
  createRental(formData) {
    return api.post('/rentals', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getMyRentals(page = 1, limit = 10) {
    return api.get(`/rentals/my?page=${page}&limit=${limit}`);
  },
  getById(id) {
    return api.get(`/rentals/${id}`);
  },
  cancelRental(id) {
    return api.patch(`/rentals/${id}/cancel`);
  },
};
