const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const authRouter=require("./app/routers/auth");
const userRouters=require("./app/routers/userRouters");
const nhanvienRouter=require("./app/routers/nhanvienRouter");
const thuocRouter=require("./app/routers/thuocRouter");
const dvtRouter=require("./app/routers/dvtRouter");
const nhomthuocRouter=require("./app/routers/nhomthuocRouter");
const nsxRouter=require("./app/routers/nsxRouter");
const phieunhapRouter=require("./app/routers/phieunhapRouter");
const khoRouter=require("./app/routers/khoRouter");
const chinhanhRouter=require("./app/routers/chinhanhRouter");
const phieuxuatRouter=require("./app/routers/phieuxuatRouter");
const khachhangRouter=require("./app/routers/khachhangRouter");
const hoadonRouter=require("./app/routers/hoadonrouter");
const baocaoRouter=require("./app/routers/baocaoRouter");

require("dotenv").config();
const app=express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
//cấu hình body-parser
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())


//routers
app.use("/qlnt/auth",authRouter);
app.use("/qlnt/user",userRouters);
app.use("/qlnt/nhanvien",nhanvienRouter);
app.use("/qlnt/thuoc",thuocRouter);
app.use("/qlnt/nhomthuoc",nhomthuocRouter);
app.use("/qlnt/dvt",dvtRouter);
app.use("/qlnt/nsx",nsxRouter);
app.use("/qlnt/phieunhap",phieunhapRouter);
app.use("/qlnt/phieuxuat",phieuxuatRouter);
app.use("/qlnt/kho",khoRouter);
app.use("/qlnt/chinhanh",chinhanhRouter);
app.use("/qlnt/khach",khachhangRouter);
app.use("/qlnt/hoadon",hoadonRouter);
app.use("/qlnt/baocao",baocaoRouter);

app.listen(3000,()=>{
    console.log("sever is running");
});

//authentication so sánh dữ liệu nhập
//authorzation phân quyền
//json web tokens