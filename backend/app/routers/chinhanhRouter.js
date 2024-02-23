const router=require("express").Router();
const ChiNhanhController=require("../controllers/chiNhanhController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",ChiNhanhController.getAllChiNhanh);
router.get("/dsNV",ChiNhanhController.getDSNhanVien);
router.post("/addCN",ChiNhanhController.addChiNhanh);


module.exports=router;
