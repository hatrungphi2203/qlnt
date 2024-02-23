const db = require("../connect/conectDB");
const Thuoc = function (thuoc) {
  this.maSKU = thuoc.maSKU;
  this.maNhom = thuoc.maNhom;
  this.maNhaSanXuat = thuoc.maNhaSanXuat;
  this.maDonVi = thuoc.maDonVi;
  this.tenBietDuoc = thuoc.tenBietDuoc;
  this.soDangKy = thuoc.soDangKy;
  this.hoatChat = thuoc.hoatChat;
  this.donGia = thuoc.donGia;
  this.giaBan = thuoc.giaBan;
  this.hanSuDung = thuoc.hanSuDung;
};
Thuoc.create = function (data, result) {
  db.query("INSERT INTO thuoc SET ?", data, function (err, thuoc) {
    if (err) {
      result(null);
    } else {
      result({ maSKU: thuoc.insertId, ...data });
    }
  });
};
Thuoc.addDS = function (dataList, result) {
  console.log(dataList);
  const values = dataList.map((data) => Object.values(data));
  db.query(
    "INSERT INTO thuoc (maSKU, maNhom, maNhaSanXuat,maDonVi,tenBietDuoc, soDangKy,hoatChat,donGia,giaBan,hanSuDung) VALUES ?",
    [values],
    function (err, res) {
      if (err) {
        console.log(err);
        result(err);
      } else {
        const insertedIds = [];
        for (let i = 0; i < res.affectedRows; i++) {
          insertedIds.push({ maSKU: res.insertId + i, ...dataList[i] });
        }
        result(insertedIds);
      }
    }
  );
};

Thuoc.findBymaSKU = function (name, result) {
  db.query(
    "SELECT * FROM thuoc JOIN kho_thuoc on thuoc.maSKU=kho_thuoc.maSKU ORDER BY ngayHetHan ASC",
    name,
    function (err, thuoc) {
      if (err || thuoc.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        result(thuoc[0]);
      }
    }
  );
};
Thuoc.findBymaSKU2 = function (masku, result) {
  db.query("SELECT * FROM thuoc WHERE maSKU=?", masku, function (err, thuoc) {
    if (err || thuoc.lenght == 0) {
      console.log(err);
      result(null);
    } else {
      console.log(thuoc);
      result(thuoc);
    }
  });
};
Thuoc.findById = function (name, result) {
  db.query("SELECT * FROM thuoc WHERE maSKU=?", name, function (err, thuoc) {
    if (err || thuoc.lenght == 0) {
      console.log(err);
      result(null);
    } else {
      console.log(thuoc[0]);
      result(thuoc[0]);
    }
  });
};
Thuoc.findByTen = function (cn,tenBietDuoc, result) {
  db.query(
    `SELECT * FROM thuoc WHERE tenBietDuoc LIKE '%${tenBietDuoc}%' AND maSKU IN 
    (SELECT DISTINCT kho_thuoc.maSKU FROM chi_tiet_phieu_nhap 
        JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
        JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
        JOIN kho ON kho.maKho = kho_thuoc.maKho 
        JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
        WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
        AND chi_nhanh.tenChiNhanh ="${cn}" AND DATEDIFF(kho_thuoc.ngayHetHan,CURDATE())>180)`,
    function (err, thuoc) {
      if (err || thuoc.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        result(thuoc);
      }
    }
  );
};
// Tìm theo hoạt chất
Thuoc.findByHoatChat = function (cn, hoatChat, result) {
  db.query(
    `SELECT * FROM thuoc WHERE hoatChat LIKE '%${hoatChat}%' AND maSKU IN 
    (SELECT DISTINCT kho_thuoc.maSKU FROM chi_tiet_phieu_nhap 
        JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
        JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
        JOIN kho ON kho.maKho = kho_thuoc.maKho 
        JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
        WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
        AND chi_nhanh.tenChiNhanh ="${cn}" AND DATEDIFF(kho_thuoc.ngayHetHan,CURDATE())>180)`,
    function (err, thuoc) {
      if (err || thuoc.lenght == 0) {
        console.log(err);
        result(null);
      }
      else {
        console.log(thuoc);
        result(thuoc);
      }
    }
  );
};

// Tìm theo nhóm thuốc
Thuoc.findByNhomThuoc = function (cn, nhomthuoc, result) {
  db.query(
    `SELECT thuoc.* FROM nhom_thuoc JOIN thuoc ON nhom_thuoc.maNhom=thuoc.maNhom WHERE tenNhom LIKE '%${nhomthuoc}%' AND maSKU IN 
    (SELECT DISTINCT kho_thuoc.maSKU FROM chi_tiet_phieu_nhap 
        JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
        JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
        JOIN kho ON kho.maKho = kho_thuoc.maKho 
        JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
        WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
        AND chi_nhanh.tenChiNhanh ="${cn}" AND DATEDIFF(kho_thuoc.ngayHetHan,CURDATE())>180)`,
    function (err, thuoc) {
      if (err || thuoc.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        result(thuoc);
      }
    }
  );
};

Thuoc.getAll = function (result) {
  db.query(
    `SELECT thuoc.maSKU,nhom_thuoc.tenNhom,nha_san_xuat.tenNhaSanXuat,don_vi_tinh.tenDonVi,
    thuoc.tenBietDuoc,thuoc.soDangKy,thuoc.hoatChat,thuoc.donGia,thuoc.giaBan,thuoc.hanSuDung 
    FROM thuoc JOIN nhom_thuoc ON nhom_thuoc.maNhom=thuoc.maNhom 
    JOIN nha_san_xuat ON nha_san_xuat.maNhaSanXuat=thuoc.maNhaSanXuat 
    JOIN don_vi_tinh on don_vi_tinh.maDonVi=thuoc.maDonVi`,
    function (err, thuoc) {
      if (err) {
        result(null);
      } else {
        result(thuoc);
      }
    }
  );
};
Thuoc.delete = function (id, result) {
  db.query("DELETE FROM thuoc where maSKU=?;", id, function (err) {
    if (err) {
      result(null);
    } else {
      result("XÓA DỮ LIỆU OKI");
    }
  });
};
Thuoc.update = function (data, result) {
  db.query(
    "UPDATE thuoc SET maNhomThuoc=?,maNhaSanXuat=?,maDonVi=?,hoatChat=?,tenBietDuoc=?,soDangKy=?,giaBan=?,hanSuDung=?,ngaySanXuat=? where maSKU=?",
    [
      data.maNhomThuoc,
      data.maNhaSanXuat,
      data.maDonVi,
      data.hoatChat,
      data.tenBietDuoc,
      data.soDangKy,
      data.giaBan,
      data.hanSuDung,
      data.ngaySanXuat,
      data.maSKU,
    ],
    function (err, thuoc) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        result(data);
      }
    }
  );
};
Thuoc.getThuocSHH = function (result) {
  db.query(
    "SELECT * FROM `thuoc` WHERE DATEDIFF(hanSuDung,CURDATE())<=180",
    function (err, thuoc) {
      if (err) {
        result(null);
      } else {
        result(thuoc);
      }
    }
  );
};

module.exports = Thuoc;

// Thuoc.findByHoatChat=function(name,result){
//     console.log(name.hoatChat);
//     const namePattern = '%' + name.hoatChat + '%';
//     db.query("SELECT * FROM thuoc WHERE hoatChat LIKE ?",namePattern,function(err,thuoc){
//          if(err||thuoc.lenght==0){
//              console.log(err);
//              result(null);

//          }
//         else{
//          result(thuoc);
//         }
//      });
//  }
//  Thuoc.findByNhomThuoc=function(name,result){
//     const namePattern = '%' + name.tenNhom + '%';
//     db.query("SELECT thuoc.* FROM nhom_thuoc JOIN thuoc ON nhom_thuoc.maNhom=thuoc.maNhom WHERE tenNhom LIKE ?",namePattern,function(err,thuoc){
//          if(err||thuoc.lenght==0){
//              console.log(err);
//              result(null);

//          }
//         else{
//          result(thuoc);
//         }
//      });
//  }
