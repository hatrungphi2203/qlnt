function hienNSX() {
   const params = {
      maNhaSanXuat: 'CTYHG',
      tenNhaSanXuat: 'Cong Ty Co phan duoc Hau Giang',
   };

   const queryString = new URLSearchParams(params).toString();

   fetch(`http://localhost:3000/qlnt/nsx/?${queryString}`)
      .then(response => response.json())
      .then(data => {
         const list = document.getElementById('myUL');
         list.innerHTML = '';

         for (let i = 0; i < data.length; i++) {
            const listItem = document.createElement('li');
            listItem.innerText = data[i].tenNhaSanXuat;
            listItem.setAttribute('data-maNhaSanXuat', data[i].maNhaSanXuat);
            list.appendChild(listItem);
         }
      })
      .catch(error => console.log(error));
}


function timNSX() {
   var input = document.getElementById("tennhasanxuat");
   var filter = input.value.toUpperCase();
   var ul = document.getElementById("myUL");
   var li = ul.getElementsByTagName("li");
   for (var i = 0; i < li.length; i++) {
      var txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
         li[i].style.display = "block";
      } else {
         li[i].style.display = "none";
      }
   }
   if (filter === "") {
      ul.style.display = "none";
   } else {
      ul.style.display = "block";
   }
   chonNSX();
}

function chonNSX() {
   const list = document.getElementById('myUL');
   const input = document.getElementById('tennhasanxuat');

   list.addEventListener('click', function (e) {
      const li = e.target;
      if (li.tagName === 'LI') {
         input.value = li.innerText;
         list.style.display = 'none';
         const maNSX = li.getAttribute('data-maNhaSanXuat');
         input.setAttribute('data-maNSX', maNSX);

      }
   });
}
hienNSX();


// Sử dụng phương thức fetch để tải danh sách các nhà sản xuất từ địa chỉ URL 'http://localhost:3000/qlnt/nsx/'
fetch('http://localhost:3000/qlnt/nsx/')
  // Chuyển đổi kết quả trả về thành một đối tượng JavaScript bằng phương thức json()
  .then(response => response.json())
  // Lưu trữ danh sách các nhà sản xuất vào biến listItems
  .then(data => {
    const listItems = data;

    // Lấy tham chiếu đến phần tử input với id là 'tennhasanxuat' và lưu vào biến inputElementNSX
    const inputElementNSX = document.getElementById('tennhasanxuat');
    // Khai báo biến timeoutId để sử dụng trong tương lai (không được sử dụng trong đoạn mã trên)
    let timeoutId;

    // Thêm các xử lý sự kiện cho phần tử inputElementNSX
    inputElementNSX.addEventListener('focusout', (event) => {
      // Khi phần tử inputElementNSX bị mất focus (sự kiện "focusout"), loại bỏ thông báo lỗi (nếu có) và class "error" khỏi phần tử input
      const errorElement = event.target.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
        event.target.classList.remove('error');
      }
    });

    inputElementNSX.addEventListener('input', (event) => {
      // Khi giá trị của phần tử inputElementNSX bị thay đổi (sự kiện "input"), kiểm tra giá trị nhập vào và hiển thị thông báo lỗi nếu cần thiết
      const inputText = event.target.value.trim();
      let found = false;

      for (let i = 0; i < listItems.length; i++) {
        // So sánh giá trị nhập vào với tên của từng nhà sản xuất trong danh sách listItems
        const listItemText = listItems[i].tennhomthuoc;
        if (listItemText === inputText) {
          found = true;
          break;
        }
      }

      if (found) {
        // Nếu giá trị nhập vào chính xác thì loại bỏ thông báo lỗi (nếu có) và class "error" khỏi phần tử input
        const errorElement = event.target.parentElement.querySelector('.error-message');
        if (errorElement) {
          errorElement.remove();
          event.target.classList.remove('error');
        }
      } else {
        // Nếu không tìm thấy giá trị nhập vào trong danh sách, thêm thông báo lỗi và class "error" vào phần tử input nếu phần tử input đang có focus
        const parentElement = event.target.parentElement;
        const errorElement = parentElement.querySelector('.error-message');
        if (!errorElement && event.target === document.activeElement) {
          const errorElement = document.createElement('span');
          errorElement.className = 'error-message';
          errorElement.textContent = 'Giá trị nhập vào không hợp lệ. Vui lòng nhập lại hoặc chọn từ danh sách.';
          parentElement.appendChild(errorElement);
        }
        event.target.classList.add('error');
      }
    });

    inputElementNSX.addEventListener('focus', (event) => {
      // Khi phần tử inputElementNSX được focus (sự kiện "focus"), loại bỏ thông báo lỗi (nếu có) và class "error" khỏi phần tử input
      const errorElement = event.target.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
        event.target.classList.remove('error');
      }
    });
  })
  // Nếu có lỗi xảy ra trong quá trình tải danh sách nhà sản xuất hoặc xử lý sự kiện, in ra thông báo lỗi trên console của trình duyệt
  .catch(error => console.error(error));