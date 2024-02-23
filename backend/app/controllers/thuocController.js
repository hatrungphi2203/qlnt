const Thuoc = require("../models/Thuoc");
const NhomThuoc = require("../models/NhomThuoc");
const jwt = require("jsonwebtoken");

const ThuocController = {
    getAllThuoc: async (req, res) => {
        try {

            Thuoc.getAll(function (data) {
                res.status(200).json(data);
            })


        } catch (error) {
            res.status(500).json(error);
        }
    },

    addThuoc: async (req, res) => {
        try {

            //tạo new
            const newThuoc = new Thuoc({
                maSKU: req.body.maSKU,
                maNhom: req.body.maNhom,
                maNhaSanXuat: req.body.maNhaSanXuat,
                maDonVi: req.body.maDonVi,
                tenBietDuoc: req.body.tenBietDuoc,
                soDangKy: req.body.soDangKy,
                hoatChat: req.body.hoatChat,
                donGia: req.body.donGia,
                giaBan: req.body.giaBan,
                hanSuDung: req.body.hanSuDung

            });

            //lưu về db
            Thuoc.create(newThuoc, function (data) {
                res.send({ result: data });
            });


        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    addDSThuoc: async (req, res) => {
        try {

            //tạo new
            const newThuoc = req.body;

            //lưu về db
            Thuoc.addDS(newThuoc, function (data) {
                res.send({ result: data });
            });


        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    findTenThuoc: async (req, res) => {
        try {
            const cn=req.params.cn;
            const tenBietDuoc=req.params.tenBietDuoc;
        
            Thuoc.findByTen(cn,tenBietDuoc, function (data) {
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getThuoc6thg: async (req, res) => {
        try {

            Thuoc.getThuocSHH(function (data) {
                res.status(200).json(data);
            })


        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateThuoc: async (req, res) => {
        try {
            Thuoc.findById(req.body.maSKU, function (data) {
                if (data != null) {
                    const newThuoc = new Thuoc({
                        maSKU: req.body.maSKU,
                        maNhomThuoc: req.body.maNhomThuoc,
                        maNhaSanXuat: req.body.maNhaSanXuat,
                        maDonVi: req.body.maDonVi,
                        hoatChat: req.body.hoatChat,
                        tenBietDuoc: req.body.tenBietDuoc,
                        soDangKy: req.body.soDangKy,
                        giaBan: req.body.giaBan,
                        hanSuDung: req.body.hanSuDung,
                        ngaySanXuat: req.body.ngaySanXuat
                    });

                    //lưu về db
                    Thuoc.update(newThuoc, function (data) {
                        res.send({ result: data });
                    });
                }
                else {
                    res.send("không có thuốc");
                }
            })
            //tạo new



        }
        catch (err) {
            res.status(500).json(err);
        }
    },

    // Tìm theo hoạt chất

    findByHoatChat: async (req, res) => {
        try {
            const cn=req.params.cn;
                const hoatChat=req.params.hoatChat
        
            
            Thuoc.findByHoatChat(cn,hoatChat, function (data) {
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Tìm theo  Nhóm thuốc

    findByNhomThuoc: async (req, res) => {
        try {
            const cn=req.params.cn;
                const nhomthuoc=req.params.nhomThuoc;
                console.log(nhomthuoc);
                

            Thuoc.findByNhomThuoc(cn,nhomthuoc, function (data) {
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },

    //Tìm mã sku
}
module.exports = ThuocController;