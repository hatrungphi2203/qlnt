function hienDSThuocTrongKho() {
  const cn = sessionStorage.getItem("cn");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");
  tenChiNhanhElement.innerText = cn;

  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const tennvElement = document.getElementById("tennv");
  tennvElement.innerText = nv[0];

  const tenChiNhanhDCElement = document.getElementById("doi_tuong");
  tenChiNhanhDCElement.value = cn;
  const tenCnDCElement = document.getElementById("doi_tuong_px");
  tenCnDCElement.value = cn;

  $(document).ready(function () {
    let table = $("#example3").DataTable({
      ajax: {
        url: `http://localhost:3000/qlnt/kho/cn/${cn}`,
        dataSrc: "",
      },
      columns: [
        { data: "maSKU" },
        { data: "tenBietDuoc" },
        { data: "ngayHetHan" },
        { data: "ngaySanXuat" },
        { data: "soLuong" },
      ],
      dom: "Bfrtip",
      autoWidth: false,
      style: {
        width: "100%",
      },
      buttons: [
        {
          extend: "copyHtml5",
          exportOptions: {
            columns:[0, 1, 2, 3, 4],
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3, 4],
          },
        },
      ],
      language: {
        emptyTable: "Không có dữ liệu trong danh sách",
        zeroRecords: "Không tìm thấy dữ liệu",
        info: "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
        infoEmpty: "Hiển thị 0 đến 0 của 0 bản ghi",
        infoFiltered: "(lọc từ _MAX_ tổng số bản ghi)",
        search: "Tìm kiếm",
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
  });
}
hienDSThuocTrongKho();


function addRow() {
  const tableBody = document.querySelector("#my-tablenhapctpn tbody");
  const row = tableBody.insertRow(); // tạo hàng mới
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5); // tạo ô mới
  const timestamp = Date.now();

  cell1.innerHTML = `<input type="text" name="masku" id="${timestamp}" list="myList" size="8" onfocus="myFunction(${timestamp})"><datalist id="myList"></datalist>`;
  cell2.innerHTML = `<input type="text" id="ten_biet_duoc" size="15" name="${timestamp}" readonly>`;
  cell3.innerHTML = '<input type="text" size="5" name="so_lo">';

  // tui ràng buộc ngày sản xuất 
  cell4.innerHTML = '<input type="date" name="ngay_sx" min="' + getMinDate() + '" max="' + getMaxDate() + '">';
  ///Khúc này mới thêm á
  // Lấy tham chiếu đến phần tử input kiểu "date"
  const ngaySxInput = cell4.querySelector("input[type='date']");

  // Đăng ký sự kiện "blur" để kiểm tra giá trị ngày được nhập
  ngaySxInput.addEventListener("blur", function (event) {
    const selectedDate = new Date(event.target.value);
    const minDate = new Date(getMinDate());
    const maxDate = new Date(getMaxDate());

    // Kiểm tra nếu ngày được nhập không nằm trong khoảng thời gian cho phép
    if (selectedDate < minDate || selectedDate > maxDate) {
      alert("Ngày sản xuất không hợp lệ. Vui lòng chọn ngày trong khoảng thời gian từ " + getMinDate() + " đến " + getMaxDate() + ".");
      event.target.value = "";  // xóa giá trị ngày không hợp lệ
    }
  });



  //ràng buộc số lượng
  cell5.innerHTML = '<input type="number" name="so_luong" size="1" min="1"  max="100000" oninput="validity.valid||(value=\'\');">';




  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Xoá';
  deleteButton.onclick = function () {
    tableBody.deleteRow(row.rowIndex - 2);
  };
  cell6.appendChild(deleteButton); // chèn nút vào ô mới
}

function myFunction(name) {
  // console.log(name);
  const cn = sessionStorage.getItem("cn");
  const input = document.getElementById(name);
  const inputtbd = document.getElementsByName(name)[0];

  //  console.log(inputtbd);
  input.addEventListener("change", function () {
    const value = input.value;
    fetch(`http://localhost:3000/qlnt/thuoc/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let tenBietDuoc = "";
        for (let i = 0; i < data.length; i++) {
          if (data[i].maSKU === value) {
            tenBietDuoc = data[i].tenBietDuoc;
            break;
          }
        }
        inputtbd.value = tenBietDuoc;
      })
      .catch((error) => console.error(error));
  });

  input.addEventListener("input", function () {
    const value = input.value;
    console.log(value);
    fetch(`http://localhost:3000/qlnt/thuoc/`)
      .then((response) => response.json())
      .then((data) => {
        let options = "";
        data.forEach((thuoc) => {
          options += `<option value="${thuoc.maSKU}">`;
        });
        document.getElementById("myList").innerHTML = options;
      })
      .catch((error) => console.error(error));
  });
}
function kiemTraNgayNhap(ngay) {
  const selectedDate = new Date(ngay.target.value);
  const minDate = new Date(getMinDate());
  const maxDate = new Date(getMaxDate());

  // Kiểm tra nếu ngày được chọn không nằm trong khoảng thời gian cho phép
  if (selectedDate < minDate || selectedDate > maxDate) {
    alert("Ngày sản xuất không hợp lệ. Vui lòng chọn ngày trong khoảng thời gian từ " + getMinDate() + " đến " + getMaxDate() + ".");
    ngay.target.value = "";  // xóa giá trị ngày không hợp lệ
  }
}
function getMinDate() {
  var date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  return date.toISOString().slice(0, 10);
}

// Hàm tính ngày lớn nhất mà người dùng có thể chọn (hiện tại)
function getMaxDate() {
  return new Date().toISOString().slice(0, 10);
}