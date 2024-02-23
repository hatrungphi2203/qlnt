const moment = require("moment-timezone");
const db = require("../connect/conectDB");
const PhieuXuat = function (PhieuXuat) {
  this.soPhieuXuat = PhieuXuat.soPhieuXuat;
  this.maNhanVien = PhieuXuat.maNhanVien;
  this.maSoThue = PhieuXuat.maSoThue;
  this.ngayXuat = PhieuXuat.ngayXuat;
  this.doiTuong = PhieuXuat.doiTuong;
  this.dieuChuyenToi = PhieuXuat.dieuChuyenToi;
  this.dienGiai = PhieuXuat.dienGiai;
  this.loaiChungTu = PhieuXuat.loaiChungTu;
};
PhieuXuat.create = function (data, result) {
  const VNTime = moment().tz("Asia/Ho_Chi_Minh");
  const formattedDate = VNTime.format("YYYY-MM-DD HH:mm:ss");
  console.log(data[0]);
  const newPhieuXuat = new PhieuXuat({
    maNhanVien: data[0].maNhanVien,
    maSoThue: data[0].maSoThue,
    ngayXuat: formattedDate,
    doiTuong: data[0].doiTuong,
    dieuChuyenToi: data[0].dieuChuyenToi,
    dienGiai: data[0].dienGiai,
    loaiChungTu: data[0].loaiChungTu,
  });
  console.log(newPhieuXuat);
  db.query(
    "INSERT INTO phieu_xuat SET ?",
    newPhieuXuat,
    function (err, PhieuXuat) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        result({ soPhieuXuat: PhieuXuat.insertId, ...data });
      }
    }
  );
};
PhieuXuat.getAll = function (cn,result) {
  db.query("SELECT * FROM phieu_xuat WHERE phieu_xuat.maNhanVien IN (SELECT nhan_vien.maNhanVien FROM nhan_vien JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh WHERE chi_nhanh.tenChiNhanh=?)",cn, function (err, phieuxuat) {
    if (err) {
      result(null);
    } else {
      result(phieuxuat);
    }
  });
};

PhieuXuat.delete = function (id, result) {
  db.query("DELETE FROM phieu_xuat where soPhieuXuat=?;", id, function (err) {
    if (err) {
      result(null);
    } else {
      result("XÓA DỮ LIỆU OKI");
    }
  });
};
PhieuXuat.update = function (data, result) {
  db.query(
    "UPDATE phieu_xuat SET maSoThue=?,ngayXuat=?,doiTuong=?,dieuChuyenToi=?,dienGiai=?,loaiChungTu=? where soPhieuXuat=?",
    [
      data.maSoThue,
      data.ngayXuat,
      data.doiTuong,
      data.dieuChuyenToi,
      data.dienGiai,
      data.loaiChungTu,
      data.soPhieuXuat,
    ],
    function (err, PhieuXuat) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        result(data);
      }
    }
  );
};
module.exports = PhieuXuat;
