import axios from 'axios';

const api = axios.create({
  // THAY LINK RENDER CỦA BẠN VÀO DÒNG BÊN DƯỚI NẾU CHƯA DÙNG VITE_API_URL
  baseURL: import.meta.env?.VITE_API_URL || (import.meta.env?.PROD ? 'https://authapi-oimn.onrender.com/api/auth' : '/api/auth'),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const url = error.config?.url || '';
      // Không tự động đăng xuất nếu lỗi 401 xuất phát từ việc nhập sai mật khẩu hiện tại (change-password) hoặc đăng nhập (login)
      const isAuthActionError = 
        url.includes('/change-password') || 
        url.includes('/login') || 
        url.includes('/forgot-password') || 
        url.includes('/reset-password');

      if (!isAuthActionError) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        // Chỉ redirect nếu không phải đang ở trang login/register
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
