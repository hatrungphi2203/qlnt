const router=require("express").Router();
const BaoCaoController=require("../controllers/baoCaoController");
router.get("/",BaoCaoController.getAll);
router.get("/:cn",BaoCaoController.getAllcn);
router.post("/ngay/",BaoCaoController.getDoanhThu);
router.post("/ngaycn/",BaoCaoController.getDoanhThucn);
module.exports=router;