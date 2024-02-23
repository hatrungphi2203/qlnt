const db= require('../connect/conectDB')
const ChiTietPhieuXuat=function(ChiTietPhieuXuat){
    this.soPhieuXuat=ChiTietPhieuXuat.soPhieuXuat;
    this.maSKU=ChiTietPhieuXuat.maSKU;
    this.soLuong=ChiTietPhieuXuat.soLuong;	
    this.soLo = ChiTietPhieuXuat.soLo;
    this.ngaySanXuat = ChiTietPhieuXuat.ngaySanXuat;
}
ChiTietPhieuXuat.create=function(sophieuxuat,dataList,result){
    console.log(dataList);
    const soPhieuXuat=sophieuxuat;
    const ds = dataList.slice(1).map((item) => ({
        soPhieuXuat: soPhieuXuat,
        maSKU: item.maSKU,
        soLuong: item.soLuong,
        soLo: item.soLo,
        ngaySanXuat: item.ngaySanXuat
      }));
    const values = ds.map(data => Object.values(data));
    db.query("INSERT INTO chi_tiet_phieu_xuat (soPhieuXuat, maSKU, soLuong,soLo, ngaySanXuat) VALUES ?", [values], function (err, res) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            const insertedIds = [];
            for (let i = 1; i <= res.affectedRows; i++) {
                insertedIds.push({ soPhieuXuat: res.insertId + i, ...dataList[i] });
            }
            result(insertedIds);
        }
    });
}
ChiTietPhieuXuat.findById=function(cn,soPhieuxuat,result){
    db.query("SELECT chi_tiet_phieu_xuat.*,thuoc.tenBietDuoc FROM chi_tiet_phieu_xuat JOIN thuoc ON thuoc.maSKU=chi_tiet_phieu_xuat.maSKU WHERE soPhieuxuat IN (SELECT soPhieuxuat FROM phieu_xuat WHERE phieu_xuat.maNhanVien IN (SELECT nhan_vien.maNhanVien FROM nhan_vien JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh WHERE chi_nhanh.tenChiNhanh=?)) AND soPhieuxuat=?",[cn,soPhieuxuat],function(err,chiTietPhieuxuat){
         if(err||chiTietPhieuxuat.lenght==0){
             console.log(err);
             result(null);
 
         }
        else{
         console.log(chiTietPhieuxuat);
         result(chiTietPhieuxuat);
        }
     });
 }

ChiTietPhieuXuat.delete=function(id,result){
    db.query("DELETE FROM chi_tiet_phieu_xuat where soPhieuXuat=?;",id,function(err){
        if(err){
            result(null);
        }
       else{
        result("XÓA DỮ LIỆU OKI");
       }
    });
}
ChiTietPhieuXuat.update=function(data,result){
        db.query("UPDATE chi_tiet_phieu_xuat SET soLuong=?,donGia=? where soPhieuXuat=?",
        [data.soLuong,data.donGia,data.soPhieuXuat],function(err,ChiTietPhieuXuat){
            if(err){
                console.log(err);
                result(null);
            }
            else{
                result(data);
            }
        });
    }
module.exports=ChiTietPhieuXuat;