function timThuoc() {
  const select = document.getElementById("timkiemthuoc");
  const selectedValue = select.value;
  const cn = sessionStorage.getItem("cn");
  const inputtk = document.getElementById("inputtimkiem");
  
  console.log(selectedValue);
  const dsthuoc = JSON.parse(sessionStorage.getItem("dsthuoc"));
  const ds=[];
  console.log(dsthuoc);
  const inputtimkiem=document.getElementById("inputtimkiem");
  if(inputtimkiem.value==""){
    hienThiTatCaBanHang()
  }
  if (selectedValue == "tenbietduoc") {
    fetch(`http://localhost:3000/qlnt/thuoc/tbd/${cn}/${inputtk.value}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
        for(let i=0;i<data.length;i++){
          for(let j=0;j<dsthuoc.length;j++){
            if(data[i].maSKU==dsthuoc[j].maSKU){
              console.log(dsthuoc[i])
              ds.push(dsthuoc[j]);
            }
          }
          }
          hientimDanhSach(ds);   
      })
      .catch(function (error) {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  } else if (selectedValue == "hoatchat") {
    fetch(`http://localhost:3000/qlnt/thuoc/hc/${cn}/${inputtk.value}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
        for(let i=0;i<data.length;i++){
          for(let j=0;j<dsthuoc.length;j++){
            if(data[i].maSKU==dsthuoc[j].maSKU){
              console.log(dsthuoc[i])
              ds.push(dsthuoc[j]);
            }
          }
          }
          hientimDanhSach(ds);   
      })
      .catch(function (error) {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  } else if (selectedValue == "nhomthuoc") {
    fetch(`http://localhost:3000/qlnt/thuoc/nt/${cn}/${inputtk.value}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data); 
        for(let i=0;i<data.length;i++){
          for(let j=0;j<dsthuoc.length;j++){
            if(data[i].maSKU==dsthuoc[j].maSKU){
              console.log(dsthuoc[i])
              ds.push(dsthuoc[j]);
            }
          }
          }
          hientimDanhSach(ds);   
      })
      .catch(function (error) {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  } else {
    alert("không đúng giá trị");
  }
}
function hientimDanhSach(data){
  const container = document.getElementById("container-banhang");
    container.innerHTML = "";

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
}