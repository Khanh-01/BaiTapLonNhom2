import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CuaHang() {
  const navigate = useNavigate();
  const hoTenDangNhap = localStorage.getItem("hoTenDangNhap");

  function dangXuat() {
    localStorage.removeItem("hoTenDangNhap");
    localStorage.removeItem("laAdmin");
    navigate("/dang-nhap");
  }

  function kiemTraVaChanAdmin() {
    const laAdmin = localStorage.getItem("laAdmin");
    if (laAdmin === "true") {
      alert("⚠️ Tài khoản Quản trị viên (Admin) chỉ có quyền quản lý hệ thống, không được phép mua hàng!");
      return true;
    }
    return false;
  }

  // --- DỮ LIỆU MẶC ĐỊNH (GIỮ NGUYÊN LINK ẢNH GỐC CỦA BẠN & TỒN KHO THEO SIZE) ---
  const sanPhamMacDinh = [
    { id: "ao-thun-trang", ten: "Áo thun cơ bản", loai: "Áo thun", gia: 149000, mau: "Trắng", tonKho: { S: 5, M: 10, L: 8, XL: 3 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwS1Nf7RZiaO7LQAelVY0x2lEp9xeaG-I-k4kz-pG5Jw&s=10" },
    { id: "ao-thun-den", ten: "Áo thun trơn", loai: "Áo thun", gia: 149000, mau: "Đen", tonKho: { S: 2, M: 4, L: 6, XL: 2 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzTQG7ZgGXC0VY_q2bHRvz_hfaHTFcvcxZkI4oz_Cj4g&s=10" },
    { id: "ao-so-mi-ke", ten: "Áo sơ mi kẻ", loai: "Áo sơ mi", gia: 259000, mau: "Xanh kẻ", tonKho: { S: 4, M: 8, L: 5, XL: 1 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8ZusZWIlwxozYrdKu8e40uIRnxfRYIVOY_2DcEZsHw&s=10" },
    { id: "ao-so-mi-trang", ten: "Áo sơ mi trắng", loai: "Áo sơ mi", gia: 239000, mau: "Trắng", tonKho: { S: 3, M: 5, L: 4, XL: 2 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_kCwidUxjiMKhXhRgRlvJ3UOV458VF0OXqL2vlELHQ&s=10" },
    { id: "quan-jean-xanh", ten: "Quần jean slimfit", loai: "Quần jean", gia: 349000, mau: "Xanh đậm", tonKho: { S: 10, M: 15, L: 12, XL: 5 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4jHoNLpdKkYe11JySRh2mNymRxlzHnRj7FKmVcR-fbA&s=10" },
    { id: "quan-jean-den", ten: "Quần jean ống suông", loai: "Quần jean", gia: 359000, mau: "Đen", tonKho: { S: 4, M: 6, L: 5, XL: 3 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtVnKI6HMYhZ-FXxBobBfBvCdGBBej3gDq6SSFZ-P3vQ&s=10" },
    { id: "vay-hoa-nhe", ten: "Váy hoa nhí", loai: "Váy", gia: 289000, mau: "Họa tiết hoa", tonKho: { S: 6, M: 7, L: 4, XL: 0 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNa4IRBD-v_lKkEayhkKVAk7Rc21xPAsG5HSZm4afcZg&s=10" },
    { id: "vay-body", ten: "Váy body ôm", loai: "Váy", gia: 269000, mau: "Đen", tonKho: { S: 2, M: 4, L: 3, XL: 1 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0KdkVDTjZ5hrzBwVoxk-F8DulAs01MlzPlg_8_fsfQ&s=10" },
    { id: "ao-khoac-jean", ten: "Áo khoác jean", loai: "Áo khoác", gia: 399000, mau: "Xanh nhạt", tonKho: { S: 3, M: 5, L: 4, XL: 2 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVY6p4bGzPzHMu0zvw22HkSWD35WR9cRR2mId3BMEPnw&s=10" },
    { id: "ao-khoac-bomber", ten: "Áo khoác bomber", loai: "Áo khoác", gia: 429000, mau: "Đen", tonKho: { S: 4, M: 6, L: 5, XL: 3 }, anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRDFvulc4lZDxD63EilUtgILAiyEb6_SwCS_sl--iDg&s=10" },
  ];

  const [danhSachSanPham, setDanhSachSanPham] = useState(() => {
    const luuTru = localStorage.getItem("danhSachSanPhamKho");
    return luuTru ? JSON.parse(luuTru) : sanPhamMacDinh;
  });

  const danhSachLoai = ["Tất cả", ...new Set(danhSachSanPham.map((sp) => sp.loai))];
  const sizeList = ["S", "M", "L", "XL"];

  const [loaiDangLoc, setLoaiDangLoc] = useState("Tất cả");
  const [sizeDangChon, setSizeDangChon] = useState({});
  const [gio, setGio] = useState([]);
  const [daDatHang, setDaDatHang] = useState(false);
  const [hoTen, setHoTen] = useState("");
  const [dienThoai, setDienThoai] = useState("");
  const [diaChi, setDiaChi] = useState("");
  
  // Modal xem chi tiết
  const [sanPhamDangXem, setSanPhamDangXem] = useState(null);
  const [sizeModal, setSizeModal] = useState("M");
  const [soLuongModal, setSoLuongModal] = useState(1);

  // Đồng bộ dữ liệu khi Admin thay đổi bên trang Quản trị
  useEffect(() => {
    function xuLyStorageChange() {
      const luuTru = localStorage.getItem("danhSachSanPhamKho");
      if (luuTru) {
        setDanhSachSanPham(JSON.parse(luuTru));
      }
    }
    const interval = setInterval(xuLyStorageChange, 1000);
    return () => clearInterval(interval);
  }, []);

  const sanPhamHienThi =
    loaiDangLoc === "Tất cả" ? danhSachSanPham : danhSachSanPham.filter((sp) => sp.loai === loaiDangLoc);

  function themVaoGio(sp) {
    if (kiemTraVaChanAdmin()) return;
    const size = sizeDangChon[sp.id] || "M";
    const tonKhoSize = sp.tonKho ? sp.tonKho[size] || 0 : 0;

    if (tonKhoSize <= 0) {
      alert(`⚠️ Sản phẩm "${sp.ten}" size [${size}] hiện đã tạm hết hàng!`);
      return;
    }

    const dongId = sp.id + "|" + size;

    setGio((truoc) => {
      const dongDaCo = truoc.find((d) => d.dongId === dongId);
      const soLuongHienTaiTrongGio = dongDaCo ? dongDaCo.soLuong : 0;

      if (soLuongHienTaiTrongGio + 1 > tonKhoSize) {
        alert(`⚠️ Kho chỉ còn lại ${tonKhoSize} sản phẩm cho size ${size}!`);
        return truoc;
      }

      if (dongDaCo) {
        return truoc.map((d) => (d.dongId === dongId ? { ...d, soLuong: d.soLuong + 1 } : d));
      }
      return [...truoc, { dongId, id: sp.id, ten: sp.ten, gia: sp.gia, size, soLuong: 1, anh: sp.anh }];
    });
  }

  function themVaoGioTuModal(sp) {
    if (kiemTraVaChanAdmin()) return;
    const tonKhoSize = sp.tonKho ? sp.tonKho[sizeModal] || 0 : 0;

    if (tonKhoSize <= 0) {
      alert(`⚠️ Sản phẩm này size ${sizeModal} đã hết hàng!`);
      return;
    }

    const dongId = sp.id + "|" + sizeModal;

    setGio((truoc) => {
      const dongDaCo = truoc.find((d) => d.dongId === dongId);
      const soLuongHienTaiTrongGio = dongDaCo ? dongDaCo.soLuong : 0;

      if (soLuongHienTaiTrongGio + soLuongModal > tonKhoSize) {
        alert(`⚠️ Số lượng vượt quá tồn kho hiện tại của size ${sizeModal} (Còn: ${tonKhoSize})!`);
        return truoc;
      }

      if (dongDaCo) {
        return truoc.map((d) => (d.dongId === dongId ? { ...d, soLuong: d.soLuong + soLuongModal } : d));
      }
      return [...truoc, { dongId, id: sp.id, ten: sp.ten, gia: sp.gia, size: sizeModal, soLuong: soLuongModal, anh: sp.anh }];
    });

    setSanPhamDangXem(null);
    alert(`Đã thêm ${soLuongModal} sản phẩm vào giỏ hàng thành công!`);
  }

  function doiSoLuongGio(dongId, thayDoi) {
    setGio((truoc) =>
      truoc
        .map((d) => {
          if (d.dongId === dongId) {
            const spGoc = danhSachSanPham.find((item) => item.id === d.id);
            const tonKhoSize = spGoc && spGoc.tonKho ? spGoc.tonKho[d.size] || 0 : 0;
            const soLuongMoi = d.soLuong + thayDoi;

            if (soLuongMoi > tonKhoSize) {
              alert(`⚠️ Size ${d.size} chỉ còn lại ${tonKhoSize} sản phẩm trong kho!`);
              return d;
            }
            return { ...d, soLuong: soLuongMoi };
          }
          return d;
        })
        .filter((d) => d.soLuong > 0)
    );
  }

  function xoaKhoiGio(dongId) {
    setGio((truoc) => truoc.filter((d) => d.dongId !== dongId));
  }

  const tongTien = gio.reduce((tong, d) => tong + d.gia * d.soLuong, 0);
  const tongSoLuong = gio.reduce((tong, d) => tong + d.soLuong, 0);

  function xuLyDatHang(e) {
    e.preventDefault();
    if (kiemTraVaChanAdmin()) return;
    if (gio.length === 0) return;

    // Trừ kho thực tế theo đúng sản phẩm và size khách đặt
    const dsMoi = danhSachSanPham.map((sp) => {
      let tonKhoMoi = { ...sp.tonKho };
      gio.forEach((item) => {
        if (item.id === sp.id) {
          tonKhoMoi[item.size] = Math.max(0, (tonKhoMoi[item.size] || 0) - item.soLuong);
        }
      });
      return { ...sp, tonKho: tonKhoMoi };
    });

    setDanhSachSanPham(dsMoi);
    localStorage.setItem("danhSachSanPhamKho", JSON.stringify(dsMoi));

    const donHangMoi = {
      id: "DH" + Date.now().toString().slice(-4),
      khachHang: hoTen,
      sdt: dienThoai,
      diaChi: diaChi,
      sanPham: [...gio],
      tongTien: tongTien,
      trangThai: "Đang xử lý",
      ngay: new Date().toLocaleString("vi-VN"),
    };

    const dsDonCu = JSON.parse(localStorage.getItem("danhSachDonHang")) || [];
    localStorage.setItem("danhSachDonHang", JSON.stringify([donHangMoi, ...dsDonCu]));
    setDaDatHang(true);
    setGio([]);
  }

  return (
    <div className="trang" style={{ fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: "50px" }}>
      <div style={{ background: "#0f172a", color: "#fff", textAlign: "center", padding: "8px", fontSize: "13px" }}>
        🚀 Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ — Hỗ trợ đổi trả trong 7 ngày
      </div>

      <header style={{ background: "#fff", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", position: "sticky", top: 0, zIndex: 1000 }}>
        <span style={{ fontWeight: "800", fontSize: "20px", color: "#0f172a" }}>HẢI DƯƠNG BOUTIQUE</span>
        
        <nav style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {danhSachLoai.map((loai) => (
            <button 
              key={loai} 
              onClick={() => setLoaiDangLoc(loai)}
              style={{ background: loai === loaiDangLoc ? "#0f172a" : "transparent", color: loai === loaiDangLoc ? "#fff" : "#475569", border: "none", padding: "8px 14px", borderRadius: "20px", cursor: "pointer", fontWeight: "600", fontSize: "14px" }}
            >
              {loai}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {hoTenDangNhap ? (
            <span style={{ fontSize: "14px", color: "#334155" }}>
              Xin chào, <strong>{hoTenDangNhap}</strong> · <button onClick={dangXuat} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: "600" }}>Đăng xuất</button>
            </span>
          ) : (
            <span style={{ fontSize: "14px" }}>
              <Link to="/dang-nhap" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>Đăng nhập</Link> · <Link to="/dang-ky" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "600" }}>Đăng ký</Link>
            </span>
          )}
          <a href="#gio-hang" style={{ position: "relative", textDecoration: "none", color: "#0f172a", fontWeight: "600", display: "flex", alignItems: "center", gap: "5px" }}>
            🛍 Giỏ hàng
            {tongSoLuong > 0 && (
              <span style={{ background: "#ef4444", color: "#fff", borderRadius: "50%", padding: "2px 6px", fontSize: "11px", position: "absolute", top: "-8px", right: "-12px", fontWeight: "bold" }}>
                {tongSoLuong}
              </span>
            )}
          </a>
        </div>
      </header>

      <main style={{ maxWidth: "1200px", margin: "30px auto", padding: "0 20px" }}>
        <div style={{ background: "linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSluka9_NKIFbWZ2WOjTyAxJhvuy1BCp4JDr-0TIU5s1g&s=10') center/cover", borderRadius: "16px", color: "#fff", padding: "60px 40px", marginBottom: "40px" }}>
          <span style={{ background: "#38bdf8", color: "#0f172a", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>BST MỚI NHẤT</span>
          <h1 style={{ fontSize: "36px", margin: "15px 0 10px 0" }}>Thời trang phong cách &amp; tối giản</h1>
          <p style={{ fontSize: "16px", maxWidth: "500px", opacity: 0.9, marginBottom: "25px" }}>Thiết kế tinh gọn, chất liệu cao cấp — mỗi món đồ đều được chọn lọc kỹ càng.</p>
          <a href="#san-pham" style={{ background: "#fff", color: "#0f172a", padding: "10px 24px", borderRadius: "6px", textDecoration: "none", fontWeight: "bold" }}>Khám phá bộ sưu tập</a>
        </div>

        <div id="san-pham" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", color: "#0f172a" }}>Sản phẩm nổi bật ({sanPhamHienThi.length})</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px", marginBottom: "50px" }}>
          {sanPhamHienThi.map((sp) => {
            const sizeHienTai = sizeDangChon[sp.id] || "M";
            const tonKhoSizeHienTai = sp.tonKho ? sp.tonKho[sizeHienTai] || 0 : 0;
            const hetHang = tonKhoSizeHienTai <= 0;

            return (
              <div key={sp.id} style={{ background: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
                <div 
                  onClick={() => { setSanPhamDangXem(sp); setSoLuongModal(1); setSizeModal("M"); }}
                  style={{ height: "260px", background: "#f1f5f9", position: "relative", cursor: "pointer", overflow: "hidden" }}
                >
                  <img src={sp.anh} alt={sp.ten} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  {hetHang && (
                    <span style={{ position: "absolute", top: "10px", right: "10px", background: "#ef4444", color: "#fff", padding: "4px 10px", fontSize: "11px", fontWeight: "bold", borderRadius: "4px" }}>
                      Hết size {sizeHienTai}
                    </span>
                  )}
                </div>

                <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>{sp.loai}</span>
                    <span style={{ fontSize: "12px", fontWeight: "bold", color: hetHang ? "#ef4444" : "#16a34a" }}>
                      {hetHang ? "Tạm hết hàng" : `Kho [${sizeHienTai}]: ${tonKhoSizeHienTai}`}
                    </span>
                  </div>

                  <h3 
                    onClick={() => { setSanPhamDangXem(sp); setSoLuongModal(1); setSizeModal("M"); }}
                    style={{ fontSize: "16px", fontWeight: "bold", color: "#0f172a", margin: "0 0 6px 0", cursor: "pointer" }}
                  >
                    {sp.ten}
                  </h3>

                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>Màu: {sp.mau}</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#0f172a", marginBottom: "12px" }}>{sp.gia.toLocaleString("vi-VN")}đ</div>

                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                    {sizeList.map((sz) => {
                      const tonKhoSz = sp.tonKho ? sp.tonKho[sz] || 0 : 0;
                      const isSelected = sz === sizeHienTai;
                      return (
                        <button
                          key={sz}
                          onClick={() => setSizeDangChon((prev) => ({ ...prev, [sp.id]: sz }))}
                          style={{
                            flex: 1, padding: "6px 0", fontSize: "12px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer",
                            background: isSelected ? "#0f172a" : "#f1f5f9",
                            color: isSelected ? "#fff" : tonKhoSz === 0 ? "#cbd5e1" : "#334155",
                            border: "1px solid", borderColor: isSelected ? "#0f172a" : "#e2e8f0",
                            textDecoration: tonKhoSz === 0 ? "line-through" : "none"
                          }}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => themVaoGio(sp)}
                    disabled={hetHang}
                    style={{
                      width: "100%", padding: "10px", background: hetHang ? "#cbd5e1" : "#0f172a", color: "#fff",
                      border: "none", borderRadius: "6px", fontWeight: "bold", cursor: hetHang ? "not-allowed" : "pointer"
                    }}
                  >
                    {hetHang ? "Hết hàng size này" : "Thêm vào giỏ"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal chi tiết sản phẩm */}
        {sanPhamDangXem && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", maxWidth: "800px", width: "100%", padding: "30px", position: "relative", display: "flex", gap: "30px", flexWrap: "wrap" }}>
              <button onClick={() => setSanPhamDangXem(null)} style={{ position: "absolute", top: "15px", right: "15px", background: "#f1f5f9", border: "none", width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}>✕</button>

              <div style={{ flex: "1", minWidth: "260px", background: "#f8fafc", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                <img src={sanPhamDangXem.anh} alt={sanPhamDangXem.ten} style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }} />
              </div>

              <div style={{ flex: "1.2", minWidth: "260px", display: "flex", flexDirection: "column" }}>
                <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold", width: "fit-content", marginBottom: "8px" }}>{sanPhamDangXem.loai}</span>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a", margin: "0 0 8px 0" }}>{sanPhamDangXem.ten}</h2>
                <div style={{ fontSize: "22px", fontWeight: "bold", color: "#2563eb", marginBottom: "15px" }}>{sanPhamDangXem.gia.toLocaleString("vi-VN")}đ</div>
                <div style={{ fontSize: "14px", color: "#64748b", marginBottom: "15px" }}>Màu sắc: <strong>{sanPhamDangXem.mau}</strong></div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "6px" }}>Chọn kích thước: {sizeModal}</label>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {sizeList.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSizeModal(sz)}
                        style={{
                          width: "45px", height: "40px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer",
                          background: sizeModal === sz ? "#0f172a" : "#fff", color: sizeModal === sz ? "#fff" : "#0f172a", border: "1px solid #cbd5e1"
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: "600", display: "block", marginTop: "6px" }}>
                    Tồn kho size {sizeModal}: {sanPhamDangXem.tonKho ? sanPhamDangXem.tonKho[sizeModal] || 0 : 0} sản phẩm
                  </span>
                </div>

                <div style={{ display: "flex", gap: "15px", marginTop: "auto" }}>
                  <div style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "6px", overflow: "hidden", height: "44px" }}>
                    <button onClick={() => setSoLuongModal(q => Math.max(1, q - 1))} style={{ width: "40px", background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: "bold" }}>−</button>
                    <input type="text" value={soLuongModal} readOnly style={{ width: "45px", textAlign: "center", border: "none", fontWeight: "bold" }} />
                    <button onClick={() => setSoLuongModal(q => q + 1)} style={{ width: "40px", background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: "bold" }}>+</button>
                  </div>
                  
                  <button onClick={() => themVaoGioTuModal(sanPhamDangXem)} style={{ flex: 1, background: "#0f172a", color: "#fff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                    THÊM VÀO GIỎ HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Giỏ hàng & Đặt hàng */}
        <section id="gio-hang" style={{ background: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "22px", color: "#0f172a", marginBottom: "20px" }}>Giỏ hàng của bạn</h2>

          {gio.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🛍</div>
              <p>Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginBottom: "20px" }}>
                {gio.map((d) => (
                  <div key={d.dongId} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <img src={d.anh} alt="" style={{ width: "50px", height: "50px", objectFit: "contain", borderRadius: "6px", background: "#f8fafc" }} />
                      <div>
                        <div style={{ fontWeight: "bold", color: "#0f172a" }}>{d.ten}</div>
                        <div style={{ fontSize: "13px", color: "#64748b" }}>Size: {d.size} · Đơn giá: {d.gia.toLocaleString("vi-VN")}đ</div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{ display: "flex", border: "1px solid #cbd5e1", borderRadius: "4px", overflow: "hidden" }}>
                        <button onClick={() => doiSoLuongGio(d.dongId, -1)} style={{ width: "30px", background: "#f1f5f9", border: "none", cursor: "pointer" }}>−</button>
                        <span style={{ width: "35px", textAlign: "center", lineHeight: "28px", fontSize: "14px", fontWeight: "bold" }}>{d.soLuong}</span>
                        <button onClick={() => doiSoLuongGio(d.dongId, 1)} style={{ width: "30px", background: "#f1f5f9", border: "none", cursor: "pointer" }}>+</button>
                      </div>

                      <strong style={{ width: "110px", textAlign: "right" }}>{(d.gia * d.soLuong).toLocaleString("vi-VN")}đ</strong>
                      <button onClick={() => xoaKhoiGio(d.dongId)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "18px", fontWeight: "bold", borderTop: "2px solid #e2e8f0", paddingTop: "15px", marginBottom: "30px" }}>
                <span>Tổng tiền thanh toán:</span>
                <span style={{ color: "#2563eb" }}>{tongTien.toLocaleString("vi-VN")}đ</span>
              </div>
            </>
          )}

          {daDatHang ? (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
              <strong>🎉 Đặt hàng thành công!</strong>
              <p style={{ margin: "5px 0 0 0" }}>Cảm ơn bạn đã mua sắm. Kho đã tự động cập nhật số lượng tồn kho theo đơn hàng của bạn.</p>
            </div>
          ) : (
            gio.length > 0 && (
              <form onSubmit={xuLyDatHang} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", background: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
                <h3 style={{ gridColumn: "1 / -1", margin: "0 0 10px 0", color: "#0f172a" }}>Thông tin nhận hàng</h3>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px" }}>Họ và tên</label>
                  <input type="text" value={hoTen} onChange={(e) => setHoTen(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px" }}>Số điện thoại</label>
                  <input type="text" value={dienThoai} onChange={(e) => setDienThoai(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "5px" }}>Địa chỉ giao hàng chi tiết</label>
                  <input type="text" value={diaChi} onChange={(e) => setDiaChi(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button type="submit" style={{ width: "100%", background: "#16a34a", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}>
                    XÁC NHẬN ĐẶT HÀNG
                  </button>
                </div>
              </form>
            )
          )}
        </section>
      </main>
    </div>
  );
}