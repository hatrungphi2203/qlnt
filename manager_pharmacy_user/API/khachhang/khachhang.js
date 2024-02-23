function hienKhachHang(){
    const params = {
        maKhachHang: '1',
        tenKhachHang: 'QQ',
        tichDiem: 'QQ',
        sdtKH: 'CQQ',
     };
  
     const queryString = new URLSearchParams(params).toString();
  
     fetch(`http://localhost:3000/qlnt/khach/?${queryString}`)
        .then(response => response.json())
        .then(data => {
           const list = document.getElementById('myULSDT');
           list.innerHTML = '';
  
           for (let i = 0; i < data.length; i++) {
              const listItem = document.createElement('li');
              listItem.innerText = data[i].sdtKH;
              listItem.setAttribute('data-makhachhang', data[i].sdtKH);
              list.appendChild(listItem);
           }
        })
        .catch(error => console.log(error));
}
function timSDT() {
   var input = document.getElementById("timsdt");
   var filter = input.value.toUpperCase();
   var ul = document.getElementById("myULSDT");
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
   chonSDT();
}

function chonSDT() {
   const list = document.getElementById('myULSDT');
   const input = document.getElementById('timsdt');

   list.addEventListener('click', function (e) {
      const li = e.target;
      if (li.tagName === 'LI') {
         input.value = li.innerText;
         list.style.display = 'none';
         const maKH = li.getAttribute('data-makhachhang');
         input.setAttribute('data-maKH', maKH);

      }
   });
}
hienKhachHang();


// Sử dụng phương thức fetch để tải danh sách các nhà sản xuất từ địa chỉ URL 'http://localhost:3000/qlnt/khach/'
fetch('http://localhost:3000/qlnt/khach/')
  // Chuyển đổi kết quả trả về thành một đối tượng JavaScript bằng phương thức json()
  .then(response => response.json())
  // Lưu trữ danh sách các nhà sản xuất vào biến listItems
  .then(data => {
    const listItems = data;

    // Lấy tham chiếu đến phần tử input với id là 'timsdt' và lưu vào biến inputElementNSXKh
    const inputElementkh = document.getElementById('timsdt');
    // Khai báo biến timeoutId để sử dụng trong tương lai (không được sử dụng trong đoạn mã trên)
    let timeoutId;

    // Thêm các xử lý sự kiện cho phần tử inputElementNSX
    inputElementkh.addEventListener('focusout', (event) => {
      // Khi phần tử inputElementNSX bị mất focus (sự kiện "focusout"), loại bỏ thông báo lỗi (nếu có) và class "error" khỏi phần tử input
      const errorElement = event.target.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
        event.target.classList.remove('error');
      }
    });

    inputElementkh.addEventListener('input', (event) => {
      // Khi giá trị của phần tử inputElementNSX bị thay đổi (sự kiện "input"), kiểm tra giá trị nhập vào và hiển thị thông báo lỗi nếu cần thiết
      const inputText = event.target.value.trim();
      let found = false;

      for (let i = 0; i < listItems.length; i++) {
        // So sánh giá trị nhập vào với tên của từng nhà sản xuất trong danh sách listItems
        const listItemText = listItems[i].sdtKH;
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

    inputElementkh.addEventListener('focus', (event) => {
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


// Xử lý sự kiện
// dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ
window.addEventListener("load", () => {
  document.getElementById("content1").style.display = "block";
});
// hết dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ

function showContent(id) {
  var content = document.getElementsByClassName("content");
  var menu = document
    .getElementsByClassName("menu")[0]
    .getElementsByTagName("a");

  // Ẩn tất cả các phần tử nội dung
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // Hiển thị phần tử nội dung tương ứng với mục được chọn
  var selectedContent = document.getElementById("content" + id);
  selectedContent.style.display = "block";

  // Đổi màu sắc của mục được chọn
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("active");
  }
  menu[id - 1].classList.add("active");
}

///// giữ focus

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.forEach((otherLink) => otherLink.classList.remove("focus"));
    link.classList.add("focus");
  });
});





$("#example3").DataTable({
  select: true,
  dom: "Bfrtip",
  buttons: [
    {
      extend: "copyHtml5",
      exportOptions: {
        columns: [0, 1, 2],
      },
    },
       {
      extend: "excelHtml5",
      exportOptions: {
        columns: [0, 1, 2],
      },
    },
    {
      extend: "pdfHtml5",
      exportOptions: {
        columns: [0, 1, 2],
      },
    },
    {
      extend: "print",
      exportOptions: {
        columns: [0, 1, 2],
      },
    },
  ],
  // data: data,
  // columns: [
  //   { data: "maSKU" },
  //   { data: "tenBietDuoc" },
  //   { data: "soLo" },
  //   { data: "ngayHetHan" },
  //   { data: "ngaySanXuat" },
  //   { data: "soLuong" },
  // ],
  columnDefs: [
    {
      targets: "_all",
      defaultContent: "-",
    },
  ],
  language: {
    emptyTable: "Không có dữ liệu trong danh sách",
    zeroRecords: "Không tìm thấy dữ liệu",
    info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
    infoEmpty: "Hiển thị 0 đến 0 của 0 bản ghi",
    infoFiltered: "(lọc từ _MAX_ tổng số bản ghi)",
    search: "Tìm kiếm:",
    lengthMenu: "Hiển thị _MENU_ dòng",
    paginate: {
      first: "Đầu tiên",
      last: "Cuối cùng",
      next: "Tiếp theo",
      previous: "Trước đó",
    },
  },
  lengthMenu: [5, 10, 25, 50],
  pageLength: null, // ẩn đi tùy chọn "Hiển thị x dòng"
});
