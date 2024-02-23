///lưu hóa đơn
function luuHoaDon() {
  // nhớ lưu mã nhân viên vào sesion
  //dữ liệu nào muốn lấy bên kia thì lưu sesion nếu đc thì khi oki xóa sesion
  const dst = JSON.parse(sessionStorage.getItem("dsthuoc"));
  const sdtKH = document.getElementById("timsdt").value;
  const tenChiNhanh = document.getElementById("tenChiNhanh").textContent;
  const nv = JSON.parse(sessionStorage.getItem("nv"));
  let flag = false;
  const productList = document.querySelector("#my-table tbody");

  const rows = productList.querySelectorAll("tr");
  console.log(rows);
  const manv = nv[1];
  var myList = document.getElementById("myULSDT");
  var items = myList.getElementsByTagName("li");

  for (var i = 0; i < items.length; i++) {
    if(sdtKH===items[i].textContent){
      flag = true;
      
    }
  }
  
  if (sdtKH != ""&&flag===true) {
    const data = [];
    const hoadon = {
      sdtKH: sdtKH,
      maNhanVien: manv,
      tenchinhanh: tenChiNhanh,
    };
    data.push(hoadon);
    // Lấy dữ liệu từ các hàng trong bảng
    if (rows.length === 0) {
      alert("không có thuốc nào mời chọn thuốc");
    } else {
      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const donGia = cells[3].textContent.replace(" đ", "");
        if (cells[2].querySelector("input[type='text']").value > 0) {
          const product = {
            maSKU: cells[1].getAttribute("value"),
            soLuong: cells[2].querySelector("input[type='text']").value,
            donGia: donGia,
            ngayHetHan: cells[1].getAttribute("ngayhethan"),
          };
          console.log(product);
          data.push(product);
        } else {
          flag = false;
        }
      });
      if (flag == true) {
        console.log(data);
        fetch("http://localhost:3000/qlnt/hoadon/addHD", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (response.ok) {
              alert("lưu hóa đơn thành công");
              window.location.href = "banhang.html";
            } else {
              alert("lưu hóa đơn thất bại");
            }
          })
          .catch((error) => console.log(error));
      } else {
        alert("Mời nhập số lượng lớn hơn 0");
      }
    }
  } else {
    alert("không có thông tin số điện thoại khách mời nhập lại");
  }
}
