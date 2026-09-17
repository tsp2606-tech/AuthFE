import api from './index';
import CryptoJS from 'crypto-js';

// Hàm helper mã hóa password thành hash SHA256 trước khi gửi đi
const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

export const registerUser = async (data) => {
  const payload = { ...data, password: hashPassword(data.password) };
  const response = await api.post('/register', payload);
  return response.data;
};

export const loginUser = async (data) => {
  const payload = { ...data, password: hashPassword(data.password) };
  const response = await api.post('/login', payload);
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
  const payload = { 
    oldPassword: hashPassword(data.oldPassword), 
    newPassword: hashPassword(data.newPassword) 
  };
  const response = await api.put('/change-password', payload);
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
