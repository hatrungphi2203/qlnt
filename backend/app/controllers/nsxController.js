const NSX=require("../models/NhaSanXuat");

const NSXController={
    //get all NSX
    getAllNSX: async(req,res)=>{
        try {
            
            NSX.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteNSX: async(req,res)=>{
        try {
            var id=req.params.id;
            NSX.delete(id,function(data){
                res.status(200).json(data);
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
}

module.exports=NSXController;