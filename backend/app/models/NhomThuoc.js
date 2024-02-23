const db= require('../connect/conectDB')
const NhomThuoc=function(NhomThuoc){
    this.maNhom=NhomThuoc.maNhom;
    this.tenNhom=NhomThuoc.tenNhom;

}
NhomThuoc.create=function(data,result){
    db.query("INSERT INTO nhom_thuoc SET ?",data,function(err,nhomthuoc){

        if(err){
            result(null);
        }
        else{
            result({maNhom:nhomthuoc.insertId, ...data});
        }
    });
}
NhomThuoc.findById=function(name,result){
   db.query("SELECT * FROM nhom_thuoc WHERE maNhom= ?",name,function(err,nhomthuoc){
        if(err||nhomthuoc.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(user[0]);
       }
    });
}
NhomThuoc.getAll=function(result){
    db.query("SELECT * FROM nhom_thuoc",function(err,nhomthuoc){
        if(err){
            result(null);
        }else
        {
            result(nhomthuoc);
        }
        
    });
}
NhomThuoc.delete=function(id,result){
    db.query("DELETE FROM nhom_thuoc where maNhom=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
NhomThuoc.update=function(data,result){
    console.log(data);
    db.query("UPDATE nhom_thuoc SET tenNhom=? where maNhom=?",
    [data.tenNhom,data.maNhom],function(err,nhomthuoc){
        console.log(err);
        if(err){
            result(null);
        }
        else{
            result(data);
        }
    });
}



module.exports=NhomThuoc;