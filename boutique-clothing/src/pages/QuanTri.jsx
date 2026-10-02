import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  const [tabDangChon, setTabDangChon] = useState("sanPham"); // "sanPham" hoặc "donHang"

  // Modal thêm/sửa sản phẩm
  const [hienModalSP, setHienModalSP] = useState(false);
  const [spDangSua, setSpDangSua] = useState(null);
  const [tenSP, setTenSP] = useState("");
  const [loaiSP, setLoaiSP] = useState("Áo thun");
  const [giaSP, setGiaSP] = useState("");
  const [mauSP, setMauSP] = useState("");
  const [anhSP, setAnhSP] = useState("");
  const [khoS, setKhoS] = useState(0);
  const [khoM, setKhoM] = useState(0);
  const [khoL, setKhoL] = useState(0);
  const [khoXL, setKhoXL] = useState(0);

  useEffect(() => {
    const laAdmin = localStorage.getItem("laAdmin");
    if (laAdmin !== "true") {
      alert("⚠️ Bạn không có quyền truy cập trang Quản trị!");
      navigate("/dang-nhap");
      return;
    }

    const luuTruSP = localStorage.getItem("danhSachSanPhamKho");
    if (luuTruSP) {
      setDanhSachSanPham(JSON.parse(luuTruSP));
    }

    const luuTruDH = localStorage.getItem("danhSachDonHang");
    if (luuTruDH) {
      setDanhSachDonHang(JSON.parse(luuTruDH));
    }
  }, [navigate]);

  // Lưu danh sách sản phẩm xuống localStorage và trigger sự kiện đồng bộ
  function capNhatKhoLocalStorage(dsMoi) {
    setDanhSachSanPham(dsMoi);
    localStorage.setItem("danhSachSanPhamKho", JSON.stringify(dsMoi));
  }

  function thayDoiKhoNhanh(id, size, giaTriMoi) {
    const soLuong = Math.max(0, parseInt(giaTriMoi) || 0);
    const dsMoi = danhSachSanPham.map((sp) => {
      if (sp.id === id) {
        return {
          ...sp,
          tonKho: { ...sp.tonKho, [size]: soLuong }
        };
      }
      return sp;
    });
    capNhatKhoLocalStorage(dsMoi);
  }

  function xoaSanPham(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      const dsMoi = danhSachSanPham.filter((sp) => sp.id !== id);
      capNhatKhoLocalStorage(dsMoi);
    }
  }

  function moModalThem() {
    setSpDangSua(null);
    setTenSP("");
    setLoaiSP("Áo thun");
    setGiaSP("");
    setMauSP("");
    setAnhSP("");
    setKhoS(10); setKhoM(15); setKhoL(10); setKhoXL(5);
    setHienModalSP(true);
  }

  function moModalSua(sp) {
    setSpDangSua(sp);
    setTenSP(sp.ten);
    setLoaiSP(sp.loai);
    setGiaSP(sp.gia);
    setMauSP(sp.mau);
    setAnhSP(sp.anh);
    setKhoS(sp.tonKho?.S || 0);
    setKhoM(sp.tonKho?.M || 0);
    setKhoL(sp.tonKho?.L || 0);
    setKhoXL(sp.tonKho?.XL || 0);
    setHienModalSP(true);
  }

  function luuSanPham(e) {
    e.preventDefault();
    const tonKhoMoi = { S: Number(khoS), M: Number(khoM), L: Number(khoL), XL: Number(khoXL) };

    if (spDangSua) {
      // Sửa sản phẩm
      const dsMoi = danhSachSanPham.map((sp) => 
        sp.id === spDangSua.id ? { ...sp, ten: tenSP, loai: loaiSP, gia: Number(giaSP), mau: mauSP, anh: anhSP, tonKho: tonKhoMoi } : sp
      );
      capNhatKhoLocalStorage(dsMoi);
    } else {
      // Thêm mới sản phẩm
      const spMoi = {
        id: "sp-" + Date.now(),
        ten: tenSP,
        loai: loaiSP,
        gia: Number(giaSP),
        mau: mauSP,
        anh: anhSP || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80",
        tonKho: tonKhoMoi
      };
      capNhatKhoLocalStorage([spMoi, ...danhSachSanPham]);
    }
    setHienModalSP(false);
  }

  function capNhatTrangThaiDon(idDon, trangThaiMoi) {
    const dsMoi = danhSachDonHang.map((dh) => (dh.id === idDon ? { ...dh, trangThai: trangThaiMoi } : dh));
    setDanhSachDonHang(dsMoi);
    localStorage.setItem("danhSachDonHang", JSON.stringify(dsMoi));
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1300px", margin: "0 auto", fontFamily: "sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>⚙️ TRANG QUẢN TRỊ HỆ THỐNG</h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#64748b" }}>Quản lý kho hàng chi tiết và đơn hàng khách mua theo thời gian thực.</p>
        </div>
        <button 
          onClick={() => { localStorage.removeItem("laAdmin"); navigate("/cua-hang"); }}
          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "10px 18px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          Thoát trang Quản trị
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button 
          onClick={() => setTabDangChon("sanPham")}
          style={{ padding: "10px 20px", background: tabDangChon === "sanPham" ? "#0f172a" : "#e2e8f0", color: tabDangChon === "sanPham" ? "#fff" : "#334155", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          📦 Quản lý Tồn kho &amp; Sản phẩm ({danhSachSanPham.length})
        </button>
        <button 
          onClick={() => setTabDangChon("donHang")}
          style={{ padding: "10px 20px", background: tabDangChon === "donHang" ? "#0f172a" : "#e2e8f0", color: tabDangChon === "donHang" ? "#fff" : "#334155", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          🛍 Quản lý Đơn hàng ({danhSachDonHang.length})
        </button>
      </div>

      {tabDangChon === "sanPham" ? (
        <div style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ margin: 0, fontSize: "18px", color: "#0f172a" }}>Danh sách tồn kho theo Size</h2>
            <button onClick={moModalThem} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
              + Thêm sản phẩm mới
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f1f5f9", color: "#475569", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "12px" }}>Ảnh</th>
                <th style={{ padding: "12px" }}>Tên sản phẩm</th>
                <th style={{ padding: "12px" }}>Loại</th>
                <th style={{ padding: "12px" }}>Giá bán</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Kho Size S</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Kho Size M</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Kho Size L</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Kho Size XL</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {danhSachSanPham.map((sp) => (
                <tr key={sp.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px" }}><img src={sp.anh} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} /></td>
                  <td style={{ padding: "10px", fontWeight: "bold", color: "#0f172a" }}>{sp.ten}</td>
                  <td style={{ padding: "10px", color: "#64748b" }}>{sp.loai}</td>
                  <td style={{ padding: "10px", fontWeight: "600" }}>{sp.gia.toLocaleString("vi-VN")}đ</td>
                  
                  {/* Nhập trực tiếp số lượng kho theo từng size */}
                  {["S", "M", "L", "XL"].map((sz) => (
                    <td key={sz} style={{ padding: "10px", textAlign: "center" }}>
                      <input 
                        type="number" 
                        value={sp.tonKho ? sp.tonKho[sz] || 0 : 0} 
                        onChange={(e) => thayDoiKhoNhanh(sp.id, sz, e.target.value)}
                        style={{ width: "55px", padding: "6px", borderRadius: "4px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: "bold" }}
                      />
                    </td>
                  ))}

                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <button onClick={() => moModalSua(sp)} style={{ background: "#e0f2fe", color: "#0369a1", border: "none", padding: "6px 10px", borderRadius: "4px", fontWeight: "600", cursor: "pointer", marginRight: "6px" }}>Sửa</button>
                    <button onClick={() => xoaSanPham(sp.id)} style={{ background: "#fee2e2", color: "#ef4444", border: "none", padding: "6px 10px", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: "#fff", padding: "25px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h2 style={{ margin: "0 0 20px 0", fontSize: "18px", color: "#0f172a" }}>Đơn hàng từ khách hàng</h2>
          {danhSachDonHang.length === 0 ? (
            <p style={{ color: "#64748b" }}>Chưa có đơn hàng nào được đặt.</p>
          ) : (
            danhSachDonHang.map((dh) => (
              <div key={dh.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", marginBottom: "15px", background: "#f8fafc" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <strong>Mã đơn: {dh.id} — Khách hàng: {dh.khachHang} ({dh.sdt})</strong>
                  <span style={{ color: "#64748b", fontSize: "13px" }}>{dh.ngay}</span>
                </div>
                <p style={{ margin: "4px 0", fontSize: "14px", color: "#334155" }}><strong>Địa chỉ:</strong> {dh.diaChi}</p>
                
                <div style={{ margin: "10px 0", fontSize: "14px" }}>
                  <strong>Chi tiết sản phẩm mua:</strong>
                  <ul style={{ margin: "5px 0 0 20px", padding: 0 }}>
                    {dh.sanPham.map((item, idx) => (
                      <li key={idx} style={{ color: "#475569", marginBottom: "3px" }}>
                        {item.ten} (Size: <strong style={{ color: "#0f172a" }}>{item.size}</strong>) x {item.soLuong} — {(item.gia * item.soLuong).toLocaleString("vi-VN")}đ
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", borderTop: "1px dashed #cbd5e1", paddingTop: "12px" }}>
                  <span>Tổng tiền: <strong style={{ color: "#2563eb", fontSize: "16px" }}>{dh.tongTien.toLocaleString("vi-VN")}đ</strong></span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>Trạng thái:</span>
                    <select 
                      value={dh.trangThai} 
                      onChange={(e) => capNhatTrangThaiDon(dh.id, e.target.value)}
                      style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontWeight: "bold", background: "#fff" }}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đang giao">Đang giao hàng</option>
                      <option value="Đã giao">Đã giao thành công</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal Thêm / Sửa Sản Phẩm */}
      {hienModalSP && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1200, padding: "20px" }}>
          <div style={{ background: "#fff", borderRadius: "12px", width: "100%", maxWidth: "550px", padding: "30px", position: "relative" }}>
            <button onClick={() => setHienModalSP(false)} style={{ position: "absolute", top: "15px", right: "15px", background: "#f1f5f9", border: "none", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer", fontWeight: "bold" }}>✕</button>
            <h2 style={{ margin: "0 0 20px 0", fontSize: "20px" }}>{spDangSua ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
            
            <form onSubmit={luuSanPham} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Tên sản phẩm</label>
                <input type="text" value={tenSP} onChange={(e) => setTenSP(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Loại</label>
                  <input type="text" value={loaiSP} onChange={(e) => setLoaiSP(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Giá bán (VNĐ)</label>
                  <input type="number" value={giaSP} onChange={(e) => setGiaSP(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Màu sắc</label>
                  <input type="text" value={mauSP} onChange={(e) => setMauSP(e.target.value)} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Link ảnh sản phẩm</label>
                  <input type="text" value={anhSP} onChange={(e) => setAnhSP(e.target.value)} placeholder="https://..." style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: "13px", fontWeight: "600", display: "block", marginBottom: "5px" }}>Số lượng tồn kho ban đầu theo Size</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>Size S</span>
                    <input type="number" value={khoS} onChange={(e) => setKhoS(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: "bold" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>Size M</span>
                    <input type="number" value={khoM} onChange={(e) => setKhoM(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: "bold" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>Size L</span>
                    <input type="number" value={khoL} onChange={(e) => setKhoL(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: "bold" }} />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "#64748b" }}>Size XL</span>
                    <input type="number" value={khoXL} onChange={(e) => setKhoXL(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", textAlign: "center", fontWeight: "bold" }} />
                  </div>
                </div>
              </div>

              <button type="submit" style={{ marginTop: "10px", background: "#0f172a", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>
                {spDangSua ? "Lưu thay đổi" : "Thêm mới sản phẩm"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}