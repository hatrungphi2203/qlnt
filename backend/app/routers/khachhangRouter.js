const router=require("express").Router();
const KhachHangController=require("../controllers/khachHangController");
const middlewareController=require("../controllers/middlewareController");

router.get("/",KhachHangController.getAllKhachHang);
router.post("/addKhach",KhachHangController.addKhachHang);


module.exports=router;