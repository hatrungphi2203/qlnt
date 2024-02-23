const router=require("express").Router();
const userController=require("../controllers/userController");
const middlewareController=require("../controllers/middlewareController");
router.get("/",userController.getAllUser);

module.exports=router;
