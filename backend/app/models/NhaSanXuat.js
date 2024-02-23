const db= require('../connect/conectDB')
const NhaSanXuat=function(NhaSanXuat){
    this.maNhaSanXuat=NhaSanXuat.maNhaSanXuat;
    this.tenNhaSanXuat=NhaSanXuat.tenNhaSanXuat;

}
NhaSanXuat.create=function(data,result){
    db.query("INSERT INTO nha_san_xuat SET ?",data,function(err,nsx){

        if(err){
            result(null);
        }
        else{
            result({maNhaSanXuat:nsx.insertId, ...data});
        }
    });
}
NhaSanXuat.findById=function(name,result){
   db.query("SELECT * FROM nha_san_xuat WHERE maNhaSanXuat= ?",name,function(err,nsx){
        if(err||nsx.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(user[0]);
       }
    });
}
NhaSanXuat.getAll=function(result){
    db.query("SELECT * FROM nha_san_xuat",function(err,nsx){
        if(err){
            result(null);
        }else
        {
            result(nsx);
        }
        
    });
}
NhaSanXuat.delete=function(id,result){
    db.query("DELETE FROM nha_san_xuat where maNhaSanXuat=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
module.exports=NhaSanXuat;