const PhieuNhap = require("../models/PhieuNhap");
const KhoThuoc = require("../models/KhoThuoc");
const Kho = require("../models/Kho");
const Thuoc = require("../models/Thuoc");
const ChiTietPhieuNhap = require("../models/ChiTietPhieuNhap");
const moment = require("moment-timezone");
const jwt = require("jsonwebtoken");

const PhieuNhapController = {
  getAllPhieuNhap: async (req, res) => {
    try {
      const cn=req.params.cn;
      PhieuNhap.getAll(cn,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getChiTietPhieuNhapSoPhieu: async (req, res) => {
    try {
      console.log(req.params.sophieunhap);
      const cn=req.params.cn;
      const sophieunhap=req.params.sophieunhap;
      ChiTietPhieuNhap.findById(cn,sophieunhap,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addPhieuNhap: async (req, res) => {
    try {
      //tạo new

      const list = req.body;
      const tenChiNhanh = list[0].tenchinhanh;
      console.log(list);
      Kho.findKhoChiNhanh(tenChiNhanh, function (makho) {
        if (makho != null) {
          //lưu về db
          PhieuNhap.create(list, function (data) {
            for (let i = 1; i < list.length; i++) {
              Thuoc.findBymaSKU2(list[i].maSKU, function (thuoc) {
                console.log(thuoc[0].hanSuDung);
                const ngaySanXuat = new Date(list[i].ngaySanXuat);
                const ngayHetHan = new Date(
                  ngaySanXuat.setMonth(ngaySanXuat.getMonth() + thuoc[0].hanSuDung)
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
                  if (data == null) {
                    KhoThuoc.create(kho_thuoc, function (data) {
                      //res.send({result:data});
                    });
                  } else {
                    KhoThuoc.updateSLNhap(kho_thuoc, function (data) {
                      //res.send({result:data});
                    });
                  }
                });
              });
            }
            const sopn = data.soPhieuNhap;
            ChiTietPhieuNhap.create(sopn,list, function (data) {
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
  findSoPhieuNhap: async (req, res) => {
    try {
      const soPN = new PhieuNhap({
        soPhieuNhap: req.body.soPhieuNhap,
      });

      PhieuNhap.findById(soPN, function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePhieuNhap: async (req, res) => {
    try {
      //tạo new
      const newPhieuNhap = new PhieuNhap({
        soPhieuNhap: req.body.soPhieuNhap,
        maSoThue: req.body.maSoThue,
        ngayNhap: req.body.ngayNhap,
        doiTuong: req.body.doiTuong,
        dieuChuyenTu: req.body.dieuChuyenTu,
        dienGiai: req.body.dienGiai,
        loaiChungTu: req.body.loaiChungTu,
      });

      //lưu về db
      PhieuNhap.update(newPhieuNhap, function (data) {
        res.send({ result: data });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = PhieuNhapController;
