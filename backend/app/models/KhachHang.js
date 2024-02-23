const db=require("../connect/conectDB");
//const User=require("./User");
const KhachHang=function(KhachHang){
    this.maKhachHang=KhachHang.maKhachHang;
    this.sdtKH=KhachHang.sdtKH;
    this.tenKhachHang=KhachHang.tenKhachHang;
    this.tichDiem=KhachHang.tichDiem;
}

KhachHang.getAll=function(result){
    db.query("SELECT * FROM khach_hang",function(err,KhachHang){
        if(err){
            result(null);
        }else
        {
            result(KhachHang);
        }
        
    });
    
}

KhachHang.getById=function(id,result){
    db.query("SELECT * FROM khach_hang where maKhachHang=?;",id,function(err,KhachHang){
        if(err||KhachHang.lenght==0){
            result(null);
        }
       else{
        result(KhachHang[0]);
       }
    });
    
}
KhachHang.getBySDT=function(sdtKH,result){
    db.query("SELECT * FROM khach_hang where sdtKH=?;",sdtKH,function(err,KhachHang){
        if(err||KhachHang.lenght==0){
            result(null);
        }
       else{
        result(KhachHang);
       }
    });
    
}
KhachHang.create=function(data,result){
    db.query("INSERT INTO khach_hang SET ?",data,function(err,KhachHang){

        if(err){
            result(null);
        }
        else{
            result({maKhachHang:KhachHang.insertId, ...data});
        }
    });
}


KhachHang.update=function(data,result){
    console.log(data);
    db.query("UPDATE khach_hang SET tenKhachHang=? WHERE maKhachHang = ?",
    [data.tenKhachHang,data.maKhachHang],function(err,KhachHang){
        console.log(err);
        if(err){
            result(null);
        }
        else{
            result(data);
        }
    });
}
module.exports=KhachHang;