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

// Phiếu nhập
function showPN(id) {
  var content = document.getElementsByClassName("contentpn");
  var menu = document
    .getElementsByClassName("nhapkhomenu")[0]
    .getElementsByTagName("a");

  // Ẩn tất cả các phần tử nội dung
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // Hiển thị phần tử nội dung tương ứng với mục được chọn
  var selectedContent = document.getElementById("contentpn" + id);
  selectedContent.style.display = "block";

  // Đổi màu sắc của mục được chọn
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("active");
  }
  menu[id - 1].classList.add("active");
}
// dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ
window.addEventListener("load", () => {
  document.getElementById("contentpn1").style.display = "block";
});
// hết dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ

// Phiếu xuất
function showPX(id) {
  var content = document.getElementsByClassName("contentpx");
  var menu = document
    .getElementsByClassName("xuatkhomenu")[0]
    .getElementsByTagName("a");

  // Ẩn tất cả các phần tử nội dung
  for (var i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }

  // Hiển thị phần tử nội dung tương ứng với mục được chọn
  var selectedContent = document.getElementById("contentpx" + id);
  selectedContent.style.display = "block";

  // Đổi màu sắc của mục được chọn
  for (var i = 0; i < menu.length; i++) {
    menu[i].classList.remove("active");
  }
  menu[id - 1].classList.add("active");
}
// dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ
window.addEventListener("load", () => {
  document.getElementById("contentpx1").style.display = "block";
});
// hết dữ content 1 hiện khi vừa vào trang cũng như đổi màu đỏ

// ràng buộc table
const table = document.getElementById("my-table");
const rows = table.getElementsByTagName("tr");
if (rows.length > 5) {
  table.style.height = "250px";
}

const table1 = document.getElementById("my-table");
const rowsToShow = 5;

table1.style.maxHeight = `${rowsToShow * table1.rows[1].clientHeight}px`;

// data table