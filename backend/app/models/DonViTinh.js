const db= require('../connect/conectDB')
const DonViTinh=function(user){
    this.maDonVi=DonViTinh.maDonVi;
    this.tenDonVi=DonViTinh.tenDonVi;

}
DonViTinh.create=function(data,result){
    db.query("INSERT INTO don_vi_tinh SET ?",data,function(err,dvt){

        if(err){
            result(null);
        }
        else{
            result({maDonVi:dvt.insertId, ...data});
        }
    });
}
DonViTinh.findById=function(name,result){
   db.query("SELECT * FROM don_vi_tinh WHERE maDonVi= ?",name,function(err,dvt){
        if(err||dvt.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(user[0]);
       }
    });
}
DonViTinh.getAll=function(result){
    db.query("SELECT * FROM don_vi_tinh",function(err,dvt){
        if(err){
            result(null);
        }else
        {
            result(dvt);
        }
        
    });
}
DonViTinh.delete=function(id,result){
    db.query("DELETE FROM don_vi_tinh where maDonVi=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
DonViTinh.update=function(data,result){
    console.log(data);
    db.query("UPDATE don_vi_tinh SET tenDonVi=? where maDonVi=?	",
    [data.tenDonVi,data.maDonVi],function(err,dvt){
        console.log(err);
        if(err){
            result(null);
        }
        else{
            result(data);
        }
    });
}
module.exports=DonViTinh;