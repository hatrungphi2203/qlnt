const moment = require("moment-timezone");
const db = require("../connect/conectDB");
const PhieuNhap = function (PhieuNhap) {
  this.soPhieuNhap = PhieuNhap.soPhieuNhap;
  this.maNhanVien = PhieuNhap.maNhanVien;
  this.maSoThue = PhieuNhap.maSoThue;
  this.ngayNhap = PhieuNhap.ngayNhap;
  this.doiTuong = PhieuNhap.doiTuong;
  this.dieuChuyenTu = PhieuNhap.dieuChuyenTu;
  this.dienGiai = PhieuNhap.dienGiai;
  this.loaiChungTu = PhieuNhap.loaiChungTu;
};
PhieuNhap.create = function (data, result) {
  const VNTime = moment().tz("Asia/Ho_Chi_Minh");
  const formattedDate = VNTime.format("YYYY-MM-DD HH:mm:ss");
  const newPhieuNhap = new PhieuNhap({
    maNhanVien: data[0].maNhanVien,
    maSoThue: data[0].maSoThue,
    ngayNhap: formattedDate,
    doiTuong: data[0].doiTuong,
    dieuChuyenTu: data[0].dieuChuyenTu,
    dienGiai: data[0].dienGiai,
    loaiChungTu: data[0].loaiChungTu,
  });
  db.query("INSERT INTO phieu_nhap SET ?",newPhieuNhap,function (err, phieunhap) {
      if (err) {
        console.log(err);
        result(null);
        
      } else {
        result({ soPhieuNhap: phieunhap.insertId, ...data });
      }
    }
  );
};
PhieuNhap.findById = function (name, result) {
  db.query(
    "SELECT * FROM phieu_nhap WHERE soPhieuNhap= ?",
    name,
    function (err, phieunhap) {
      if (err || phieunhap.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        result(phieunhap[0]);
      }
    }
  );
};

PhieuNhap.getAll = function (cn,result) {
  db.query("SELECT * FROM phieu_nhap WHERE phieu_nhap.maNhanVien IN (SELECT nhan_vien.maNhanVien FROM nhan_vien JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh WHERE chi_nhanh.tenChiNhanh=?)",cn, function (err, phieunhap) {
    if (err) {
      result(null);
    } else {
      result(phieunhap);
    }
  });
};
PhieuNhap.delete = function (id, result) {
  db.query("DELETE FROM phieu_nhap where soPhieuNhap=?;", id, function (err) {
    if (err) {
      result(null);
    } else {
      result("XÓA DỮ LIỆU OKI");
    }
  });
};
PhieuNhap.update = function (data, result) {
  db.query(
    "UPDATE phieu_nhap SET maSoThue=?,ngayNhap=?,doiTuong=?,dieuChuyenTu=?,dienGiai=?,loaiChungTu=? where soPhieuNhap=?",
    [
      data.maSoThue,
      data.ngayNhap,
      data.doiTuong,
      data.dieuChuyenTu,
      data.dienGiai,
      data.loaiChungTu,
      data.soPhieuNhap,
    ],
    function (err, PhieuNhap) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        result(data);
      }
    }
  );
};
module.exports = PhieuNhap;
