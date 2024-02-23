const router=require("express").Router();
const PhieuNhapController=require("../controllers/phieuNhapController");
const middlewareController=require("../controllers/middlewareController");
router.get("/:cn",PhieuNhapController.getAllPhieuNhap);
router.post("/addPN",PhieuNhapController.addPhieuNhap);
router.get("/ct/:cn/:sophieunhap",PhieuNhapController.getChiTietPhieuNhapSoPhieu);

module.exports=router;
