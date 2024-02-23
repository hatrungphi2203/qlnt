const HoaDon= require("../models/HoaDon");
const jwt=require("jsonwebtoken");
const moment = require("moment-timezone");
const BaoCaoController={
getDoanhThu: async(req,res)=>{
    try {
        const ngay =req.body;
        HoaDon.getBaoCao(ngay,function(data){
            res.status(200).json(data);
        })

    } catch (error) {
        res.status(500).json(error);
    }
},
getDoanhThucn: async(req,res)=>{
  try {
      const datacn =req.body;
      HoaDon.getBaoCaoCN(datacn,function(data){
          res.status(200).json(data);
      })

  } catch (error) {
      res.status(500).json(error);
  }
},
getAll: async(req,res)=>{
    try {
        HoaDon.getAllbaocao(function (data) {
          res.status(200).json(data);
        });
      } catch (error) {
        res.status(500).json(error);
      }
},
getAllcn: async(req,res)=>{
    try {

        HoaDon.getAllCN(req.params.cn,function (data) {
          res.status(200).json(data);
        });
      } catch (error) {
        res.status(500).json(error);
      }
},
}
module.exports=BaoCaoController;