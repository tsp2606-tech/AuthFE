import { useState, useEffect, useCallback } from 'react';
import { Users, Shield, ShieldCheck, ShieldOff, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAdminDashboard, changeRole, deleteUser } from '@/services/api/authApi';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, adminCount: 0, userCount: 0 });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const getCurrentUser = () => {
    try {
      const raw = localStorage.getItem('user') || sessionStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const currentUser = getCurrentUser();

  const fetchDashboardData = useCallback(async () => {
    try {
      const res = await getAdminDashboard();
      setUsers(res.users || []);
      // Đọc đúng từ res.stats theo đặc tả API
      setStats({
        totalUsers: res.stats?.totalUsers ?? res.totalUsers ?? 0,
        adminCount: res.stats?.adminCount ?? res.adminCount ?? 0,
        userCount: res.stats?.userCount ?? res.userCount ?? 0,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không có quyền truy cập');
      if (error.response?.status === 403) {
        navigate('/profile');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRoleChange = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';
      await changeRole(userId, newRole);
      toast.success('Đổi quyền thành công');
      fetchDashboardData(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể đổi quyền');
      if (error.response?.status === 403) {
        navigate('/profile');
      }
    }
  };

  const handleDeleteUser = async (user) => {
    const isConfirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa người dùng "${user.name}" (${user.email}) không? Hành động này không thể hoàn tác.`
    );
    if (!isConfirmed) return;

    try {
      setDeletingId(user._id);
      await deleteUser(user._id);
      toast.success('Xóa người dùng thành công');
      fetchDashboardData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể xóa người dùng');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Users className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số Users</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <ShieldCheck className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Số Admin</p>
            <p className="text-2xl font-bold text-gray-900">{stats.adminCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Số User thường</p>
            <p className="text-2xl font-bold text-gray-900">{stats.userCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="text-blue-600" size={20} />
            Quản lý người dùng
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-200">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Họ và tên</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Quyền</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} size="sm" />
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.role === 'admin' ? (
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          disabled={currentUser && (currentUser._id === user._id || currentUser.id === user._id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                            currentUser && (currentUser._id === user._id || currentUser.id === user._id)
                              ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                              : 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100'
                          }`}
                          title={
                            currentUser && (currentUser._id === user._id || currentUser.id === user._id)
                              ? 'Không thể tự hạ quyền của chính mình'
                              : 'Hạ cấp xuống User'
                          }
                        >
                          <ShieldOff size={14} />
                          Hạ cấp User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(user._id, user.role)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium transition-colors"
                          title="Cấp quyền Admin"
                        >
                          <ShieldCheck size={14} />
                          Cấp Admin
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteUser(user)}
                        disabled={
                          deletingId === user._id ||
                          (currentUser && (currentUser._id === user._id || currentUser.id === user._id))
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-sm font-medium transition-colors ${
                          currentUser && (currentUser._id === user._id || currentUser.id === user._id)
                            ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                            : deletingId === user._id
                            ? 'border-red-200 text-red-400 bg-red-50 cursor-wait'
                            : 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100'
                        }`}
                        title={
                          currentUser && (currentUser._id === user._id || currentUser.id === user._id)
                            ? 'Không thể tự xóa tài khoản của chính mình'
                            : 'Xóa người dùng'
                        }
                      >
                        {deletingId === user._id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        {deletingId === user._id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
