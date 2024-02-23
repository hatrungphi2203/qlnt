function hienDSThuocPN() {
  const cn = sessionStorage.getItem("cn");
  if ($.fn.DataTable.isDataTable("#example")) {
    // Nếu đã khởi tạo rồi thì hủy DataTable
    $("#example").DataTable().destroy();
  } 
  $(document).ready(function () {
      let table = $("#example").DataTable({
        ajax: {
          url: `http://localhost:3000/qlnt/phieunhap/${cn}`,
          dataSrc: "",
        },
        columns: [
          { data: "soPhieuNhap" },
          { data: "maNhanVien" },
          { data: "maSoThue" },
          { data: "ngayNhap" },
          { data: "doiTuong" },
          { data: "dieuChuyenTu" },
          { data: "dienGiai" },
          { data: "loaiChungTu" },
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
      const tableBody = document.getElementById("chitiet_pn");
      tableBody.innerHTML = "";
      fetch(`http://localhost:3000/qlnt/phieunhap/ct/${cn}/${data.soPhieuNhap}`)
        .then((response) => response.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            const row = document.createElement("tr");
            // Tạo đối tượng Date từ chuỗi đầu vào
            const date = new Date(data[i].ngaySanXuat);
            // Chuyển đổi thời gian sang định dạng chuỗi theo giờ Việt Nam
            const options = {
              timeZone: "Asia/Ho_Chi_Minh",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            };
            const ngaySanXuat = date.toLocaleString("vi-VN", options);

            const soPhieuXuatCell = document.createElement("td");
            soPhieuXuatCell.innerText = data[i].soPhieuNhap;
            row.appendChild(soPhieuXuatCell);

            const maSKUCell = document.createElement("td");
            maSKUCell.innerText = data[i].maSKU;
            row.appendChild(maSKUCell);

            const tenBietDuocCell = document.createElement("td");
            tenBietDuocCell.innerText = data[i].tenBietDuoc;
            row.appendChild(tenBietDuocCell);

            const soLoCell = document.createElement("td");
            soLoCell.innerText = data[i].soLo;
            row.appendChild(soLoCell);

            const ngaySanXuatCell = document.createElement("td");
            ngaySanXuatCell.innerText = ngaySanXuat;
            row.appendChild(ngaySanXuatCell);

            const soLuongCell = document.createElement("td");
            soLuongCell.innerText = data[i].soLuong;
            row.appendChild(soLuongCell);

            tableBody.appendChild(row);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  //}
  });

}
function addPhieuNhap() {
  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const maNhanVien = nv[1];
  const data = [];
  const seenKTtrung = new Set();


  const cn = sessionStorage.getItem("cn");
  const maSoThueInput = document.getElementById("ma_so_thue");
  const doiTuongInput = document.getElementById("doi_tuong");
  const dieuChuyenTuInput = document.getElementById("dieu_chuyen_tu");
  const loaiChungTuInput = document.getElementById("loai_chung_tu");
  const dienGiaiInput = document.getElementById("note");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");
  const tBody = document.querySelector("#my-tablenhapctpn tbody");
  var rows = tBody.getElementsByTagName("tr");
  if(rows.length==0){
    alert("Vui lòng thêm hàng cho chi tiết phiếu nhập.");
    return;
  }else if (
    !maSoThueInput.value ||
    !dieuChuyenTuInput.value ||
    !dienGiaiInput.value
  ) {
    alert("Vui lòng nhập đầy đủ thông tin trên phiếu nhập.");
    return;
  } else {
    const PhieuNhap = {
      maNhanVien: maNhanVien,
      maSoThue: maSoThueInput.value,
      doiTuong: doiTuongInput.value,
      dieuChuyenTu: dieuChuyenTuInput.value,
      loaiChungTu: loaiChungTuInput.getAttribute("value"),
      dienGiai: dienGiaiInput.value,
      tenchinhanh: tenChiNhanhElement.textContent,
    };

    data.push(PhieuNhap);

    const CTPN = document.querySelector("#my-tablenhapctpn tbody");
    const rows = CTPN.querySelectorAll("tr");
    let flag = true;
    console.log(CTPN);
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");

      if (
        !cells[2].querySelector("input[name='so_lo']").value ||
        !cells[3].querySelector("input[name='ngay_sx']").value ||
        !cells[4].querySelector("input[name='so_luong']").value
      ) {
        flag = false;
        return;
      } else if (
        cells[2].querySelector("input[name='so_lo']").value ||
        cells[3].querySelector("input[name='ngay_sx']").value ||
        cells[4].querySelector("input[name='so_luong']").value
      ) {
        const chitietPN = {
          maSKU: cells[0].querySelector("input[name='masku']").value,
          soLo: cells[2].querySelector("input[name='so_lo']").value,
          ngaySanXuat: cells[3].querySelector("input[name='ngay_sx']").value,
          soLuong: cells[4].querySelector("input[name='so_luong']").value,
        };
        const chitietPNtrung = {
          maSKU: cells[0].querySelector("input[name='masku']").value,
          soLo: cells[2].querySelector("input[name='so_lo']").value,
          ngaySanXuat: cells[3].querySelector("input[name='ngay_sx']").value
        };
        if (!seenKTtrung.has(JSON.stringify(chitietPNtrung))) {
          seenKTtrung.add(JSON.stringify(chitietPNtrung));
          data.push(chitietPN);
        }else{
          alert("Mời nhập lại dữ liệu do trùng biệt dược, số lô, ngày sản xuất.");
          flag = false;
        }
       
      }
    });
    if (flag == true) {
      fetch("http://localhost:3000/qlnt/phieunhap/addPN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("lưu thành công");
            location.reload();
          } else {
            alert("lưu  thất bại");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Vui lòng nhập đầy đủ và không trùng thông tin trong chi tiết nhập phiếu nhập.");
    }
  }
}
