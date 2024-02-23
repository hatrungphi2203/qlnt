function dangnhap() {
  const sdtInput = document.getElementById("sdt").value;
  const matkhauInput = document.getElementById("matkhau").value;
  const data = {
    sdt: sdtInput,
    matKhau: matkhauInput,
  };
  console.log(JSON.stringify(data));
  fetch("http://localhost:3000/qlnt/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data == "Sai tên đăng nhập") {
        alert("Sai tên đăng nhập");
      } else if (data == "Sai mật khẩu") {
        alert("Sai mật khẩu");
      } else if (data == "Lỗi server") {
        alert("Lỗi server");
      } else {
        if (data.user2.role === "nhanvien") {
          const tenChiNhanh = data.user2.tenChiNhanh;
          sessionStorage.setItem("cn", tenChiNhanh);
          const manv = data.user2.maNhanVien;
          const tennv = data.user2.tenNhanVien;
          const nv = [tennv, manv];
          sessionStorage.setItem("nv", JSON.stringify(nv));
          sessionStorage.setItem("tk", JSON.stringify(data.access_tk));
          window.location.href = "banhang.html";
		  alert("Chào mừng đến với website Nhà Thuốc T&P !");
        } else if (data.user2.role === "admin") {
          alert("Bạn không phải là nhân viên ");
        } else {
          alert("Không xác định");
        }
        
      }
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
}
function anHien() {
  const passwordInput = document.getElementById("matkhau");
  const input = document.getElementById("icon-anHien");
  if (input.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
function kiemTraDN(){
  // Kiểm tra trạng thái đăng nhập
if (!sessionStorage.getItem('tk')) {
  // Nếu chưa đăng nhập, hiển thị thông báo
  alert('Bạn cần đăng nhập để truy cập vào các tính năng của website !');
  // Chuyển hướng đến trang đăng nhập
  window.location.href = "dangnhap.html";
}
}
