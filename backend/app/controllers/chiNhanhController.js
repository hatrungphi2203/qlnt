const ChiNhanh= require("../models/ChiNhanh");
const jwt=require("jsonwebtoken");

const ChiNhanhController={
    getAllChiNhanh: async(req,res)=>{
        try {
            
            ChiNhanh.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getDSNhanVien: async(req,res)=>{
        try {
            
            ChiNhanh.getNhanVien(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },

    addChiNhanh: async(req,res)=>{
        try{
            //tạo new
            const newChiNhanh=new ChiNhanh({
                tenChiNhanh: req.body.tenChiNhanh,
                diaChi: req.body.diaChi,
                sdt:req.body.sdt
            });
            
            //lưu về db
            ChiNhanh.create(newChiNhanh,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    findMaChiNhanh: async(req,res)=>{
        try {
            const soPN=new ChiNhanh({
                soChiNhanh:req.body.soChiNhanh
            });
            
            ChiNhanh.findById(soPN,function(data){
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateChiNhanh: async(req,res)=>{
        try{
            
            //tạo new
            const newChiNhanh=new ChiNhanh({
                maChiNhanh: req.body.maChiNhanh,
                tenChiNhanh: req.body.tenChiNhanh,
                diaChi: req.body.diaChi,
                sdt:req.body.sdt
            });
            
            //lưu về db
            ChiNhanh.update(newChiNhanh,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },

}
module.exports=ChiNhanhController;