const db= require('../connect/conectDB')
const ChiNhanh=function(ChiNhanh){
    this.maChiNhanh=ChiNhanh.maChiNhanh;
    this.tenChiNhanh=ChiNhanh.tenChiNhanh;
    this.diaChi=ChiNhanh.diaChi;
    this.sdt=ChiNhanh.sdt;
}
ChiNhanh.create=function(data,result){
    db.query("INSERT INTO chi_nhanh SET ?",data,function(err,ChiNhanh){

        if(err){
            result(null);
        }
        else{
            
            result({maChiNhanh:ChiNhanh.insertId, ...data});
        }
    });
}
ChiNhanh.findById=function(name,result){
   db.query("SELECT * FROM chi_nhanh WHERE maChiNhanh= ?",name,function(err,ChiNhanh){
        if(err||ChiNhanh.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(ChiNhanh[0]);
       }
    });
}
ChiNhanh.findByTen=function(name,result){
    db.query("SELECT * FROM chi_nhanh WHERE tenChiNhanh= ?",name,function(err,ChiNhanh){
         if(err||ChiNhanh.lenght==0){
             console.log(err);
             result(null);
 
         }
        else{
         result(ChiNhanh[0]);
        }
     });
 }
 
ChiNhanh.getAll=function(result){
    db.query("SELECT * FROM chi_nhanh",function(err,ChiNhanh){
        if(err){
            result(null);
        }else
        {
            result(ChiNhanh);
        }
        
    });
}
ChiNhanh.getNhanVien=function(result){
    db.query("SELECT chi_nhanh.maChiNhanh,nhan_vien.tenNhanVien,nhan_vien.ngaySinh FROM chi_nhanh JOIN nhan_vien ON nhan_vien.maChiNhanh=chi_nhanh.maChiNhanh",function(err,NhanVien){
        if(err){
            result(null);
        }else
        {
            result(NhanVien);
        }
        
    });
}
ChiNhanh.delete=function(id,result){
    db.query("DELETE FROM chi_nhanh where maChiNhanh=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
ChiNhanh.update=function(data,result){
        db.query("UPDATE chi_nhanh SET maChiNhanh=?,diaChi=? where maChiNhanh=?",
        [data.maChiNhanh,data.diaChi,data.maChiNhanh],function(err,ChiNhanh){
            if(err){
                console.log(err);
                result(null);
            }
            else{
                result(data);
            }
        });
    }

module.exports=ChiNhanh;