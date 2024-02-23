function hienThiTatCa() {

  $(document).ready(function () {
    let table = $("#example-nhanvien").DataTable({
      ajax: {
        url: "http://localhost:3000/qlnt/nhanvien/",
        dataSrc: "",
      },
      columns: [
        { data: "maNhanVien" },
        { data: "tenChiNhanh" },
        { data: "cccd" },
        { data: "tenNhanVien" },
        { data: "ngaySinh" },
        {
          data: "gioiTinh",
          render: function (data, type, row, meta) {
            return data == '0' ? 'Nam' : 'Nữ';
          }
        },
        { data: "sdt" },
        { data: "diaChi" },
        { data: "maUser" },
        { // Thêm cột chứa nút xóa
          data: null,
          className: "text-center",
          render: function (data, type, row, meta) {
            return '<button type="button" class="btn btn-primary update-btn">Cập nhật</button>';
          },
        },

      ],
      editable: true, // bật tính năng sửa
      dom: "Bfrtip",
      autoWidth: false,
      style: {
        width: "100%",
      },
      buttons: [
        {
          extend: "copyHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
        },
      ],
      "language": {
        "emptyTable": "Không có dữ liệu trong danh sách",
        "zeroRecords": "Không tìm thấy dữ liệu",
        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
        "infoEmpty": "Hiển thị 0 đến 0 của 0 bản ghi",
        "infoFiltered": "(lọc từ _MAX_ tổng số bản ghi)",
        "search": "",
        "lengthMenu": "Hiển thị _MENU_ dòng",
        "paginate": {
          "first": "Đầu tiên",
          "last": "Cuối cùng",
          "next": "Tiếp theo",
          "previous": "Trước đó"
        }
      },
      "lengthMenu": [4, 10, 25, 50],
      "pageLength": 4, // ẩn đi tùy chọn "Hiển thị x dòng"
    });
    // Gán sự kiện click cho nút "Cập nhật"
    $('#example-nhanvien tbody').on('click', '.update-btn', function () {
      var row = table.row($(this).parents('tr'));
      var data = row.data();
      console.log(data);
      // Thực hiện chức năng cập nhật với dữ liệu của hàng được chọn
      hienThi2(
        4,
        data.maNhanVien,
        data.tenChiNhanh,
        data.cccd,
        data.tenNhanVien,
        data.ngaySinh,
        data.gioiTinh == '0' ? 'Nam' : 'Nữ',
        data.sdt,
        data.diaChi
      );
    });


  });

}




//Hết hiện và sửa nhân viên

let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

///// sửa nè

// Lấy phần tử modal
var modal = document.getElementById("myModal");

// Kiểm tra xem phần tử modal có tồn tại không
if (modal) {
  // Lấy nút đóng modal
  var closeBtn = modal.querySelector(".close");

  // Mở modal khi nhấn vào button
  function openModal() {
    modal.style.display = "block";
  }

  // Đóng modal khi nhấn vào nút đóng
  if (closeBtn) {
    closeBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  // Đóng modal khi nhấn vào bất kỳ đâu bên ngoài modal
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function showContent(id) {
  // Lấy các phần tử nội dung và menu
  var content = document.getElementsByClassName("content");
  var menu = document
    .getElementsByClassName("menu")[0]
    .getElementsByTagName("a");

  // Ẩn tất cả các phần tử nội dung
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // Hiển thị phần tử nội dung tương ứng với mục được chọn
  document.getElementById("content" + id).style.display = "block";

  // Đổi màu sắc của mục được chọn
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("active");
  }
  menu[id - 1].classList.add("active");
}

// Lấy phần tử table-container
var tableContainer = document.querySelector(".table-container");

// Lấy phần tử toggle-button
var toggleButton = document.querySelector(".toggle-button");

// Kiểm tra xem các phần tử có tồn tại không
if (tableContainer && toggleButton) {
  // Thêm sự kiện click vào toggle-button
  toggleButton.addEventListener("click", function () {
    tableContainer.classList.toggle("show");
  });
}

function hienThi2(
  id,
  maNhanVien,
  tenChiNhanh,
  cccd,
  tenNhanVien,
  ngaySinh,
  gioiTinh,
  sdt,
  diaChi
) {
  const label = document.getElementsByName("suaMaNV")[0];
  label.innerHTML = maNhanVien;

  const select = document.getElementById("tenchinhanh1");
  for (let i = 0; i < select.length; i++) {
    if (select[i].text == tenChiNhanh) {
      select[i].selected = true;
    }
  }

  const inputcccd = document.getElementsByName("cccd")[1];
  inputcccd.value = cccd;
  const inputtennhanvien = document.getElementsByName("tennhanvien")[1];
  inputtennhanvien.value = tenNhanVien;
  const inputngaysinh = document.getElementById("ngaysinh1");
  const [day, month, year] = ngaySinh.split("-");
  const dateString = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  console.log(dateString);
  inputngaysinh.value = ngaySinh;
  const inputGioiTinhNam = document.getElementById("nam1");
  const inputGioiTinhNu = document.getElementById("nu1");
  if (gioiTinh === "Nam") {
    inputGioiTinhNam.checked = true;
  } else {
    inputGioiTinhNu.checked = true;
  }

  const inputSDT = document.getElementsByName("sdt")[1];
  inputSDT.value = sdt;

  const inputDiaChi = document.getElementsByName("diachi")[1];
  inputDiaChi.value = diaChi;
  // const label = document.getElementsByName("suaMaNV")[0];
  // label.innerHTML = maNhanVien1;

  // Lấy các phần tử nội dung và menu
  var content = document.getElementsByClassName("content");
  var menu = document
    .getElementsByClassName("menu")[0]
    .getElementsByTagName("a");

  // Ẩn tất cả các phần tử nội dung
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // Hiển thị phần tử nội dung tương ứng với mục được chọn
  document.getElementById("content" + id).style.display = "block";

  // Đổi màu sắc của mục được chọn
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("active");
  }
  menu[id - 1].classList.add("active");
  // Hiển thị giá trị của tham số maNhanVien trên label "suaMaNV"
}

//// Sửa ///////////
function suaNhanVien() {
  const maNhanVien = document.getElementById("maNhanVien").textContent;
  const tenchinhanh = document.getElementById("tenchinhanh1");
  const cccd = document.getElementById("cccd1").value;
  const tenNhanVien = document.getElementById("tennhanvien1").value;
  const ngaySinh = document.getElementById("ngaysinh1").value;
  const gioiTinhInputs = document.getElementsByName("gioitinh1");
  let gioiTinhValue;
  for (let i = 0; i < gioiTinhInputs.length; i++) {
    if (gioiTinhInputs[i].checked) {
      gioiTinhValue = gioiTinhInputs[i].value;
      break;
    }
  }

  const sdt = document.getElementById("sdt1").value;
  const diaChi = document.getElementById("diachi1").value;
  const requiredInputs = document.querySelectorAll(".form-sua [required]");

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
  console.log(sdt.length);

  if (sdt.length !== 10) {
    alert('Số điện thoại phải có độ dài là 10 số.');
    return;
  }

  if (cccd.length !== 12) {
    alert('Số CCCD phải có độ dài là 12 số.');
    return;
  }

  if (hasEmptyFields) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  const ngaySinhDate = new Date(ngaySinh);
  const today = new Date();
  const minNgaySinh = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());
  const maxNgaySinh = new Date(today.getFullYear() - 22, today.getMonth(), today.getDate());
  if (ngaySinhDate > maxNgaySinh || ngaySinhDate < minNgaySinh) {
    alert('Ngày sinh không hợp lệ');
    return;
  }

  const data = {
    maNhanVien: maNhanVien,
    tenChiNhanh: tenchinhanh.options[tenchinhanh.selectedIndex].text,
    cccd: cccd,
    tenNhanVien: tenNhanVien,
    ngaySinh: ngaySinh,
    gioiTinh: gioiTinhValue == "nam" ? 0 : 1,
    sdt: sdt,
    diaChi: diaChi,
  };
  console.log(data);
  // Gửi dữ liệu bằng AJAX
  fetch("http://localhost:3000/qlnt/nhanvien/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // Xử lý khi gửi dữ liệu thành công
        alert("Cập nhật thành công.");
        //
        window.location.href =
          "quanlynhanvien.html";
      } else {
        // Xử lý khi có lỗi xảy ra
        alert("Lưu thất bại.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}