const db = require("../connect/conectDB");
const moment = require("moment-timezone");
const HoaDon = function (HoaDon) {
  this.soHoaDon = HoaDon.soHoaDon;
  this.maKhachHang = HoaDon.maKhachHang;
  this.maNhanVien = HoaDon.maNhanVien;
  this.ngay = HoaDon.ngay;
  this.gio = HoaDon.gio;
  this.tongTien = HoaDon.tongTien;
  this.thue = HoaDon.thue;
  this.thanhTien = HoaDon.thanhTien;
};
HoaDon.create = function (maKhachHang, data, result) {
  const VNTime = moment().tz("Asia/Ho_Chi_Minh");
  const formattedDate = VNTime.format("YYYY-MM-DD");
  const formatTime = VNTime.format("HH:mm:ss");
  let tongTien = 0;

  for (let i = 1; i < data.length; i++) {
    tongTien += data[i].soLuong * data[i].donGia;
    console.log(data[i].soLuong * data[i].donGia);
  }
  console.log(tongTien);
  const thue = tongTien * 0.1;
  const thanhtien = tongTien + thue;
  console.log(formattedDate);
  const newHoaDon = new HoaDon({
    maKhachHang: maKhachHang,
    maNhanVien: data[0].maNhanVien,
    ngay: formattedDate,
    gio: formatTime,
    tongTien: tongTien,
    thue: thue,
    thanhTien: thanhtien,
  });
  console.log(newHoaDon);
  db.query("INSERT INTO hoa_don SET ?", newHoaDon, function (err, HoaDon) {
    if (err) {
      console.log(err);
      result(null);
    } else {
      result({ soHoaDon: HoaDon.insertId, ...data });
    }
  });
};
HoaDon.findById = function (name, result) {
  db.query(
    "SELECT * FROM hoa_don WHERE soHoaDon= ?",
    name,
    function (err, HoaDon) {
      if (err || HoaDon.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        result(HoaDon[0]);
      }
    }
  );
};

HoaDon.getAll = function (cn, result) {
  db.query(`SELECT hoa_don.soHoaDon,ngay,gio,khach_hang.tenKhachHang,nhan_vien.tenNhanVien,tongTien,thue,thanhTien FROM hoa_don 
  JOIN khach_hang ON hoa_don.maKhachHang=khach_hang.maKhachHang 
  JOIN nhan_vien ON hoa_don.maNhanVien=nhan_vien.maNhanVien
  JOIN chi_nhanh ON nhan_vien.maChiNhanh=chi_nhanh.maChiNhanh
  WHERE chi_nhanh.tenChiNhanh=?`,cn, 
  function (err, hoaDon) {
    if (err) {
      console.log(err);
      result(null);
    } else {
      console.log(hoaDon);
      result(hoaDon);
    }
  });
};

HoaDon.delete = function (id, result) {
  db.query("DELETE FROM hoa_don where soHoaDon=?;", id, function (err) {
    if (err) {
      result(null);
    } else {
      result("XÓA DỮ LIỆU OKI");
    }
  });
};
///Báo cáo
HoaDon.getBaoCao = function (data, result) {
  db.query(
    `SELECT hoa_don.ngay,hoa_don.gio,chi_tiet_hoa_don.soHoaDon,thuoc.*,
    chi_tiet_hoa_don.soLuong,chi_tiet_hoa_don.donGia,chi_tiet_hoa_don.tongTien,hoa_don.thue,hoa_don.tongTien,
    (chi_tiet_hoa_don.tongTien-thuoc.donGia*chi_tiet_hoa_don.soLuong) as loiNhuan,nhan_vien.tenNhanVien 
    FROM hoa_don JOIN chi_tiet_hoa_don ON chi_tiet_hoa_don.soHoaDon=hoa_don.soHoaDon 
    JOIN thuoc ON chi_tiet_hoa_don.maSKU=thuoc.maSKU JOIN nhan_vien ON nhan_vien.maNhanVien=hoa_don.maNhanVien 
    WHERE hoa_don.ngay BETWEEN ? AND ? ORDER BY hoa_don.ngay DESC`,
    [data.ngayBatDau, data.ngayKetThuc],
    function (err, bc) {
      if (err) {
        result(null);
      } else {
        result(bc);
      }
    }
  );
};
///THEO CHI NHÁNH
HoaDon.getBaoCaoCN = function (data, result) {
  db.query(
    `SELECT hoa_don.ngay,hoa_don.gio,chi_tiet_hoa_don.soHoaDon,thuoc.*,
    chi_tiet_hoa_don.soLuong,chi_tiet_hoa_don.donGia,chi_tiet_hoa_don.tongTien,hoa_don.thue,hoa_don.tongTien,
    (chi_tiet_hoa_don.tongTien-thuoc.donGia*chi_tiet_hoa_don.soLuong) as loiNhuan,nhan_vien.tenNhanVien,chi_nhanh.tenChiNhanh
    FROM hoa_don JOIN chi_tiet_hoa_don ON chi_tiet_hoa_don.soHoaDon=hoa_don.soHoaDon 
    JOIN thuoc ON chi_tiet_hoa_don.maSKU=thuoc.maSKU JOIN nhan_vien ON nhan_vien.maNhanVien=hoa_don.maNhanVien  JOIN chi_nhanh ON nhan_vien.maChiNhanh=chi_nhanh.maChiNhanh
    WHERE chi_nhanh.tenChiNhanh=? AND hoa_don.ngay BETWEEN ? AND ? ORDER BY hoa_don.ngay DESC`,
    [data.tenChiNhanh, data.ngayBatDau, data.ngayKetThuc],
    function (err, bc) {
      if (err) {
        result(null);
      } else {
        result(bc);
      }
    }
  );
};

HoaDon.getAllbaocao = function (result) {
  db.query(
    `SELECT hoa_don.ngay,hoa_don.gio,chi_tiet_hoa_don.soHoaDon,thuoc.*,
    chi_tiet_hoa_don.soLuong,chi_tiet_hoa_don.donGia,chi_tiet_hoa_don.tongTien,hoa_don.thue,hoa_don.tongTien,
    (chi_tiet_hoa_don.tongTien-thuoc.donGia*chi_tiet_hoa_don.soLuong) as loiNhuan,nhan_vien.tenNhanVien,chi_nhanh.tenChiNhanh
    FROM hoa_don JOIN chi_tiet_hoa_don ON chi_tiet_hoa_don.soHoaDon=hoa_don.soHoaDon 
    JOIN thuoc ON chi_tiet_hoa_don.maSKU=thuoc.maSKU JOIN nhan_vien ON nhan_vien.maNhanVien=hoa_don.maNhanVien  JOIN chi_nhanh ON nhan_vien.maChiNhanh=chi_nhanh.maChiNhanh
    ORDER BY hoa_don.ngay DESC`,
    function (err, bc) {
      if (err) {
        result(null);
      } else {
        result(bc);
      }
    }
  );
};

HoaDon.getAllCN = function (cn,result) {
  db.query(
    `SELECT hoa_don.ngay,hoa_don.gio,chi_tiet_hoa_don.soHoaDon,thuoc.*,
    chi_tiet_hoa_don.soLuong,chi_tiet_hoa_don.donGia,chi_tiet_hoa_don.tongTien,hoa_don.thue,hoa_don.tongTien,
    (chi_tiet_hoa_don.tongTien-thuoc.donGia*chi_tiet_hoa_don.soLuong) as loiNhuan,nhan_vien.tenNhanVien,chi_nhanh.tenChiNhanh
    FROM hoa_don JOIN chi_tiet_hoa_don ON chi_tiet_hoa_don.soHoaDon=hoa_don.soHoaDon 
    JOIN thuoc ON chi_tiet_hoa_don.maSKU=thuoc.maSKU JOIN nhan_vien ON nhan_vien.maNhanVien=hoa_don.maNhanVien  JOIN chi_nhanh ON nhan_vien.maChiNhanh=chi_nhanh.maChiNhanh
    WHERE chi_nhanh.tenChiNhanh=? ORDER BY hoa_don.ngay DESC`,cn,
    function (err, bc) {
      if (err) {
        result(null);
      } else {
        result(bc);
      }
    }
  );
};
module.exports = HoaDon;
