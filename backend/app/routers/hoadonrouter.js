const router=require("express").Router();
const HoaDonController=require("../controllers/hoaDonController");
const middlewareController=require("../controllers/middlewareController");

router.get("/:cn",HoaDonController.getAllHoaDon);
router.post("/addHD",HoaDonController.addHoaDon);
router.get("/ct/:soHD",HoaDonController.getAllChiTietHoaDon);
module.exports=router;