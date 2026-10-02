import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DangNhap() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loi, setLoi] = useState("");

  function xuLyDangNhap(e) {
    e.preventDefault();
    setLoi("");

    // Kiểm tra nhanh tài khoản Admin mặc định -> Đã sửa thành điều hướng thẳng vào /admin
    if (email === "admin" && matKhau === "admin123") {
      localStorage.setItem("hoTenDangNhap", "Quản trị viên");
      localStorage.setItem("laAdmin", "true"); // Đánh dấu là admin
      navigate("/admin"); // Vào thẳng trang Quản trị riêng cho admin
      return;
    }

    // Nếu không phải admin, kiểm tra trong danh sách người dùng thông thường từ localStorage
    const dsNguoiDung = JSON.parse(localStorage.getItem("dsNguoiDung") || "[]");
    const nguoiDung = dsNguoiDung.find((nd) => nd.email === email && nd.matKhau === matKhau);

    if (!nguoiDung) {
      setLoi("Email hoặc mật khẩu không đúng, hoặc bạn chưa có tài khoản.");
      return;
    }

    // Lưu trạng thái đăng nhập cho tài khoản thường
    localStorage.setItem("hoTenDangNhap", nguoiDung.hoTen);
    localStorage.removeItem("laAdmin"); // Xóa cờ admin nếu đăng nhập bằng tài khoản thường
    navigate("/"); // Vào trang cửa hàng dành cho khách
  }

  return (
    <div className="trang-xac-thuc">
      <div className="khung-xac-thuc">
        <span className="logo-xac-thuc"> HẢI DƯƠNG BOUTIQUE</span>
        <h1>Đăng nhập</h1>

        <form onSubmit={xuLyDangNhap}>
          <label>Email hoặc Tài khoản</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Mật khẩu</label>
          <input type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required />

          {loi && <div className="thong-bao-loi">{loi}</div>}

          <button type="submit" className="nut-xac-thuc">Đăng nhập</button>
        </form>

        <div className="lien-ket-phu">
          Chưa có tài khoản? <Link to="/dang-ky">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}