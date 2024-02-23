function addkhachHang() {

    const nv = JSON.parse(sessionStorage.getItem("nv"));
    const maNhanVien = nv[1];
    
    const cn = sessionStorage.getItem("cn");
    const tenKhachHangInput = document.getElementById('ten_khach_hang');
    const sdtInput = document.getElementById('sdt');

  
    if (!tenKhachHangInput.value || !sdtInput.value||!/^\d{10}$/.test(sdtInput.value)) {
      alert("Vui lòng nhập đầy đủ thông tin cho khách hàng hoặc kiểm tra lại số điện thoại.");
      return;
    } else {
      const Khachhang = {
       
        tenKhachHang: tenKhachHangInput.value,
        sdtKH: sdtInput.value,
       
      };
  
      
      console.log(Khachhang);
    
        fetch("http://localhost:3000/qlnt/khach/addKhach", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Khachhang),
        })
          .then((response) => {
            if (response.ok) {
              alert("lưu thành công");
              location.reload();
            } else {
              alert("lưu  thất bại");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      
  
  

    }
  }


