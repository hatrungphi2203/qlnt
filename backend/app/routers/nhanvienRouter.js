const router=require("express").Router();
const nhanvienController=require("../controllers/nhanvienController");
const middlewareController=require("../controllers/middlewareController");

router.get("/",nhanvienController.getAllNhanVien);
router.post("/addNV",nhanvienController.addNhanVien);
router.put("/update",nhanvienController.updateNhanVien);
router.get("/:id",nhanvienController.getMotNhanVien);

module.exports=router;