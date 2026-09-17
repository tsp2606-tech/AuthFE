import { Users, Shield, ShieldCheck, ShieldOff } from 'lucide-react';

export default function AdminDashboard() {
  const users = [
    { _id: '1', name: 'Nguyễn Văn A', email: 'nva@gmail.com', role: 'admin' },
    { _id: '2', name: 'Trần Thị B', email: 'ttb@gmail.com', role: 'user' },
    { _id: '3', name: 'Lê Văn C', email: 'lvc@gmail.com', role: 'user' },
  ];

  const handleRoleChange = (userId, currentRole) => {
    // Logic update role
    console.log('Change role for', userId, 'from', currentRole);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Users className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Tổng số Users</p>
            <p className="text-2xl font-bold text-gray-900">10</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <ShieldCheck className="text-purple-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Số Admin</p>
            <p className="text-2xl font-bold text-gray-900">2</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Shield className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Số User thường</p>
            <p className="text-2xl font-bold text-gray-900">8</p>
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
                    <div className="font-medium text-gray-900">{user.name}</div>
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
                    {user.role === 'admin' ? (
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        <ShieldOff size={14} />
                        Hạ cấp User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-purple-200 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm font-medium transition-colors"
                      >
                        <ShieldCheck size={14} />
                        Cấp Admin
                      </button>
                    )}
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
