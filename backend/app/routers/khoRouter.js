const router=require("express").Router();
const KhoController=require("../controllers/khoController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",KhoController.getAllKho);
router.get("/cn/:chinhanh",KhoController.getAllChiNhanhkho);
router.get("/:chinhanh",KhoController.getAllKho1ChiNhanh);
router.get("/ghh/:chinhanh",KhoController.getAllKho1ChiNhanhGanHH);
router.post("/addKho",KhoController.addKho);
router.get("/sl/:soLo",KhoController.getSoLo);

module.exports=router;
