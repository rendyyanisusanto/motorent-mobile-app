import api from './api';

export const paymentService = {
  getMethods() {
    return api.get('/payments/methods');
  },
  
  confirmPayment(rentalId, formData) {
    return api.post(`/payments/${rentalId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
};
