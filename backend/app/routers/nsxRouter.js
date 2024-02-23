const router=require("express").Router();
const NSXController=require("../controllers/nsxController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",NSXController.getAllNSX);
//router.delete("/deleteNSX/:id",NSXController.deleteNSX);

module.exports=router;
