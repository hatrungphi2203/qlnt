const db= require('../connect/conectDB')
const ChiTietPhieuNhap=function(ChiTietPhieuNhap){
    this.soPhieuNhap=ChiTietPhieuNhap.soPhieuNhap;
    this.maSKU=ChiTietPhieuNhap.maSKU;
    this.soLuong=ChiTietPhieuNhap.soLuong;	
    this.soLo = ChiTietPhieuNhap.soLo;
    this.ngaySanXuat = ChiTietPhieuNhap.ngaySanXuat;
}
ChiTietPhieuNhap.create=function(sopn,dataList,result){
    console.log(dataList);
    const soPhieuNhap=sopn;
    const ds = dataList.slice(1).map((item) => ({
        soPhieuNhap: soPhieuNhap,
        maSKU: item.maSKU,
        soLuong: item.soLuong,
        soLo: item.soLo,
        ngaySanXuat: item.ngaySanXuat
      }));
    const values = ds.map(data => Object.values(data));
    db.query("INSERT INTO chi_tiet_phieu_nhap (soPhieuNhap, maSKU, soLuong, soLo, ngaySanXuat) VALUES ?", [values], function (err, res) {
        if (err) {
            console.log(err);
            result(err);
        } else {
            const insertedIds = [];
            for (let i = 1; i <= res.affectedRows; i++) {
                insertedIds.push({ soPhieuNhap: res.insertId + i, ...dataList[i] });
            }
            result(insertedIds);
        }
    });
}
ChiTietPhieuNhap.findById=function(cn,soPhieuNhap,result){
   db.query("SELECT chi_tiet_phieu_nhap.*,thuoc.tenBietDuoc FROM chi_tiet_phieu_nhap JOIN thuoc ON thuoc.maSKU=chi_tiet_phieu_nhap.maSKU WHERE soPhieuNhap IN (SELECT soPhieuNhap FROM phieu_nhap WHERE phieu_nhap.maNhanVien IN (SELECT nhan_vien.maNhanVien FROM nhan_vien JOIN chi_nhanh ON chi_nhanh.maChiNhanh=nhan_vien.maChiNhanh WHERE chi_nhanh.tenChiNhanh=?)) AND soPhieuNhap=?",[cn,soPhieuNhap],function(err,chiTietPhieuNhap){
        if(err||chiTietPhieuNhap.lenght==0){
            console.log(err);
            result(null);

        }
       else{
        console.log(chiTietPhieuNhap);
        result(chiTietPhieuNhap);
       }
    });
}
// ChiTietPhieuNhap.getChiTietPhieu=function(sophieu,result){
//     db.query("SELECT * from chi_tiet_phieu_nhap WHERE chi_tiet_phieu_nhap.soPhieuNhap in ( SELECT chi_tiet_phieu_nhap.soPhieuNhap from chi_tiet_phieu_nhap,thuoc,kho_thuoc WHERE thuoc.maSKU=kho_thuoc.maSKU and chi_tiet_phieu_nhap.maSKU=thuoc.maSKU AND chi_tiet_phieu_nhap.soPhieuNhap=?)",sophieu,function(err,chiTietPhieuNhap){
//         if(err){
//             result(null);
//         }else
//         {
//             console.log(chiTietPhieuNhap);
//             result(chiTietPhieuNhap);
//         }
        
//     });
// }
// ChiTietPhieuNhap.delete=function(id,result){
//     db.query("DELETE FROM chi_tiet_phieu_nhap where soPhieuNhap=?;",id,function(err){
//         if(err){
//             result(null);
//         }
//        else{
//         result("XÓA DỮ LIỆU OKI");
//        }
//     });
// }
// ChiTietPhieuNhap.update=function(data,result){
//         db.query("UPDATE chi_tiet_phieu_nhap SET soLuong=?,donGia=? where soPhieuNhap=?",
//         [data.soLuong,data.donGia,data.soPhieuNhap],function(err,ChiTietPhieuNhap){
//             if(err){
//                 console.log(err);
//                 result(null);
//             }
//             else{
//                 result(data);
//             }
//         });
//     }
module.exports=ChiTietPhieuNhap;