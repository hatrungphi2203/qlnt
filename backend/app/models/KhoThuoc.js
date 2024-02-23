const db = require("../connect/conectDB");
const moment = require("moment-timezone");
const KhoThuoc = function (KhoThuoc) {
  this.maSKU = KhoThuoc.maSKU;
  this.maKho = KhoThuoc.maKho;
  this.soLuong = KhoThuoc.soLuong;
  this.ngayHetHan = KhoThuoc.ngayHetHan;
};
KhoThuoc.create = function (data, result) {
  db.query("INSERT INTO kho_thuoc SET ?", data, function (err, khothuoc) {
    if (err) {
      console.log(err);
      result(null);
    } else {
      result({ maKho: khothuoc.insertId, ...data });
    }
  });
};
KhoThuoc.addDS = function (data, result) {
  const values = data.map((data) => Object.values(data));
  db.query(
    "INSERT INTO kho_thuoc (maSKU, maKho, soLuong,ngayHetHan) VALUES ?",
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

KhoThuoc.findByThuocNhap = function (dataList, result) {
  console.log(dataList);
  db.query(
    "SELECT * FROM kho_thuoc WHERE maSKU=? AND ngayHetHan=? AND maKho=?",
    [dataList.maSKU, dataList.ngayHetHan, dataList.maKho],
    function (err, khothuoc) {
      if (err || khothuoc.lenght == 0) {
        console.log(err);
        result(null);
      } else {
        console.log(khothuoc);
        result(khothuoc[0]);
      }
    }
  );
};
KhoThuoc.getAll = function (result) {
  db.query(
    `SELECT DISTINCT kho_thuoc.maSKU,thuoc.tenBietDuoc,
    kho_thuoc.ngayHetHan,DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) AS ngaySanXuat,
    kho_thuoc.soLuong,thuoc.giaBan, chi_nhanh.tenChiNhanh FROM chi_tiet_phieu_nhap 
    JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
    JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
    JOIN kho ON kho.maKho = kho_thuoc.maKho 
    JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
    WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
    ORDER BY kho_thuoc.ngayHetHan ASC`,
    function (err, khothuoc) {
      if (err) {
        result(null);
      } else {
        result(khothuoc);
      }
    }
  );
};

KhoThuoc.getAll1ChiNhanhKho = function (data, result) {
  db.query(
    `SELECT DISTINCT kho_thuoc.maSKU,thuoc.tenBietDuoc,
    kho_thuoc.ngayHetHan,DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) AS ngaySanXuat,
    kho_thuoc.soLuong,thuoc.giaBan FROM chi_tiet_phieu_nhap 
    JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
    JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
    JOIN kho ON kho.maKho = kho_thuoc.maKho 
    JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
    WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
    AND chi_nhanh.tenChiNhanh =? ORDER BY kho_thuoc.ngayHetHan ASC`,
    data,
    function (err, khothuoc) {
      if (err) {
        result(null);
      } else {
        result(khothuoc);
      }
    }
  );
};

KhoThuoc.getAll1ChiNhanh = function (data, result) {
  db.query(
    `SELECT DISTINCT kho_thuoc.maSKU,thuoc.tenBietDuoc,
    kho_thuoc.ngayHetHan,DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) AS ngaySanXuat,
    kho_thuoc.soLuong,thuoc.giaBan FROM chi_tiet_phieu_nhap 
    JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
    JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
    JOIN kho ON kho.maKho = kho_thuoc.maKho 
    JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
    WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
    AND chi_nhanh.tenChiNhanh =? AND DATEDIFF(kho_thuoc.ngayHetHan,CURDATE())>180 ORDER BY kho_thuoc.ngayHetHan ASC`,
    data,
    function (err, khothuoc) {
      if (err) {
        result(null);
      } else {
        result(khothuoc);
      }
    }
  );
};

KhoThuoc.getAll1ChiNhanhGanHH = function (data, result) {
  db.query(
    `SELECT DISTINCT kho_thuoc.maSKU,thuoc.tenBietDuoc,
    kho_thuoc.ngayHetHan,DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) AS ngaySanXuat,
    kho_thuoc.soLuong,thuoc.giaBan FROM chi_tiet_phieu_nhap 
    JOIN thuoc ON thuoc.maSKU = chi_tiet_phieu_nhap.maSKU 
    JOIN kho_thuoc ON thuoc.maSKU = kho_thuoc.maSKU 
    JOIN kho ON kho.maKho = kho_thuoc.maKho 
    JOIN chi_nhanh ON kho.maChiNhanh = chi_nhanh.maChiNhanh 
    WHERE DATE_SUB(kho_thuoc.ngayHetHan, INTERVAL thuoc.hanSuDung MONTH) = chi_tiet_phieu_nhap.ngaySanXuat 
    AND chi_nhanh.tenChiNhanh ="CN_Q7" AND DATEDIFF(kho_thuoc.ngayHetHan,CURDATE())<=180 ORDER BY kho_thuoc.ngayHetHan ASC`,
    data,
    function (err, khothuoc) {
      if (err) {
        result(null);
      } else {
        result(khothuoc);
      }
    }
  );
};

KhoThuoc.getSoLo = function (masku, result) {
  db.query(
    "SELECT DISTINCT soLo FROM chi_tiet_phieu_nhap WHERE maSKU=?",
    masku,
    function (err, sl) {
      if (err) {
        result(null);
      } else {
        result(sl);
      }
    }
  );
};

KhoThuoc.updateSLNhap = function (datalist, result) {
  db.query(
    "UPDATE kho_thuoc SET soLuong=(kho_thuoc.soLuong+ ?) where maSKU=? AND ngayHetHan=? AND maKho=?",
    [datalist.soLuong, datalist.maSKU, datalist.ngayHetHan, datalist.maKho],
    function (err, kho_thuoc) {
      if (err) {
        console.log(err);
        result(null, err);
      } else {
        console.log("okiiii");
        result(null, kho_thuoc);
      }
    }
  );
};

KhoThuoc.updateXuat = function (dataList, result) {
  console.log(dataList);
  db.query(
    "UPDATE kho_thuoc SET soLuong=(kho_thuoc.soLuong-?) where maSKU=? AND ngayHetHan=? AND maKho=?",
    [dataList.soLuong, dataList.maSKU, dataList.ngayHetHan, dataList.maKho],
    function (err, kho_thuoc) {
      if (err) {
        console.log(err);
        result(null);
      } else {
        console.log("okiiii");
        result(null, kho_thuoc);
      }
    }
  );
};

KhoThuoc.findByNgay = function (masku, soLo, result) {
  db.query(
    "SELECT * FROM kho_thuoc WHERE maSKU= ? AND ngayHetHan=?",
    [masku, soLo],
    function (err, khothuoc) {
      if (err || khothuoc.lenght == 0) {
        result(null);
      } else {
        console.log(khothuoc);
        result(khothuoc[0]);
      }
    }
  );
};
module.exports = KhoThuoc;
