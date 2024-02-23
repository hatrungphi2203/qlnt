const router=require("express").Router();
const DVTController=require("../controllers/dvtController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",DVTController.getAllDVT);
//router.delete("/deleteDVT/:id",DVTController.DVTController);

module.exports=router;
