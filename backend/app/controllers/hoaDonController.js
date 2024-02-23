const HoaDon = require("../models/HoaDon");
const ChiTietHoaDon = require("../models/ChiTietHoaDon");
const KhoThuoc = require("../models/KhoThuoc");
const Kho = require("../models/Kho");
const Thuoc = require("../models/Thuoc");
const KhachHang = require("../models/KhachHang");
const HoaDonController = {
  getAllHoaDon: async (req, res) => {
    try {
      const cn=req.params.cn;
      console.log(cn);
      HoaDon.getAll(cn,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllChiTietHoaDon: async (req, res) => {
    try {
      const soHD=req.params.soHD;
      ChiTietHoaDon.getAll(soHD,function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addHoaDon: async (req, res) => {
    try {
      //tạo new
      const list = req.body;
      const tenChiNhanh = list[0].tenchinhanh;
      console.log(tenChiNhanh);
      Kho.findKhoChiNhanh(tenChiNhanh, function (makho) {
        if (makho != null) {
          KhachHang.getBySDT(list[0].sdtKH, function (makh) {
            HoaDon.create(makh[0].maKhachHang, list, function (hoadon) {
              for (let i = 1; i < list.length; i++) {
                Thuoc.findBymaSKU2(list[i].maSKU, function (data) {
                  let ngayGio = new Date(list[i].ngayHetHan);
                  ngayGio.setHours(ngayGio.getHours() + 7);
                  const ngayHetHan = ngayGio.toISOString().slice(0, 10);
                  const kho_thuoc = new KhoThuoc({
                    maSKU: list[i].maSKU,
                    maKho: makho[0].maKho,
                    soLuong: list[i].soLuong,
                    ngayHetHan: ngayHetHan,
                  });
                  KhoThuoc.updateXuat(kho_thuoc, function (data) {
                    //res.send({result:data});
                  });
                });
              }
              const soHD = hoadon.soHoaDon;
              ChiTietHoaDon.create(soHD, list, function (data) {
                res.send({ result: data });
              });
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
  findSoHoaDon: async (req, res) => {
    try {
      const soPN = new HoaDon({
        soHoaDon: req.body.soHoaDon,
      });

      HoaDon.findById(soPN, function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateHoaDon: async (req, res) => {
    try {
      //tạo new
      const newHoaDon = new HoaDon({
        ///
      });

      //lưu về db
      HoaDon.update(newHoaDon, function (data) {
        res.send({ result: data });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = HoaDonController;
