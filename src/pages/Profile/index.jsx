import { useState, useEffect } from 'react';
import { User, Mail, Shield, Lock, KeyRound, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { getMe, changePassword } from '@/services/api/authApi';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showSamePasswordDialog, setShowSamePasswordDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);

  useEffect(() => {
    // Luôn gọi GET /me để đồng bộ dữ liệu mới nhất
    const fetchUserProfile = async () => {
      try {
        setFetchingUser(true);
        const res = await getMe();
        if (res?.user) {
          setUser(res.user);
          const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(res.user));
        }
      } catch (error) {
        toast.error('Không thể tải thông tin mới nhất. Vui lòng thử lại.');
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setFetchingUser(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error('Vui lòng nhập đầy đủ mật khẩu cũ và mới');
      return;
    }

    if (oldPassword === newPassword) {
      setShowSamePasswordDialog(true);
      toast.error('Mật khẩu mới và mật khẩu cũ không được trùng nhau');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Mật khẩu mới phải từ 6 ký tự trở lên');
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword({ oldPassword, newPassword });
      toast.success(res.message || 'Đổi mật khẩu thành công');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Đổi mật khẩu thất bại';
      if (errorMsg.includes('không được trùng')) {
        setShowSamePasswordDialog(true);
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser && !user) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex items-center gap-2 text-gray-500 font-medium">
          <Loader2 className="animate-spin text-blue-600" size={24} />
          Đang tải thông tin cá nhân...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            Thông tin cá nhân
          </h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
            <UserAvatar 
              user={user} 
              size="xl" 
              className="border-4 border-gray-50 shadow-sm" 
            />
            <div className="text-center sm:text-left flex-1">
              <h4 className="text-2xl font-bold text-gray-900">{user?.name || '---'}</h4>
              <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-1 mt-1">
                <Mail size={16} />
                {user?.email || '---'}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  Role: {user?.role || '---'}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user?.authType === 'google' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                  Auth Type: {user?.authType || 'local'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <User size={18} className="text-gray-400" />
                {user?.name || '---'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <Mail size={18} className="text-gray-400" />
                {user?.email || '---'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Vai trò (Role)</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <Shield size={18} className="text-gray-400" />
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user?.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                  {user?.role || '---'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {user?.authType !== 'google' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <KeyRound className="text-blue-600" size={20} />
              Đổi mật khẩu
            </h3>
          </div>
          <div className="p-6">
            <form className="max-w-md space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                    placeholder="Mật khẩu mới (>= 6 ký tự)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSamePasswordDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Thông báo</h3>
            <p className="text-sm text-gray-600 mb-6">Mật khẩu mới và mật khẩu cũ không được trùng nhau</p>
            <button
              type="button"
              onClick={() => setShowSamePasswordDialog(false)}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              Đồng ý
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
