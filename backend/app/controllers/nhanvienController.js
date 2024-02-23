require('dotenv').config();
const NhanVien = require("../models/NhanVien");
const ChiNhanh = require("../models/ChiNhanh");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nhanvienController = {
  getAllNhanVien: async (req, res) => {
    try {
      NhanVien.getAll(function (data) {
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addNhanVien: async (req, res) => {
     try {
      const sdt = req.body.sdt.toString();
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(sdt, salt);
      NhanVien.findByCCCD(req.body.cccd, function (data) {
        if (data != null) {
          res.send("ĐÃ CÓ cccd");
        } else {
          NhanVien.findBySDT(req.body.sdt, function (data) {
            if (data != null) {
              res.send("đã có số điện thoại");
            } else {
              //tạo new
              const newUser = new User({
                sdt: req.body.sdt,
                matKhau: hashed,
                role: "nhanvien",
              });
              console.log(newUser);
              User.create(newUser, function (user) {
                console.log(user);
                const maUser = user.maUser;
                ChiNhanh.findByTen(req.body.tenChiNhanh, function (cn) {
                  const newNV = new NhanVien({
                    maChiNhanh: cn.maChiNhanh,
                    cccd: req.body.cccd,
                    tenNhanVien: req.body.tenNhanVien,
                    ngaySinh: req.body.ngaySinh,
                    gioiTinh: req.body.gioiTinh,
                    sdt: req.body.sdt,
                    diaChi: req.body.diaChi,
                    maUser: maUser,
                  });
                  //lưu về db
                  NhanVien.create(newNV, function (data) {
                    res.send({ result: data });
                  });
                });
              });
            }
          });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateNhanVien: async (req, res) => {
    try {
      NhanVien.findById(req.body.maNhanVien, function (data) {
        if (data != null) {
          //tạo new
          ChiNhanh.findByTen(req.body.tenChiNhanh, function (cn) {
            const newNV = new NhanVien({
              maNhanVien: req.body.maNhanVien,
              maChiNhanh: cn.maChiNhanh,
              cccd: req.body.cccd,
              tenNhanVien: req.body.tenNhanVien,
              ngaySinh: req.body.ngaySinh,
              gioiTinh: req.body.gioiTinh,
              sdt: req.body.sdt,
              diaChi: req.body.diaChi,
            });
            //lưu về db
            NhanVien.update(newNV, function (data) {
              res.send({ result: data });
            });
          });
        } else {
          res.send("Chưa có nhân viên");
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMotNhanVien: async (req, res) => {
    try {
      const maNV = parseInt(req.params.id);
      console.log(maNV);
      NhanVien.findById(maNV, function (data) {
        console.log(data);
        res.status(200).json(data);
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = nhanvienController;
