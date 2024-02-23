const PhieuXuat = require("../models/PhieuXuat");
const ChiTietPhieuXuat = require("../models/ChiTietPhieuXuat");
const KhoThuoc = require("../models/KhoThuoc");
const Kho = require("../models/Kho");
const Thuoc = require("../models/Thuoc");
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");

const PhieuXuatController = {
  getAllPhieuxuat: async (req, res) => {
    try {
      const cn=req.params.cn;
      PhieuXuat.getAll(cn,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getChiTietPhieuxuatSoPhieu: async (req, res) => {
    try {
      console.log(req.params);
      const cn=req.params.cn;
      const sophieuxuat=req.params.sophieuxuat;
      ChiTietPhieuXuat.findById(cn,sophieuxuat,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addPhieuXuat: async (req, res) => {
    try {
      //tạo new
      const list = req.body;
      const tenChiNhanh = list[0].tenchinhanh;
      console.log(tenChiNhanh);
      Kho.findKhoChiNhanh(tenChiNhanh, function (makho) {
        if (makho != null) {
          //lưu về db
          PhieuXuat.create(list, function (data) {
            for (let i = 1; i < list.length; i++) {
              Thuoc.findBymaSKU2(list[i].maSKU, function (thuoc) {
                console.log(thuoc[0].hanSuDung);
                const ngaySanXuat = new Date(list[i].ngaySanXuat);
                const ngayHetHan = new Date(
                  ngaySanXuat.setMonth(
                    ngaySanXuat.getMonth() + thuoc[0].hanSuDung
                  )
                );
                const formattedNgayHetHan = moment
                  .tz(ngayHetHan, "Asia/Ho_Chi_Minh")
                  .format("YYYY-MM-DD");
                const kho_thuoc = new KhoThuoc({
                  maSKU: list[i].maSKU,
                  maKho: makho[0].maKho,
                  soLuong: list[i].soLuong,
                  ngayHetHan: formattedNgayHetHan,
                });
                KhoThuoc.findByThuocNhap(kho_thuoc, function (data) {
                  if (data != null) {
                    KhoThuoc.updateXuat(kho_thuoc, function (data) {
                      //res.send({result:data});
                    });
                  } else {
                    res.send("không có thuốc trong kho");
                  }
                });
              });
            }
            const sopn = data.soPhieuXuat;
            ChiTietPhieuXuat.create(sopn, list, function (data) {
              res.send({ result: data });
            });
          });
        } else {
          res.send("Lỗi không tìm thấy kho");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  findSoPhieuXuat: async (req, res) => {
    try {
      const soPN = new PhieuXuat({
        soPhieuXuat: req.body.soPhieuXuat,
      });

      PhieuXuat.findById(soPN, function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePhieuXuat: async (req, res) => {
    try {
      //tạo new
      const newPhieuXuat = new PhieuXuat({
        soPhieuXuat: req.body.soPhieuXuat,
        maSoThue: req.body.maSoThue,
        ngayXuat: req.body.ngayXuat,
        doiTuong: req.body.doiTuong,
        dieuChuyenToi: req.body.dieuChuyenToi,
        dienGiai: req.body.dienGiai,
        loaiChungTu: req.body.loaiChungTu,
      });

      //lưu về db
      PhieuXuat.update(newPhieuXuat, function (data) {
        res.send({ result: data });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = PhieuXuatController;
