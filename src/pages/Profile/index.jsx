import { useState, useEffect } from 'react';
import { User, Mail, Shield, Lock, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { changePassword } from '@/services/api/authApi';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      toast.error('Vui lòng nhập đầy đủ mật khẩu cũ và mới');
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
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

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
            <img 
              src={user?.avatar || 'https://via.placeholder.com/150'} 
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
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
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                    placeholder="Mật khẩu mới (>= 6 ký tự)"
                  />
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
    </div>
  );
}
