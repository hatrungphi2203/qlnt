function hienThiDSKhoThuoc() {
  $(document).ready(function () {
    $("#example").DataTable({
      ajax: {
        url: "http://localhost:3000/qlnt/kho/",
        dataSrc: "",
      },
      columns: [
        { data: "maSKU" },
                { data: "tenBietDuoc" },
                { data: "ngayHetHan" },
                { data: "ngaySanXuat" },
                { data: "soLuong" },
                { data: "giaBan" },
                { data: "tenChiNhanh" },
      ],
      dom: "Bfrtip",
      style: {
        width: "100%",
      },
      buttons: [
        {
          extend: "copyHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6],
          },
        },
        {
          extend: "excelHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6],
          },
        },
        {
          extend: "pdfHtml5",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6],
          },
        },
        {
          extend: "print",
          exportOptions: {
            columns: [0, 1, 2, 3, 4, 5, 6],
          },
        },
      ],
      "language": {
        "emptyTable": "Không có dữ liệu trong danh sách",
        "zeroRecords": "Không tìm thấy dữ liệu",
        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ dòng",
        "infoEmpty": "Hiển thị 0 đến 0 của 0 bản ghi",
        "infoFiltered": "(lọc từ _MAX_ tổng số bản ghi)",
        "search": "Tìm kiếm:",
        "lengthMenu": "Hiển thị _MENU_ dòng",
        "paginate": {
          "first": "Đầu tiên",
          "last": "Cuối cùng",
          "next": "Tiếp theo",
          "previous": "Trước đó"
        }
      },
      "lengthMenu": [8],
      "pageLength": 8, // ẩn đi tùy chọn "Hiển thị x dòng"
    });
  });
   
  }
  hienThiDSKhoThuoc();