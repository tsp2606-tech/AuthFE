import api from './index.js';

export const registerUser = async (data) => {
  const response = await api.post('/register', data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post('/login', data);
  return response.data;
};

export const googleLogin = async (idToken) => {
  const response = await api.post('/google-login', { idToken });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/me');
  return response.data;
};

export const changePassword = async (data) => {
  const response = await api.put('/change-password', data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const changeRole = async (id, role) => {
  const response = await api.patch(`/${id}/role`, { role });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post('/forgot-password', { email });
  return response.data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await api.post('/reset-password', { token, newPassword });
  return response.data;
};
