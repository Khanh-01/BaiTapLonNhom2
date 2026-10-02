import { Routes, Route } from "react-router-dom";
import CuaHang from "./pages/CuaHang.jsx";
import DangNhap from "./pages/DangNhap.jsx";
import DangKy from "./pages/DangKy.jsx";
import QuanTri from "./pages/QuanTri.jsx"; // <-- 1. Import trang quản trị vào đây

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CuaHang />} />
      <Route path="/dang-nhap" element={<DangNhap />} />
      <Route path="/dang-ky" element={<DangKy />} />
      <Route path="/admin" element={<QuanTri />} /> {/* <-- 2. Thêm đường dẫn tới trang quản trị */}
    </Routes>
  );
}