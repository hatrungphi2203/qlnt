function themNhanVien() {
  const tenchinhanh = document.getElementById("tenchinhanh");
  const cccd = document.getElementById("cccd").value;
  const tenNhanVien = document.getElementById("tennhanvien").value;
  const ngaySinh = document.getElementById("ngaysinh").value;
  const gioiTinhInputs = document.getElementsByName("gioitinh");
  const diaChi = document.getElementById("diachi").value;
  const sdt = document.getElementById("sdt").value;
  const cn = tenchinhanh.options[tenchinhanh.selectedIndex].text;
  const err=document.querySelectorAll("[name='err']")
  const errorCN = document.getElementById("mesChiNhanh");
  const errorCCCD = document.getElementById("mesCccd");
  const errorTenNV = document.getElementById("mestenNV");
  const errorNgaySinh = document.getElementById("mesngaySinh");
  const errorSdt = document.getElementById("messoDienThoai");
  const errorDiaChi = document.getElementById("mesdiaChi");
  var flag=true;
  for (var i = 0; i < err.length; i++) {
    err[i].style.color = "red";
    err[i].style.fontSize="14px";
  }
  if (tenchinhanh.value === "") {
    errorCN.innerHTML = "Vui lòng chọn giá trị chi nhánh";
    flag=false;
  }else{
    errorCN.innerHTML = "";
  }
  
  if (cccd.trim().length !== 12||cccd==="") {
    errorCCCD.innerHTML="Vui lòng nhập số cccd có độ dài là 12 số";
    flag=false;
  }else{
    errorCCCD.innerHTML="";
  }

  
  if (tenNhanVien.trim().length === 0) {
    errorTenNV.innerHTML="Vui lòng nhập tên nhân viên";
    flag=false;
  }else{
    errorTenNV.innerHTML=" ";
  }

  
  const ngaySinhDate = new Date(ngaySinh);
  const today = new Date();
  const minNgaySinh = new Date(
    today.getFullYear() - 65,
    today.getMonth(),
    today.getDate()
  );
  const maxNgaySinh = new Date(
    today.getFullYear() - 22,
    today.getMonth(),
    today.getDate()
  );
  if (ngaySinhDate > maxNgaySinh || ngaySinhDate < minNgaySinh ||ngaySinh==="") {
    errorNgaySinh.innerHTML="Vui lòng chọn ngày sinh hợp lệ ";
    flag=false;
  }else{
    errorNgaySinh.innerHTML="";
  }

 
  let gioiTinhValue = 0;
  for (let i = 0; i < gioiTinhInputs.length; i++) {
    if (gioiTinhInputs[i].checked) {
      gioiTinhValue = gioiTinhInputs[i].value;
      break;
    }
  }
  const gioiTinh = gioiTinhValue === "Nam" ? 0 : 1;

  if (sdt.trim().length !== 10) {
    errorSdt.innerHTML="Vui lòng nhập số điện thoại gồm 10 số";
    flag=false;
  }else{
    errorSdt.innerHTML="";
  }

 
  if (diaChi.trim().length === 0) {
    errorDiaChi.innerHTML="Vui lòng nhập địa chỉ";
    flag=false;
  }else{
    errorDiaChi.innerHTML="";
  }
if(flag==true){
    const data = {
        tenChiNhanh: cn,
        cccd: cccd,
        tenNhanVien: tenNhanVien,
        ngaySinh: ngaySinh,
        gioiTinh: gioiTinh,
        sdt: sdt,
        diaChi: diaChi,
      };
      console.log(JSON.stringify(data));
      // Gửi dữ liệu bằng AJAX
      fetch("http://localhost:3000/qlnt/nhanvien/addNV", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Đã lưu thành công.");
            window.location.href = "quanlynhanvien.html";
          } else {
            // Xử lý khi có lỗi xảy ra
            alert("Lưu thất bại.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
}
}

function getMinDate() {
  var date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  return date.toISOString().slice(0, 10);
}

// Hàm tính ngày lớn nhất mà người dùng có thể chọn (hiện tại)
function getMaxDate() {
  return new Date().toISOString().slice(0, 10);
}
