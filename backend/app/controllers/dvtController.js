const DVT=require("../models/DonViTinh");

const DVTController={
    //get all DVT
    getAllDVT: async(req,res)=>{
        try {
            
            DVT.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteDVT: async(req,res)=>{
        try {
            var id=req.params.id;
            DVT.delete(id,function(data){
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

module.exports=DVTController;