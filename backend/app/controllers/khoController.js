const Kho= require("../models/Kho");
const jwt=require("jsonwebtoken");
const kho_thuoc=require("../models/KhoThuoc");
const KhoController={
    getAllKho: async(req,res)=>{
        try {
            kho_thuoc.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllChiNhanhkho: async(req,res)=>{
        try {
            const chinhanh=req.params.chinhanh;
            kho_thuoc.getAll1ChiNhanhKho(chinhanh,function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllKho1ChiNhanh: async(req,res)=>{
        try {
            const chinhanh=req.params.chinhanh;
            
            kho_thuoc.getAll1ChiNhanh(chinhanh,function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAllKho1ChiNhanhGanHH: async(req,res)=>{
        try {
            const chinhanh=req.params.chinhanh;
            
            kho_thuoc.getAll1ChiNhanhGanHH(chinhanh,function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getSoLo: async(req,res)=>{
        try {
            const soLo=req.params.soLo;
            
            kho_thuoc.getSoLo(soLo,function(soLo){
                res.status(200).json(soLo);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },


    addKho: async(req,res)=>{
        try{
            
            //tạo new
            
            const newKho=new Kho({
                maChiNhanh: req.body.maChiNhanh,
                diaChi: req.body.diaChi
            });
            
            //lưu về db
            Kho.create(newKho,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    findMaKho: async(req,res)=>{
        try {
            const soPN=new Kho({
                soKho:req.body.soKho
            });
            
            Kho.findById(soPN,function(data){
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    

}
module.exports=KhoController;