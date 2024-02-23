function hiendsHoaDon() {
  const cn = sessionStorage.getItem("cn");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");
  tenChiNhanhElement.innerText = cn;

  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const tennvElement = document.getElementById("tennv");
  tennvElement.innerText = nv[0];
  $(document).ready(function () {
    let table = $("#example").DataTable({
      ajax: {
        url: `http://localhost:3000/qlnt/hoadon/${cn}`,
        dataSrc: "",
      },
      columns: [
        { data: "soHoaDon" },
        { data: "ngay" },
        { data: "gio" },
        { data: "tenKhachHang" },
        { data: "tenNhanVien" },
        { data: "tongTien" },
        { data: "thue" },
        { data: "thanhTien" },
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
            columns: [0, 1, 2, 3, 4, 5, 6, 7],
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7],
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6, 7],
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

    // Bắt sự kiện click trên từng dòng trong DataTable
    $("#example tbody").on("click", "tr", function () {
      // Lấy thông tin trên dòng được click
      var data = table.row(this).data();
      const tableBody = document.getElementById("chitiet_hd");
      tableBody.innerHTML = "";
      fetch(`http://localhost:3000/qlnt/hoadon/ct/${data.soHoaDon}`)
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            const row = document.createElement("tr");
            // Tạo đối tượng Date từ chuỗi đầu vào
            const soHDCell = document.createElement("td");
            soHDCell.innerText = data[i].soHoaDon;
            row.appendChild(soHDCell);
            const maSKUCell = document.createElement("td");
            maSKUCell.innerText = data[i].maSKU;
            row.appendChild(maSKUCell);
            const tenBietDuocCell = document.createElement("td");
            tenBietDuocCell.innerText = data[i].tenBietDuoc;
            row.appendChild(tenBietDuocCell);
            const soLuongCell = document.createElement("td");
            soLuongCell.innerText = data[i].soLuong;
            row.appendChild(soLuongCell);
            const donGiaCell = document.createElement("td");
            donGiaCell.innerText = data[i].donGia;
            row.appendChild(donGiaCell);
            const tongTienCell = document.createElement("td");
            tongTienCell.innerText = data[i].tongTien;
            row.appendChild(tongTienCell);
            tableBody.appendChild(row);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
}
hiendsHoaDon();
