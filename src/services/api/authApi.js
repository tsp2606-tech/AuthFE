import api from './index';

export const registerUser = async (data) => {
  // const response = await api.post('/register', data);
  // return response.data;
  console.log('registerUser called with', data);
};

export const loginUser = async (data) => {
  // const response = await api.post('/login', data);
  // return response.data;
  console.log('loginUser called with', data);
};

export const getMe = async () => {
  // const response = await api.get('/me');
  // return response.data;
  console.log('getMe called');
};

export const changePassword = async (data) => {
  // const response = await api.put('/change-password', data);
  // return response.data;
  console.log('changePassword called with', data);
};

export const logoutUser = async () => {
  // const response = await api.post('/logout');
  // return response.data;
  console.log('logoutUser called');
};

export const getAdminDashboard = async () => {
  // const response = await api.get('/admin/dashboard');
  // return response.data;
  console.log('getAdminDashboard called');
};

export const changeRole = async (id, role) => {
  // const response = await api.patch(`/${id}/role`, { role });
  // return response.data;
  console.log('changeRole called with id', id, 'and role', role);
};
