const router=require("express").Router();
const PhieuXuatController=require("../controllers/phieuXuatController");
const middlewareController=require("../controllers/middlewareController");
router.get("/:cn",PhieuXuatController.getAllPhieuxuat);
router.post("/addPX",PhieuXuatController.addPhieuXuat);
router.get("/ct/:cn/:sophieuxuat",PhieuXuatController.getChiTietPhieuxuatSoPhieu);

module.exports=router;
