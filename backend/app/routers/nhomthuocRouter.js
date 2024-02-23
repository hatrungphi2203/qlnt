const router=require("express").Router();
const NhomThuocController=require("../controllers/nhomthuocController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",NhomThuocController.getAll);
//router.delete("/deleteNhomThuoc/:id",NhomThuocController.delete);

module.exports=router;
