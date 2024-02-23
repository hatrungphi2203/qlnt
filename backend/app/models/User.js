const db = require("../connect/conectDB");
const user = function (user) {
  this.maUser = user.maUser;
  this.sdt = user.sdt;
  this.matKhau = user.matKhau;
  this.role = user.role;
};
user.create = function (data, result) {
  db.query(
    "INSERT INTO `user` (`maUser`, `sdt`, `matKhau`, `role`) VALUES (NULL, ?, ?, ?);",
    [data.sdt, data.matKhau, data.role],
    function (err, user) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        db.query(
          "SELECT * FROM user WHERE maUser = ?",
          user.insertId,
          function (err, user) {
            if (err) {
              result(err);
            } else {
              result(user[0]);
            }
          }
        );
      }
    }
  );
};

user.findBySDT = function (name, result) {
  db.query("SELECT * FROM user WHERE SDT = ?", name, function (err, user) {
    if (err || user.lenght == 0) {
      console.log(err);
      result(null);
    } else {
      result(user[0]);
    }
  });
};
user.findBySDT2 = function (sdt, result) {
  db.query("SELECT * FROM user WHERE sdt=?",sdt,
  function (err, user) {
    if (err || user.lenght == 0) {
      console.log(err);
      result(null);
    } else {
      if(user[0].role=="admin"){
        result(user[0]);
      }else{
        db.query(
          "SELECT user.maUser,user.sdt,user.role,chi_nhanh.tenChiNhanh,nhan_vien.maNhanVien,nhan_vien.tenNhanVien FROM user JOIN nhan_vien ON nhan_vien.maUser=user.maUser JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh WHERE user.sdt = ?",
          sdt,
          function (err, user) {
            if (err || user.lenght == 0) {
              console.log(err);
              result(null);
            } else {
              result(user[0]);
            }
          }
        );
      }
    }
  });
  
};

user.getList = function (result) {
  db.query(
    "SELECT nhan_vien.tenNhanVien, user.sdt ,chi_nhanh.tenChiNhanh FROM user JOIN nhan_vien ON nhan_vien.maUser=user.maUser JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh",
    function (err, user) {
      if (err) {
        result(null);
      } else {
        result(user);
      }
    }
  );
};
// user.delete = function (id, result) {
//   db.query("DELETE FROM user where maNhanVien=?;", id, function (err) {
//     if (err) {
//       result(null);
//     } else {
//       result("XÓA DỮ LIỆU OKI");
//     }
//   });
// };

module.exports = user;
