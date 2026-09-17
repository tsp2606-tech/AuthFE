import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  if (!token) {
    // Nếu không có token, chuyển hướng về trang login ngay lập tức
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép truy cập vào các route con
  return <Outlet />;
}
