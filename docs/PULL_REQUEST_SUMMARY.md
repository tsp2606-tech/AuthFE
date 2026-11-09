# Pull Request: Authentication Security, Avatar Initials & Dev Proxy Configuration

## 📌 Tổng quan các tính năng & cải tiến (Overview)
PR này cập nhật toàn bộ luồng xác thực phía Frontend, loại bỏ băm mật khẩu ở client theo chuẩn bảo mật hiện đại, tích hợp component Avatar viết hoa chữ cái đầu và tối ưu hóa cấu hình proxy trong môi trường phát triển local.

---

### 1. Xử lý mật khẩu chuẩn an toàn
- **Loại bỏ `crypto-js`**: Gỡ bỏ hoàn toàn logic băm SHA-256 ở client. Mật khẩu được gửi nguyên bản qua kênh HTTPS an toàn tới Backend để bcrypt xử lý.
- **Validation**: Kiểm tra email đăng ký phải có đuôi `@*.com`.
- **Đổi mật khẩu (Change Password)**: Bổ sung kiểm tra chặn và thông báo "Mật khẩu mới và mật khẩu cũ không được trùng nhau".

---

### 2. Component hiển thị Avatar người dùng (`UserAvatar`)
- **Tài khoản thường (Local)**: Tự động trích xuất 2 ký tự đầu viết in hoa của tên/email và hiển thị trên nền gradient màu rực rỡ, xác định (deterministic).
- **Tài khoản Google OAuth**: Hiển thị ảnh đại diện Google Avatar gốc.
- **Đồng bộ Avatar**: Khi tài khoản đăng ký thường sau đó đăng nhập bằng Google với cùng email, ảnh đại diện Google sẽ được tự động đồng bộ và hiển thị.

---

### 3. Cấu hình Vite Dev Server Proxy
- Cập nhật [`vite.config.js`](file:///d:/LearnFullStack/AuthFE/vite.config.js): Cấu hình proxy `/api` trỏ về Backend local `http://localhost:3001` (hỗ trợ biến môi trường `VITE_BACKEND_TARGET`).
- Ngăn ngừa request local vô tình bị chuyển hướng lên máy chủ Render khi đang phát triển dưới máy cục bộ.

---

### 4. Kiểm thử (Test Suite)
- Toàn bộ **12/12 unit tests** trong `tests/` đều vượt qua (`PASS`).
- Đạt 0 cảnh báo linter.
