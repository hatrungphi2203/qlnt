const nhomthuoc=require("../models/NhomThuoc");

const NhomThuocController={
    //get all DVT
    getAll: async(req,res)=>{
        try {
            
            nhomthuoc.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async(req,res)=>{
        try {
            var id=req.params.id;
            nhomthuoc.delete(id,function(data){
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    },
    adddvt: async(req,res)=>{
        try{
            
            //tạo new
            const newDVT=new DVT({
              maDonVi:req.body.maDonVi,
              tenDonVi:req.body.tenDonVi
              
            });
            
            //lưu về db
            DVT.create(newDVT,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    updatevdt: async(req,res)=>{
        try{
            
            //tạo new
            const newDVT=new DVT({
              maDonVi:req.body.maDonVi,
              tenDonVi:req.body.tenDonVi
              
            });
            
            //lưu về db
            DVT.update(newDVT,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
    
}

module.exports=NhomThuocController;