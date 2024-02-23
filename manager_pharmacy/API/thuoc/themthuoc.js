function addProduct() {
  const maSKU = document.getElementById("masku").value;
  const maNhom = document.getElementById("tennhomthuoc");
  const maNhaSanXuat = document.getElementById("tennhasanxuat");
  const maDonVi = document.getElementById("donvi");
  const tenBietDuoc = document.getElementById("tenbietduoc").value;
  const soDangKy = document.getElementById("sodangky").value;
  const giaBan = document.getElementById("giaban").value;
  const donGia = document.getElementById("dongia").value;
  const hanSuDung = document.getElementById("hsd").value;
  const hoatChat = document.getElementById("hoatchat").value;

  const text = maDonVi.value;
  maNhomThuoc = maNhom.getAttribute("data-maNhom", maNhom);
  maNSX = maNhaSanXuat.getAttribute("data-maNSX", maNhom);

  const requiredInputs = document.querySelectorAll(".form-nhap [required]");
  //mes lỗi
  let flag = false;
  let flag1 = false;
  let flag2 = false;
  let flag3 = false;
  var myListnhomthuoc = document.getElementById("myULtennhomthuoc");
  var itemnhomthuocs = myListnhomthuoc.getElementsByTagName("li");
  var myListnsx = document.getElementById("myUL");
  var itemsnsxs = myListnsx.getElementsByTagName("li");

  const err = document.querySelectorAll("[name='err']");
  const errornhomthuoc = document.getElementById("mesnhomthuoc");
  const errornhasanxuat = document.getElementById("mestennhasanxuat");
  const errordongia = document.getElementById("mesdongia");
  const errorgiaban = document.getElementById("mesgiaban");
  const errorhsd = document.getElementById("meshsd");
  for (var i = 0; i < err.length; i++) {
    err[i].style.color = "red";
    err[i].style.fontSize = "13px";
  }
  // Kiểm tra xem có trường nhập liệu bắt buộc nào bị bỏ trống hay không
  let hasEmptyFields = false;
  requiredInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("warning");
      if (
        !input.nextElementSibling ||
        !input.nextElementSibling.classList.contains("warning-message")
      ) {
        const warningMessage = document.createElement("div");
        warningMessage.classList.add("warning-message");
        warningMessage.textContent = "Vui lòng nhập giá trị.";
        input.parentNode.insertBefore(warningMessage, input.nextElementSibling);
      }
      hasEmptyFields = true;
    } else {
      input.classList.remove("warning");
      if (
        input.nextElementSibling &&
        input.nextElementSibling.classList.contains("warning-message")
      ) {
        input.nextElementSibling.remove();
      }
    }
  });
  //Ràng buộc nhập sai

  for (var i = 0; i < itemnhomthuocs.length; i++) {
    if (maNhom.value === itemnhomthuocs[i].textContent) {
      flag = true;
    }
  }
  for (var i = 0; i < itemsnsxs.length; i++) {
    if (maNhaSanXuat.value === itemsnsxs[i].textContent) {
      flag1 = true;
    }
  }
  if (flag === true||maNhom.value=="") {
    errornhomthuoc.innerHTML = "";
    
  }else {
    errornhomthuoc.innerHTML = "Nhập đúng giá trị tên nhóm";
  }
  if (flag1 === true||maNhaSanXuat.value=="") {
    errornhasanxuat.innerHTML = "";
    
  } else {
    errornhasanxuat.innerHTML = "Nhập đúng giá trị nhà sản xuất";
  }
  if (parseFloat(donGia) < parseFloat(giaBan)) {
    errorgiaban.innerHTML = "";
    flag2=true;
  } else {
    errorgiaban.innerHTML = "Giá bán phải lớn hơn đơn giá";
    flag2=false;
  }
  if (parseFloat(hanSuDung) >= 9) {
    errorhsd.innerHTML = "";
    flag3=true;
  } else {
    errorhsd.innerHTML = "Hạn sử dụng phải từ 9 trở lên";
    flag3=false;
  }
  // Nếu không có trường nào bị bỏ trống, thêm sản phẩm vào danh sách
  if (!hasEmptyFields&&flag==true&&flag1==true&&flag2===true&&flag3==true) {
    const productList = document.getElementById("product-list");
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${maSKU}</td>
              <td value="${maNhomThuoc}">${maNhom.value}</td>
              <td value="${maNSX}">${maNhaSanXuat.value}</td>
              <td value=${text}>${maDonVi.value}</td>
              <td>${tenBietDuoc}</td>
              <td>${soDangKy}</td>
              <td>${hoatChat}</td>
              <td>${donGia}</td>
              <td>${giaBan}</td>
              <td>${hanSuDung}</td>
              <td>
                <button class="row-button" onmousedown="xoa()" >Xoá</button>
              </td>
            `;
            productList.appendChild(row);

            // Xóa các giá trị trong form
            document.getElementById("masku").value = "";
            document.getElementById("tennhomthuoc").value = "";
            document.getElementById("tennhasanxuat").value = "";
            document.getElementById("donvi").value = "";
            document.getElementById("tenbietduoc").value = "";
            document.getElementById("sodangky").value = "";
            document.getElementById("dongia").value = "";
            document.getElementById("giaban").value = "";
            document.getElementById("hoatchat").value = "";
            document.getElementById("giaban").value = "";
            document.getElementById("hsd").value = "";
            console.log("Thêm sản phẩm thành công.");
    
  } 
}

function addListProduct() {
  const productList = document.getElementById("product-list");
  const rows = productList.querySelectorAll("tr");
  const data = [];

  // Lấy dữ liệu từ các hàng trong bảng
  if (rows.length == 0) {
    alert("Không có thuốc trong bảng mời thêm thuốc.");
  } else {
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      const product = {
        maSKU: cells[0].textContent,
        maNhom: cells[1].getAttribute("value"),
        maNhaSanXuat: cells[2].getAttribute("value"),
        maDonVi: cells[3].getAttribute("value"),
        tenBietDuoc: cells[4].textContent,
        soDangKy: cells[5].textContent,
        hoatChat: cells[6].textContent,
        donGia: parseFloat(cells[7].textContent),
        giaBan: parseFloat(cells[8].textContent),
        hanSuDung: cells[9].textContent,
      };
      data.push(product);
    });

    // Gửi dữ liệu bằng AJAX
    fetch("http://localhost:3000/qlnt/thuoc/addDS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Xử lý khi gửi dữ liệu thành công
          const tbody = document.getElementById("product-list");
          tbody.innerHTML = ""; // Xóa nội dung của phần tử tbody
          alert("Đã lưu thành công.");
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

function xoa() {
  // Thêm sự kiện "click" cho tất cả các nút "Xoá" trong bảng sản phẩm
  const deleteButtons = document.querySelectorAll("#product-list .row-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Xóa phần tử tr chứa nút "Xoá" được nhấn
      const row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
    });
  });
}
