import { User, Mail, Shield, Lock, KeyRound } from 'lucide-react';

export default function Profile() {
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <User size={18} className="text-gray-400" />
                Nguyễn Văn A
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <Mail size={18} className="text-gray-400" />
                nva@gmail.com
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Vai trò (Role)</label>
              <div className="flex items-center gap-2 text-gray-900 font-medium bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-100">
                <Shield size={18} className="text-gray-400" />
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  user
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-2.5 border"
                  placeholder="Mật khẩu mới (>= 6 ký tự)"
                />
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cập nhật mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
