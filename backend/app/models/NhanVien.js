const db = require("../connect/conectDB");
//const User=require("./User");
const NhanVien = function (NhanVien) {
  this.maNhanVien = NhanVien.maNhanVien;
  this.maChiNhanh = NhanVien.maChiNhanh;
  this.cccd = NhanVien.cccd;
  this.tenNhanVien = NhanVien.tenNhanVien;
  this.ngaySinh = NhanVien.ngaySinh;
  this.gioiTinh = NhanVien.gioiTinh;
  this.sdt = NhanVien.sdt;
  this.diaChi = NhanVien.diaChi;
  this.maUser = NhanVien.maUser;
};
NhanVien.getAll = function (result) {
  db.query("SELECT nhan_vien.maNhanVien,chi_nhanh.tenChiNhanh,nhan_vien.cccd,nhan_vien.tenNhanVien,nhan_vien.ngaySinh,nhan_vien.gioiTinh,nhan_vien.sdt,nhan_vien.diaChi,nhan_vien.maUser FROM nhan_vien JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh", function (err, NhanVien) {
    if (err) {
      result(null);
    } else {
      result(NhanVien);
    }
  });
};
NhanVien.getNVC = function (result) {
  db.query("SELECT * FROM nhan_vien", function (err, NhanVien) {
    if (err) {
      result(null);
    } else {
      console.log(NhanVien.lenght);
      result(NhanVien.lenght);
    }
  });
};
NhanVien.findById = function (id, result) {
  db.query(
    "SELECT * FROM nhan_vien where maNhanVien=?",
    id,
    function (err, NhanVien) {
      if (err || NhanVien.lenght == 0) {
        result(null);
      } else {
        result(NhanVien[0]);
      }
    }
  );
};
NhanVien.findByCCCD = function (cccd, result) {
  db.query(
    "SELECT * FROM nhan_vien where cccd=?;",
    cccd,
    function (err, NhanVien) {
      if (err || NhanVien.lenght == 0) {
        result(null);
      } else {
        result(NhanVien[0]);
      }
    }
  );
};
NhanVien.findBySDT = function (sdt, result) {
  db.query(
    "SELECT * FROM nhan_vien where sdt=?;",
    sdt,
    function (err, NhanVien) {
      if (err || NhanVien.lenght == 0) {
        result(null);
      } else {
        result(NhanVien[0]);
      }
    }
  );
};

NhanVien.create = function (data, result) {
  db.query("INSERT INTO nhan_vien SET ?", data, function (err, NhanVien) {
    if (err) {
      console.log(err);
      result(null);
    } else {
      result({ maNhanVien: NhanVien.insertId, ...data });
    }
  });
};

NhanVien.update = function (data, result) {
  console.log(data);
  db.query(
    "UPDATE nhan_vien SET maChiNhanh =?,cccd=?,tenNhanVien=?,ngaySinh=?,gioiTinh=?,sdt=?,diaChi=? WHERE maNhanVien = ?",
    [
      data.maChiNhanh,
      data.cccd,
      data.tenNhanVien,
      data.ngaySinh,
      data.gioiTinh,
      data.sdt,
      data.diaChi,
      data.maNhanVien,
    ],
    function (err, NhanVien) {
      console.log(err);
      if (err) {
        result(null);
      } else {
        result(data);
      }
    }
  );
};
module.exports = NhanVien;
