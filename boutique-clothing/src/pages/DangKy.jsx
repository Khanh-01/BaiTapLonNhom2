import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DangKy() {
  const navigate = useNavigate();

  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [xacNhanMatKhau, setXacNhanMatKhau] = useState("");
  const [loi, setLoi] = useState("");

  function xuLyDangKy(e) {
    e.preventDefault();
    setLoi("");

    if (matKhau !== xacNhanMatKhau) {
      setLoi("Mật khẩu nhập lại không khớp.");
      return;
    }
    if (matKhau.length < 6) {
      setLoi("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // đọc danh sách tài khoản đã có trong trình duyệt (localStorage)
    const dsNguoiDung = JSON.parse(localStorage.getItem("dsNguoiDung") || "[]");

    const daTonTai = dsNguoiDung.some((nd) => nd.email === email);
    if (daTonTai) {
      setLoi("Email này đã được đăng ký.");
      return;
    }

    // lưu tài khoản mới vào danh sách
    dsNguoiDung.push({ hoTen, email, matKhau });
    localStorage.setItem("dsNguoiDung", JSON.stringify(dsNguoiDung));

    // đăng ký xong thì chuyển sang trang đăng nhập
    navigate("/dang-nhap");
  }

  return (
    <div className="trang-xac-thuc">
      <div className="khung-xac-thuc">
        <span className="logo-xac-thuc"> HẢI DƯƠNG BOUTIQUE</span>
        <h1>Tạo tài khoản mới</h1>

        <form onSubmit={xuLyDangKy}>
          <label>Họ và tên</label>
          <input value={hoTen} onChange={(e) => setHoTen(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Mật khẩu</label>
          <input type="password" value={matKhau} onChange={(e) => setMatKhau(e.target.value)} required />

          <label>Nhập lại mật khẩu</label>
          <input type="password" value={xacNhanMatKhau} onChange={(e) => setXacNhanMatKhau(e.target.value)} required />

          {loi && <div className="thong-bao-loi">{loi}</div>}

          <button type="submit" className="nut-xac-thuc">Đăng ký</button>
        </form>

        <div className="lien-ket-phu">
          Đã có tài khoản? <Link to="/dang-nhap">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
