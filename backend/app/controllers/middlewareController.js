const jwt=require("jsonwebtoken");
require('dotenv').config();
const middlewareController={
    //verifyToken xac nhanj tk co phai hay k
    verifyToken:(req,res,next)=>{
        const token=req.headers.token;
        if(token){
            //bearer ssss
            const accessToken=token.split(" ")[1];
            jwt.verify(accessToken,process.env.ACCESS_TOKEN,(err,user)=>{
                console.log(err);
                if(err){
                    res.status(403).json("token khong dung hoac da het han")
                }
                req.user=user;
                next();
            });
        }
        else{
            res.status(401).json("ban khong dang nhap");
        }
    },
    // verifyTokenAdmin:(req,res,next)=>{
    //     middlewareController.verifyToken(req,res,()=>{
    //         if(req.user.maUser==req.params.maUser||req.user.role=="admin"){
    //             next();
    //         }else{
    //             res.status(403).json("ban khong the xoa");

    //         }
    //     });

    // },
};
module.exports=middlewareController;