const router=require("express").Router();
const thuocController=require("../controllers/thuocController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",thuocController.getAllThuoc);
router.get("/6th",thuocController.getThuoc6thg);
router.post("/addThuoc",thuocController.addThuoc);
router.post("/addDS",thuocController.addDSThuoc);
router.put("/updateThuoc",thuocController.updateThuoc);
router.get("/tbd/:cn/:tenBietDuoc",thuocController.findTenThuoc);
//
router.get("/hc/:cn/:hoatChat",thuocController.findByHoatChat);

//
router.get("/nt/:cn/:nhomThuoc",thuocController.findByNhomThuoc);
module.exports=router;
