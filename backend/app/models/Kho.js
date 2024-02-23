const db= require('../connect/conectDB')
const Kho=function(kho){
    this.maKho=kho.maKho;
    this.maChiNhanh=kho.maChiNhanh;
    this.diaChi=kho.diaChi;	
}
Kho.create=function(data,result){
    db.query("INSERT INTO kho SET ?",data,function(err,kho){

        if(err){
            result(null);
        }
        else{
            
            result({maKho:kho.insertId, ...data});
        }
    });
}
Kho.findById=function(name,result){
   db.query("SELECT * FROM kho WHERE maKho= ?",name,function(err,kho){
        if(err||kho.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(kho[0]);
       }
    });
}
Kho.findKhoChiNhanh=function(tenChiNhanh,result){
    db.query("SELECT kho.maKho FROM kho JOIN chi_nhanh ON chi_nhanh.maChiNhanh=kho.maChiNhanh WHERE chi_nhanh.tenChiNhanh=?",tenChiNhanh,function(err,kho){
         if(err||kho.lenght==0){
             console.log(err);
             result(null);
 
         }
        else{
         result(kho);
        }
     });
 }
Kho.getAll=function(result){
    db.query("SELECT * FROM kho",function(err,Kho){
        if(err){
            result(null);
        }else
        {
            result(Kho);
        }
        
    });
}


module.exports=Kho;