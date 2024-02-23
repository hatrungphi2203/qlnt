function hienDSThuocPX() {
  const cn = sessionStorage.getItem("cn");
  $.ajax({
    url: `http://localhost:3000/qlnt/phieuxuat/${cn}`,
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);
      const tableBody = document.getElementById("table_px");
      tableBody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const row = document.createElement("tr");
        // Tạo đối tượng Date từ chuỗi đầu vào
        const date = new Date(data[i].ngayXuat);

        // Chuyển đổi sang múi giờ Việt Nam
        const vietnamTime = new Date(
          date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        // Tạo đối tượng Intl.DateTimeFormat để định dạng ngày và giờ
        const formatter = new Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });

        // Tạo chuỗi đầu ra
        const outputDate = formatter.format(vietnamTime).replace(/ \s*/g, " ");

        const soPhieuXuatCell = document.createElement("td");
        soPhieuXuatCell.id = "so_phieu_xuat";
        soPhieuXuatCell.innerText = data[i].soPhieuXuat;
        row.appendChild(soPhieuXuatCell);

        const maNhanVienCell = document.createElement("td");
        maNhanVienCell.innerText = data[i].maNhanVien;
        row.appendChild(maNhanVienCell);

        const maSoThueCell = document.createElement("td");
        maSoThueCell.innerText = data[i].maSoThue;
        row.appendChild(maSoThueCell);

        const ngayXuatCell = document.createElement("td");
        ngayXuatCell.innerText = outputDate;
        row.appendChild(ngayXuatCell);

        const doiTuongCell = document.createElement("td");
        doiTuongCell.innerText = data[i].doiTuong;
        row.appendChild(doiTuongCell);

        const dieuChuyenToiCell = document.createElement("td");
        dieuChuyenToiCell.innerText = data[i].dieuChuyenToi;
        row.appendChild(dieuChuyenToiCell);

        const dienGiaiCell = document.createElement("td");
        dienGiaiCell.innerText = data[i].dienGiai;
        row.appendChild(dienGiaiCell);

        const loaiChungTuCell = document.createElement("td");
        loaiChungTuCell.innerText = data[i].loaiChungTu;
        row.appendChild(loaiChungTuCell);

        tableBody.appendChild(row);

        if ($.fn.DataTable.isDataTable("#exampledspx")) {
          // Nếu đã khởi tạo rồi thì hủy DataTable
          $("#exampledspx").DataTable().destroy();
        } else {
          $("#exampledspx").DataTable().destroy();
          // Khởi tạo DataTables sau khi Ajax hoàn tất
          $("#exampledspx").DataTable({
            select: true,
            dom: "Bfrtip",
            buttons: [
              {
                extend: "copyHtml5",
                exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7],
                },
              },
              {
                extend: "csvHtml5",
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
            data: data,
            columns: [
              { data: "soPhieuXuat" },
              { data: "maNhanVien" },
              { data: "maSoThue" },
              { data: "ngayXuat" },
              { data: "doiTuong" },
              { data: "dieuChuyenToi" },
              { data: "dienGiai" },
              { data: "loaiChungTu" },
            ],
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
            // ẩn đi tùy chọn "Hiển thị x dòng"
            lengthMenu: [5],
            pageLength: null,
          });
        }
      }
      // Lấy tất cả các hàng trong bảng "myTable"
      var table = $("#exampledspx").DataTable();

      // Lấy tất cả các hàng trong DataTables
      var rows = table.rows({ search: "applied" }).nodes();

      // Lặp qua các hàng và thêm sự kiện click cho mỗi hàng
      for (var i = 0; i < rows.length; i++) {
        rows[i].addEventListener("click", function () {
          const tableBody = document.getElementById("chitiet_px");
          tableBody.innerHTML = "";
          const sophieu = this.querySelector("td:first-child").textContent;
          console.log(cn);
          fetch(`http://localhost:3000/qlnt/phieuxuat/ct/${cn}/${sophieu}`)
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
                soPhieuXuatCell.innerText = data[i].soPhieuXuat;
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
      }
    },
  });
}

function addRowPX() {
  var table = document.querySelector("#my-tablenhapctpx tbody");
  const row = table.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5); // tạo ô mới
  const timestamp = Date.now();

  cell1.innerHTML = `<input type="text" id="${timestamp}" name="maskupx" list="myList_px" size="8" onfocus="myFunctionpx(${timestamp})"><datalist id="myList_px"></datalist>`;
  cell2.innerHTML = `<input type="text" id="ten_biet_duoc_px" size="15" name="${timestamp}" readonly>`;
  cell3.innerHTML = `<input type="text" size="5" id="so_lo_px" name="${timestamp}" list="myList_pxsl" onfocus="sukiensoLo(${timestamp})"><datalist id="myList_pxsl"></datalist>`;
  cell4.innerHTML = `<input type="date" id="ngaysx_px" name="${timestamp}" readonly>`;

  //ràng buộc số lượng
  cell5.innerHTML = `<input type="text" soluong="so_luong_px" name="${timestamp}" size="1"  onkeypress="return event.charCode >= 48 && event.charCode <= 57" onkeydown="if (event.keyCode === 13) return false;" autocomplete="off" required onfocus="myFunctionpx(${timestamp})">`;

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Xoá";
  deleteButton.onclick = function () {
    table.deleteRow(row.rowIndex - 2);
  };
  cell6.appendChild(deleteButton); // chèn nút vào ô mới
}

function myFunctionpx(name) {
  const cn = sessionStorage.getItem("cn");
  const input = document.getElementById(name);
  const inputtbd = document.getElementsByName(name)[0];
  const inputngay = document.getElementsByName(name)[2];
  const inputsoLuong = document.getElementsByName(name)[3];
  // SỰ KIỆN CHO Số lượng
  inputsoLuong.addEventListener("input", function () {
    const dsthuoc = JSON.parse(sessionStorage.getItem("dsthuoc"));
    const value = input.value;
    var nghethan = input.getAttribute("ngayhethan");
    if (inputsoLuong.value <= 0) {
      inputsoLuong.value = "";
      inputsoLuong.focus();
    }
    dsthuoc.forEach(function (item) {
      if (item.maSKU == value && item.ngayHetHan == nghethan) {
        inputsoLuong.placeholder = "sl:" + item.soLuong;
        if (inputsoLuong.value > item.soLuong) {
          inputsoLuong.value = "";
        }
      }
    });
  });
  inputsoLuong.addEventListener("change", function () {
    const dsthuoc = JSON.parse(sessionStorage.getItem("dsthuoc"));
    const value = input.value;
    var nghethan = input.getAttribute("ngayhethan");
    if (inputsoLuong.value <= 0) {
      inputsoLuong.value = "";
      inputsoLuong.focus();
    }
    dsthuoc.forEach(function (item) {
      if (item.maSKU == value && item.ngayHetHan == nghethan) {
        inputsoLuong.placeholder = "sl:" + item.soLuong;
        if (inputsoLuong.value > item.soLuong) {
          inputsoLuong.value = "";
        }
      }
    });
  });
  //sự kiện của MASKU

  ///
  input.addEventListener("change", function () {
    const value = input.value;
    const parts = value.split(" -Ngày hết hạn: ");
    const maSKU = parts[0].trim();
    const ngayHetHan = parts[1]?.trim();
    input.value = maSKU;

    fetch(`http://localhost:3000/qlnt/kho/${cn}`)
      .then((response) => response.json())
      .then((data) => {
        var found = false;
        let tenBietDuoc = "";
        for (let i = 0; i < data.length; i++) {
          let date = new Date(data[i].ngayHetHan);
          let ngayHetHandata = date.toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            dateStyle: "short",
          });
          ngayHetHandata = ngayHetHandata.split(" ")[0].replace(/\//g, "-");
          if (data[i].maSKU === maSKU && ngayHetHandata == ngayHetHan) {
            let ngaySanXuat = new Date(data[i].ngaySanXuat);
            ngaySanXuat.setHours(ngaySanXuat.getHours() + 7); // Chuyển múi giờ UTC sang múi giờ Việt Nam
            let ngaySanXuatFormatted = ngaySanXuat.toISOString().slice(0, 10);
            tenBietDuoc = data[i].tenBietDuoc;
            inputngay.value = ngaySanXuatFormatted;
            input.setAttribute("ngayhethan", data[i].ngayHetHan);
            input.setAttribute("masku", data[i].maSKU);
            inputtbd.value = tenBietDuoc;
            // var datalist = document.getElementById("myList_px");
            // var options = datalist.getElementsByTagName("option");
            // var found = false;
            }
            // var inputmasku = input.getAttribute("masku");
            // var inputngayhethan = input.getAttribute("ngayhethan");
            //var chuoimasku=inputmasku+" -Ngày hết hạn: "+inputngayhethan;
            
        }
      })
      .catch((error) => console.error(error));
  });
  //
  fetch(`http://localhost:3000/qlnt/kho/${cn}`)
      .then((response) => response.json())
      .then((data) => {
        let options = "";
        data.forEach((thuoc) => {
          let date = new Date(thuoc.ngayHetHan);
          let ngayHetHan = date.toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            dateStyle: "short",
          });
          ngayHetHan = ngayHetHan.split(" ")[0].replace(/\//g, "-");
          options += `<option value="${thuoc.maSKU} -Ngày hết hạn: ${ngayHetHan}" ngayhethan="${ngayHetHan}">`;
        });
        document.getElementById("myList_px").innerHTML = options;
      })
      .catch((error) => console.error(error));
  //MASKU
  // input.addEventListener("input", function () {
    
      
  // });
}
function sukiensoLo(name) {
  //SỰ KIỆN CỦA số lô
  const input = document.getElementById(name);
  var datalist = document.getElementById("myList_pxsl");
  var options = datalist.getElementsByTagName("option");
  const inputsolo = document.getElementsByName(name)[1];
  console.log("ddddddddddddddd");
  console.log(options);
  var maskusl = input.getAttribute("masku");
  fetch(`http://localhost:3000/qlnt/kho/sl/${maskusl}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let options = "";
      data.forEach((solo) => {
        console.log(solo.soLo);
        options += `<option value="${solo.soLo}">`;
      });
      document.getElementById("myList_pxsl").innerHTML = options;
    })
    .catch((error) => console.error(error));
  inputsolo.addEventListener("change", function () {
    var found = false;

    for (var i = 0; i < options.length; i++) {
      if (inputsolo.value == options[i].value) {
        found = true;
      }
    }

    if (!found) {
      inputsolo.value = "";
      inputsolo.focus();
    }
  });
}
function addPhieuXuat() {
  const data = [];
  const seenKTtrung = new Set();

  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const maNhanVien = nv[1];
  let flag = true;
  const maSoThueInput = document.getElementById("ma_so_thue_px");
  const doiTuongInput = document.getElementById("doi_tuong_px");
  const dieuChuyenTuInput = document.getElementById("dieu_chuyen_toi");
  const loaiChungTuInput = document.getElementById("loai_chung_tu_px");
  const dienGiaiInput = document.getElementById("notepx");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");

  const tBody = document.querySelector("#my-tablenhapctpx tbody");
  var rows = tBody.getElementsByTagName("tr");
  if (rows.length == 0) {
    alert("Vui lòng thêm hàng cho chi tiết phiếu xuất.");
    return;
  } else if (
    !maSoThueInput.value ||
    !dieuChuyenTuInput.value ||
    !dienGiaiInput.value
  ) {
    alert("Vui lòng nhập đầy đủ thông tin trên phiếu xuất hàng.");
    return;
  } else {
    const PhieuXuat = {
      maNhanVien: maNhanVien,
      maSoThue: maSoThueInput.value,
      doiTuong: doiTuongInput.value,
      dieuChuyenToi: dieuChuyenTuInput.value,
      loaiChungTu: loaiChungTuInput.getAttribute("value"),
      dienGiai: dienGiaiInput.value,
      tenchinhanh: tenChiNhanhElement.textContent,
    };

    data.push(PhieuXuat);

    const CTPX = document.querySelector("#my-tablenhapctpx tbody");
    const rows = CTPX.querySelectorAll("tr");
    console.log(CTPX);
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (
        !cells[2].querySelector("input[id='so_lo_px']").value ||
        !cells[4].querySelector("input[soluong='so_luong_px']").value
      ) {
        flag = false;
        return;
      } else if (
        cells[2].querySelector("input[id='so_lo_px']").value ||
        cells[4].querySelector("input[soluong='so_luong_px']").value
      ) {
        const chitietPX = {
          maSKU: cells[0].querySelector("input[name='maskupx']").value,
          soLo: cells[2].querySelector("input[id='so_lo_px']").value,
          ngaySanXuat: cells[3].querySelector("input[id='ngaysx_px']").value,
          soLuong: cells[4].querySelector("input[soluong='so_luong_px']").value,
        };
        const chitietPXtrung = {
          maSKU: cells[0].querySelector("input[name='maskupx']").value,
          soLo: cells[2].querySelector("input[id='so_lo_px']").value,
          ngaySanXuat: cells[3].querySelector("input[id='ngaysx_px']").value,
        };
        if (!seenKTtrung.has(JSON.stringify(chitietPXtrung))) {
          seenKTtrung.add(JSON.stringify(chitietPXtrung));
          data.push(chitietPX);
        }else{
          alert("Mời nhập lại dữ liệu do trùng biệt dược, số lô, ngày sản xuất.");
          flag = false;
        }
      }
    });
    // //
    if (flag == true) {
      fetch("http://localhost:3000/qlnt/phieuxuat/addPX", {
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
      alert("Vui lòng nhập đầy đủ và không trùng thông tin trong chi tiết nhập phiếu xuất.");
    }
  }
}
