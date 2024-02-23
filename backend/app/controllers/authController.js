require('dotenv').config();
const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
let refresh_tks=[];
const authController={

    registerUser: async(req,res)=>{
        try{
            const salt=await bcrypt.genSalt(10);
            const hashed= await bcrypt.hash(req.body.matKhau,salt);

            //tạo new uer
            const newUser=new User({
              maNhanVien:req.body.maNhanVien,
              sdt:req.body.sdt,
              matKhau:hashed,
              role:req.body.role
            });
            
            //lưu về db
            User.create(newUser,function(data){
                res.send({result:data});
            });
           

        }
        catch(err){
            res.status(500).json(err);
        }

    },

    //access token
    accessToken:(user)=>{
      return jwt.sign({
        maUser: user.maUser,
        role: user.role,
        },process.env.ACCESS_TOKEN,
        {expiresIn:"365d"}
        );
    },
     //refresh token
     refreshToken:(user)=>{
      return jwt.sign({
        maUser: user.maUser,
        role: user.role,
        },process.env.REFRESH_TOKEN,
        {expiresIn:"365d"}
        );
    },

    //login
    loginUser:(req,res)=>{
        try {
        
            User.findBySDT(req.body.sdt, (user, err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json("Lỗi server");
                }
          
                if (!user) {
                  return res.status(404).json("Sai tên đăng nhập");
                }
          
                bcrypt.compare(req.body.matKhau, user.matKhau, (err, valiMK) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json("Lỗi server");
                  }
          
                  if (valiMK==false) {
                    return res.status(404).json("Sai mật khẩu");
                  }
                  else{
                    const access_tk=authController.accessToken(user);
                    const refresh_tk=authController.refreshToken(user);
                    refresh_tks.push(refresh_tk);
                    res.cookie("refresh_tk",refresh_tk,{
                      httpOnly:true,
                      secure:false,
                      path:"/",
                      sameSite:"strict",
                    });
                    User.findBySDT2(req.body.sdt, (user2, err) => {
                      return res.status(200).json({user2,access_tk});
                    });
                   
                  }
                  });
                   
                });
            
        } catch (error) {
           return res.status(500).json((error));
        }
    },

    requestRefreshToken: async(req,res)=>{
      //refresh token từ user 
      const refresh_tk=req.cookies.refresh_tk;
      //res.status(200).json(refresh_tk);
      if(!refresh_tk){
        return res.status(401).json("bạn không phải auth");
      }
      if(!refresh_tks.includes(refresh_tk)){
        return res.status(403).json("refresh_tk không có giá trị");
      }
      jwt.verify(refresh_tk,process.env.REFRESH_TOKEN,(err,user)=>{
        if(err){
          console.log(err);
        }
        
        refresh_tks=refresh_tks.filter((token)=>token !== refresh_tk);
        //tạo mới accesstoken ,refresh token
        const newAccessToken= authController.accessToken(user);
        const newRefreshToken=authController.refreshToken(user);
        console.log(newAccessToken);//
        refresh_tks.push(newRefreshToken);
        res.cookie("refresh_tk",newRefreshToken,{
          httpOnly:true,
          secure:false,
          path:"/",
          sameSite:"strict",
        });
        res.status(200).json({accsesToken: newAccessToken});
      });
    },

    //logout
    userLogout: async(req,res)=>{
      res.clearCookie("refresh_tk");
      refresh_tks=refresh_tks.filter(token=>token !==req.cookies.refresh_tk);//gia bo ln db
      res.status(200).json("logout");
    }


};

module.exports=authController;