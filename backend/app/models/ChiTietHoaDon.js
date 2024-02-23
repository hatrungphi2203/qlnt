const db= require('../connect/conectDB')
const ChiTietHoaDon=function(ChiTietHoaDon){
    this.soHoaDon=ChiTietHoaDon.soHoaDon;
    this.maSKU=ChiTietHoaDon.maSKU;
    this.soLuong=ChiTietHoaDon.soLuong;	
    this.donGia=ChiTietHoaDon.donGia;
    this.tongTien=ChiTietHoaDon.tongTien;
   
}
	
ChiTietHoaDon.create=function(soHD,dataList,result){
    const ds = dataList.slice(1).map((item) => ({
        soHoaDon: soHD,
        maSKU: item.maSKU,
        soLuong: item.soLuong,
        donGia: item.donGia,
        tongTien: item.soLuong*item.donGia
      }));
    const values = ds.map(data => Object.values(data));
    db.query("INSERT INTO chi_tiet_hoa_don (soHoaDon, maSKU, soLuong, donGia,tongTien) VALUES ?", [values], function (err, res) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            const insertedIds = [];
            for (let i = 1; i <= res.affectedRows; i++) {
                insertedIds.push({ soHoaDon: res.insertId + i, ...dataList[i] });
            }
            result(insertedIds);
        }
    });
}
ChiTietHoaDon.findById=function(name,result){
   db.query("SELECT * FROM chi_tiet_phieu_xuat WHERE soPhieuNhap= ?",name,function(err,ChiTietHoaDon){
        if(err||ChiTietHoaDon.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        result(ChiTietHoaDon[0]);
       }
    });
}
ChiTietHoaDon.getAll=function(soHD,result){
    db.query(`SELECT chi_tiet_hoa_don.soHoaDon,chi_tiet_hoa_don.maSKU,thuoc.tenBietDuoc,soLuong, chi_tiet_hoa_don.donGia, chi_tiet_hoa_don.tongTien 
    FROM chi_tiet_hoa_don JOIN thuoc ON thuoc.maSKU=chi_tiet_hoa_don.maSKU 
    WHERE chi_tiet_hoa_don.soHoaDon=?`,soHD,function(err,chiTietHoaDon){
        if(err){
            result(null);
        }else
        {
            result(chiTietHoaDon);
        }
        
    });
}
ChiTietHoaDon.delete=function(id,result){
    db.query("DELETE FROM chi_tiet_hoa_don where soPhieuNhap=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
ChiTietHoaDon.update=function(data,result){
        db.query("UPDATE chi_tiet_hoa_don SET soLuong=?,donGia=? where soPhieuXuat=?",
        [data.soLuong,data.donGia,data.soPhieuXuat],function(err,ChiTietHoaDon){
            if(err){
                console.log(err);
                result(null);
            }
            else{
                result(data);
            }
        });
    }


module.exports=ChiTietHoaDon;