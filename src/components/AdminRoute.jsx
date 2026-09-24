import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect, useRef } from 'react';

export default function AdminRoute() {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userRaw = localStorage.getItem('user') || sessionStorage.getItem('user');
  const user = userRaw ? JSON.parse(userRaw) : null;
  const warnedRef = useRef(false);

  useEffect(() => {
    if (token && user?.role !== 'admin' && !warnedRef.current) {
      toast.error('Bạn không có quyền truy cập trang quản trị');
      warnedRef.current = true;
    }
  }, [token, user]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/profile" replace />;
  }

  return <Outlet />;
}
