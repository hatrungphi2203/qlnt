const existingItems = new Set();
async function hienThiTatCaBanHang() {
  const cn = sessionStorage.getItem("cn");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");
  tenChiNhanhElement.innerText = cn;

  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const tennvElement = document.getElementById("tennv");
  tennvElement.innerText = nv[0];
  const tenElement = document.getElementById("tenNhanVien");
  tenElement.value = nv[0];
  try {
    const response = await fetch(`http://localhost:3000/qlnt/kho/${cn}`);
    const data = await response.json();
    console.log(data);
    const container = document.getElementById("container-banhang");
    container.innerHTML = "";
    sessionStorage.setItem("dsthuoc", JSON.stringify(data));

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide", "chua");

      const image = document.createElement("img");
      image.src = "images/Nhathuocpt.png";
      slide.appendChild(image);

      const name = document.createElement("h3");
      name.innerText = `${item.tenBietDuoc}`;
      name.setAttribute("data-masku", item.maSKU);
      slide.appendChild(name);

      const ngayHetHan = document.createElement("h3");
      ngayHetHan.innerText = `HSD: ${item.ngayHetHan}`;
      ngayHetHan.id=`${item.ngayHetHan}`;
      ngayHetHan.setAttribute("data-ngayhh",item.ngayHetHan);
      slide.appendChild(ngayHetHan);

      const sl = document.createElement("h3");
      sl.innerText = `Số lượng:`;
      slide.appendChild(sl);

      const quantity = document.createElement("h3");
      quantity.innerText = `${item.soLuong}`;
      quantity.id = item.maSKU;
      quantity.setAttribute("data-sl", item.soLuong);
      slide.appendChild(quantity);

      const price = document.createElement("div");
      price.classList.add("gia");
      price.innerText = ` ${item.giaBan} đ`;
      slide.appendChild(price);

      const addButton = document.createElement("a");
      addButton.href = "#";
      addButton.classList.add("btn");
      addButton.innerText = "Thêm";
      slide.appendChild(addButton);

      container.appendChild(slide);

      // if (existingItems.has(item.tenBietDuoc)) {
      //   addButton.classList.add("disabled");
      //   addButton.innerText = "Đã thêm";
      // }

      addButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (addButton.classList.contains("disabled")) {
          return;
        }

        existingItems.add(item.tenBietDuoc);

        const otherContainer = document.querySelector(".other");
        otherContainer.style.display = "block";

        const parent = this.parentNode;
        const ten = parent.querySelector("h3:nth-child(2)").textContent;
       // const ngayHetHantxt = parent.querySelector("h3:nth-child(3)").textContent;
        const gia = parent.querySelector(".gia").textContent;
        //xác định nó có trùng không
        const nameElement = slide.querySelector("h3");
        const maSKU = nameElement.getAttribute("data-masku");
        const ngayHetHan2= `${item.ngayHetHan}`;
        //xác định soluong
        const nameElement1 = slide.querySelector(`#${item.maSKU}`);
        const sl = nameElement1.getAttribute("data-sl");
        if (sl > 0) {
          nameElement1.innerText = ` ${sl - 1}`;
          nameElement1.setAttribute("data-sl", sl - 1);
          const table = document.querySelector("#my-table tbody");
          let rowFound = false;

          // Duyệt qua các hàng trong bảng
          for (let i = 0; i < table.rows.length; i++) {

            const row = table.rows[i];
            console.log(row);
            const id_tbd = row
              .querySelector('[name="id_tbd"]')
              .getAttribute("value");
            const ngayhh = row.querySelector('[name="id_tbd"]').getAttribute("ngayhethan");
            console.log(ngayhh);

            // Nếu tìm thấy sản phẩm có mã SKU trùng với maSKU hiện tại, cập nhật số lượng và giá trị
            if (id_tbd === maSKU && ngayhh === ngayHetHan2) {
              const soLuongElement = row.querySelector('[name="soluong"]');
              const soLuong = parseInt(soLuongElement.value) + 1;
              soLuongElement.value = soLuong;

              const giaElement = row.querySelector(".gia");
              const gia = parseInt(giaElement.textContent);
              const totalPriceElement = row.querySelector(".total-price");
              totalPriceElement.textContent = gia * soLuong;
              rowFound = true;
              break;
            }
            if (id_tbd === maSKU && ngayhh != ngayHetHan2) {
              const tentb= row.querySelector('[name="id_tbd"]').textContent;
              alert("Đã chọn thuốc " + tentb);
              rowFound = true;
              break;
            }
          }

          // Nếu không tìm thấy sản phẩm có mã SKU trùng với maSKU hiện tại, thêm một hàng mới vào bảng
          if (!rowFound) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td >${table.rows.length + 1}</td>
            <td name="id_tbd" value="${maSKU}" ngayhethan="${item.ngayHetHan}">${ten}</td>
            <td>
            <input type="text"  name="soluong" masku="${maSKU}" value="1" onkeypress="return event.charCode >= 48 && event.charCode <= 57" onkeydown="if (event.keyCode === 13) return false;" autocomplete="off" required">
            </td>
            <td class="gia">${gia}</td>
            <td class="total-price">${gia}</td>
            <td>
              <button class="delete-row" name="${
                item.maSKU
              }" onmousedown="xoa(${item.maSKU})">
                <img src="images/delete.png" alt="">
              </button>
            </td>
          `;

            table.appendChild(newRow);
            const input = newRow.querySelector(`input[masku="${maSKU}"]`);
            input.addEventListener("change", function () {
              if(input.value==""){
                input.value=0;
                updateCartTotal();
              }
              
              if(parseInt(sl)<parseInt(input.value)){
              alert("không đủ số lượng");
              nameElement1.innerText = `${item.soLuong}`;
              nameElement1.setAttribute("data-sl",`${item.soLuong}`);
              input.value=0;
              
              }else{
                nameElement1.innerText = `${item.soLuong}`-input.value;
              nameElement1.setAttribute("data-sl",`${item.soLuong}`-input.value);
              }
            })
            const quantityInput = newRow.querySelector('input[name="soluong"]');
            quantityInput.addEventListener("input", function (event) {
              const quantity = parseInt(this.value);
              const priceElement = newRow.querySelector(".gia");
              const price = parseFloat(
                priceElement.textContent.replace("đ", "").replace(",", ".")
              );
              const totalPriceElement = newRow.querySelector(".total-price");
              const totalPrice = quantity * price;
              totalPriceElement.textContent = totalPrice;

              updateCartTotal();
            });
          }
          updateCartTotal();
          
        } else {
          alert("đã hết");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
//ràng buộc
// function nhapslgh() {
//   const inputSoluong = document.querySelector('input[name="soluong"]');
//   const td = row.getElementsByTagName("td")[2];
//   const input = td.querySelector('input[name="soluong"]');
//   const inputValue = input.value;
//   //timd thuốc trả về soluong
//   const ma = masku.getAttribute("name");
//   const nameElement = document.getElementById(ma);
//   nameElement.innerText = ` ${
//     parseInt(nameElement.innerText) + parseInt(inputValue)
//   }`;
//   nameElement.setAttribute("data-sl", nameElement.innerText);
// }

function updateCartTotal() {
  const table = document.querySelector("#my-table tbody");
  let total = 0;
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i];
    const priceElement = row.querySelector(".gia");
    const price = parseFloat(
      priceElement.textContent.replace("đ", "").replace(",", ".")
    );
    const quantityInput = row.querySelector('input[name="soluong"]');
    const quantity = parseInt(quantityInput.value);
    const rowTotalPrice = price * quantity;
    const rowTotalPriceElement = row.querySelector(".total-price");
    rowTotalPriceElement.textContent = rowTotalPrice;
    total += rowTotalPrice;

    // Gắn sự kiện input vào input số lượng của sản phẩm
    quantityInput.addEventListener("input", function (event) {
      const quantity = parseInt(this.value);
      const priceElement = row.querySelector(".gia");
      const price = parseFloat(
        priceElement.textContent.replace("đ", "").replace(",", ".")
      );
      const totalPriceElement = row.querySelector(".total-price");
      const totalPrice = quantity * price;
      totalPriceElement.textContent = totalPrice;

      updateCartTotal();
    });
  }
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        addItemToCart(cartItems[i]);
      }

      // Thêm sự kiện lắng nghe click vào button Xoá để cập nhật giá tiền
      const deleteButtons = document.querySelectorAll(".delete-button");
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function (event) {
          updateCartTotal();
        });
      }
    }
  }

  const totalElement = document.getElementById("total-price");
  totalElement.textContent = `${total} đ`;

  const tax = total * 0.1;
  const taxElement = document.getElementById("tax-price");
  taxElement.textContent = `${tax} đ`;

  const finalTotal = total + tax;
  const finalTotalElement = document.getElementById("final-total-price");
  finalTotalElement.textContent = `${finalTotal} đ`;
}

function xoa(masku) {
  console.log(masku.getAttribute("name"));
  const button = masku;
  button.addEventListener("click", () => {
    const row = button.parentNode.parentNode;
    //lấy soluong table
    const td = row.getElementsByTagName("td")[2];
    const input = td.querySelector('input[name="soluong"]');
    const inputValue = input.value;
    console.log(inputValue);
    //timd thuốc trả về soluong
    const ma = masku.getAttribute("name");
    const nameElement = document.getElementById(ma);
    console.log(nameElement.innerText);
    nameElement.innerText = ` ${
      parseInt(nameElement.innerText) + parseInt(inputValue)
    }`;
    nameElement.setAttribute("data-sl", nameElement.innerText);
    if (row.parentNode) {
      // Xóa phần tử tr chứa nút "Xoá" được nhấn
      row.parentNode.removeChild(row);
    }
  });
}

function addItemToCart(item) {
  // ...
  // Thêm button Xoá vào hàng
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "Xoá";
  deleteButton.addEventListener("click", function (event) {
    xoa();
    updateCartTotal();
  });
  cell5.appendChild(deleteButton);
}
function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart"));
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      addItemToCart(cartItems[i]);
    }

    // Gắn sự kiện click vào button Xoá để cập nhật giá trị Tổng tiền, Tiền thuế GTGT và Tổng thanh toán
    const deleteButtons = document.querySelectorAll(".delete-button");
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function (event) {
        xoa();
        updateCartTotal();
      });
    }
  }
}

function nhanhuy() {
  // Lấy thẻ <button> có class "huy"
  var saveButton = document.querySelector(".huy");
  console.log(saveButton);
  // Thêm sự kiện nhấp vào thẻ "Lưu hoá đơn"
  saveButton.addEventListener("click", function () {
    var container = document.querySelector(".containier");
    var otherContainer = document.querySelector(".other");

    // Ẩn phần tử "otherContainer" và hiển thị lại "container"
    otherContainer.style.display = "none";
    container.style.display = "block";
  });

  // Lưu trạng thái ban đầu của bảng khi nó được tạo
  var initialTableHTML = document.querySelector("table").innerHTML;

  // Lấy thẻ <button> có class "huy"
  var cancelButton = document.querySelector(".huy");

  // Thêm sự kiện nhấp vào nút "Hủy"
  cancelButton.addEventListener("click", function () {
    // Lấy thẻ <table>
    var table = document.querySelector("table");

    // Khôi phục lại trạng thái ban đầu của bảng
    table.innerHTML = initialTableHTML;
  });
}
