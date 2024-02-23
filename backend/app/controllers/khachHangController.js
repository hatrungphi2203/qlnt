const KhachHang= require("../models/KhachHang");
const jwt=require("jsonwebtoken");

const KhachHangController={
    getAllKhachHang: async(req,res)=>{
        try {
            
            KhachHang.getAll(function(data){
                res.status(200).json(data);
            })
        
    
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addKhachHang: async(req,res)=>{
        try{
            
            //tạo new
            
            const newKH=new KhachHang({
                sdtKH: req.body.sdtKH,
                tenKhachHang: req.body.tenKhachHang,
                tichDiem: 0
            });
            
            //lưu về db
            KhachHang.create(newKH,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }
    },
    
    updateKhachHang: async (req, res) => {
        try {
          KhachHang.findById(req.body.maKhachHang,function (data){
            if (data != null) {
              //tạo new
          const newKhachHang = new KhachHang({
            maKhachHang: req.body.maKhachHang,
            sdtKH: req.body.sdtKH,
            tenKhachHang: req.body.tenKhachHang,
            tichDiem: req.body.tichDiem
          });
    
          //lưu về db
          KhachHang.update(newKhachHang, function (data) {
            res.send({ result: data });
          });
            } else {
              res.send("Chưa có khách hàng");
          }
        });
      
        } catch (err) {
          res.status(500).json(err);
        }
      },
}
module.exports=KhachHangController;