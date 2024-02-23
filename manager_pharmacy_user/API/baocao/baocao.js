function hienThiBaoCao() {
  const cn = sessionStorage.getItem("cn");
  const tenChiNhanhElement = document.getElementById("tenChiNhanh");
  tenChiNhanhElement.innerText = cn;

  const nv = JSON.parse(sessionStorage.getItem("nv"));
  const tennvElement = document.getElementById("tennv");
  tennvElement.innerText = nv[0];
    $.ajax({
        url: `http://localhost:3000/qlnt/baocao/${cn}`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            const tableBody = document.getElementById("table_baocao");
            tableBody.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                const row = document.createElement("tr");
        
                const ngayCell = document.createElement("td");
                ngayCell.innerText = data[i].ngay;
                row.appendChild(ngayCell);
        
                const gioCell = document.createElement("td");
                gioCell.innerText = data[i].gio;
                row.appendChild(gioCell);
        
                const soHoaDonCell = document.createElement("td");
                soHoaDonCell.innerText = data[i].soHoaDon;
                row.appendChild(soHoaDonCell);
        
                const maSKUCell = document.createElement("td");
                maSKUCell.innerText = data[i].maSKU;
                row.appendChild(maSKUCell);
        
                const maNhomCell = document.createElement("td");
                maNhomCell.innerText = data[i].maNhom;
                row.appendChild(maNhomCell);
        
                const maNhaSanXuatCell = document.createElement("td");
                maNhaSanXuatCell.innerText = data[i].maNhaSanXuat;
                row.appendChild(maNhaSanXuatCell);
        
                const maDonViCell = document.createElement("td");
                maDonViCell.innerText = data[i].maDonVi;
                row.appendChild(maDonViCell);
        
                const tenBietDuocCell = document.createElement("td");
                tenBietDuocCell.innerText = data[i].tenBietDuoc;
                row.appendChild(tenBietDuocCell);
        
                const soDangKyCell = document.createElement("td");
                soDangKyCell.innerText = data[i].soDangKy;
                row.appendChild(soDangKyCell);
        
                const hoatChatCell = document.createElement("td");
                hoatChatCell.innerText = data[i].hoatChat;
                row.appendChild(hoatChatCell);
        
                const donGiaCell = document.createElement("td");
                donGiaCell.innerText = data[i].donGia;
                row.appendChild(donGiaCell);
        
                const giaBanCell = document.createElement("td");
                giaBanCell.innerText = data[i].giaBan;
                row.appendChild(giaBanCell);
        
                const hanSuDungCell = document.createElement("td");
                hanSuDungCell.innerText = data[i].hanSuDung;
                row.appendChild(hanSuDungCell);
        
                const soLuongCell = document.createElement("td");
                hanSuDungCell.innerText = data[i].soLuong;
                row.appendChild(soLuongCell);
        
                const tongTienCell = document.createElement("td");
                tongTienCell.innerText = data[i].tongTien;
                row.appendChild(tongTienCell);
        
                const thueCell = document.createElement("td");
                thueCell.innerText = data[i].thue;
                row.appendChild(thueCell);
        
                const loiNhuanCell = document.createElement("td");
                thueCell.innerText = data[i].loiNhuan;
                row.appendChild(loiNhuanCell);
        
                const tenNhanVienCell = document.createElement("td");
                tenNhanVienCell.innerText = data[i].tenNhanVien;
                row.appendChild(tenNhanVienCell);
        
                tableBody.appendChild(row);
        
              }


            $("#example").DataTable().destroy();

            $("#example").DataTable({
                select: true,
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copyHtml5",
                        exportOptions: {
                            columns: [
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                              ],
                        },
                    },
                    {
                        extend: "excelHtml5",
                        exportOptions: {
                            columns: [
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                              ],
                        },
                    },
                    {
                        extend: "pdfHtml5",
                        exportOptions: {
                            columns: [
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                              ],
                        },
                    },
                    {
                        extend: "print",
                        exportOptions: {
                            columns: [
                                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                              ],
                        },
                    },
                ],
                data: data,
                columns: [
                    { data: "ngay" },
                    { data: "gio" },
                    { data: "soHoaDon" },
                    { data: "maSKU" },
                    { data: "maNhom" },
                    { data: "maNhaSanXuat" },
                    { data: "maDonVi" },
                    { data: "tenBietDuoc" },
                    { data: "soDangKy" },
                    { data: "hoatChat" },
                    { data: "donGia" },
                    { data: "giaBan" },
                    { data: "hanSuDung" },
                    { data: "soLuong" },
                    { data: "tongTien" },
                    { data: "thue" },
                    { data: "loiNhuan" },
                    { data: "tenNhanVien" },
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
                lengthMenu: [5, 10, 25, 50],
                pageLength: null, // ẩn đi tùy chọn "Hiển thị x dòng"
            });
        },
        error: function (error) {
            console.log(error);
        },
    });
}
hienThiBaoCao()
  ///////////////Ràng buộc ngày
  function rangbuocNgay() {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
  
    // Không cho nhập ngày tương lai
    const currentDate = new Date().toISOString().split("T")[0];
    startDateInput.setAttribute("max", currentDate);
    endDateInput.setAttribute("max", currentDate);
  
    // Listen for changes in the date inputs
    startDateInput.addEventListener("input", () => {
      if (startDateInput.value > endDateInput.value) {
        endDateInput.setAttribute("min", startDateInput.value);
        endDateInput.value = currentDate;
      }
    });
  }
  ////////////Lọc ngày
  function locNgay() {
    const ngayBD = document.getElementById("start-date").value;
    const ngayKT = document.getElementById("end-date").value;
    const data = {
      ngayBatDau: ngayBD,
      ngayKetThuc: ngayKT,
    };
    console.log(JSON.stringify(data));
    // Gửi dữ liệu bằng AJAX
    fetch("http://localhost:3000/qlnt/baocao/ngay/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length);
        const tableBody = document.getElementById("table_baocao");
        tableBody.innerHTML = "";
  
        if (data.length != 0) {
          for (let i = 0; i < data.length; i++) {
            const row = document.createElement("tr");
  
            const ngayCell = document.createElement("td");
            ngayCell.innerText = data[i].ngay;
            row.appendChild(ngayCell);
  
            const gioCell = document.createElement("td");
            gioCell.innerText = data[i].gio;
            row.appendChild(gioCell);
  
            const soHoaDonCell = document.createElement("td");
            soHoaDonCell.innerText = data[i].soHoaDon;
            row.appendChild(soHoaDonCell);
  
            const maSKUCell = document.createElement("td");
            maSKUCell.innerText = data[i].maSKU;
            row.appendChild(maSKUCell);
  
            const maNhomCell = document.createElement("td");
            maNhomCell.innerText = data[i].maNhom;
            row.appendChild(maNhomCell);
  
            const maNhaSanXuatCell = document.createElement("td");
            maNhaSanXuatCell.innerText = data[i].maNhaSanXuat;
            row.appendChild(maNhaSanXuatCell);
  
            const maDonViCell = document.createElement("td");
            maDonViCell.innerText = data[i].maDonVi;
            row.appendChild(maDonViCell);
  
            const tenBietDuocCell = document.createElement("td");
            tenBietDuocCell.innerText = data[i].tenBietDuoc;
            row.appendChild(tenBietDuocCell);
  
            const soDangKyCell = document.createElement("td");
            soDangKyCell.innerText = data[i].soDangKy;
            row.appendChild(soDangKyCell);
  
            const hoatChatCell = document.createElement("td");
            hoatChatCell.innerText = data[i].hoatChat;
            row.appendChild(hoatChatCell);
  
            const donGiaCell = document.createElement("td");
            donGiaCell.innerText = data[i].donGia;
            row.appendChild(donGiaCell);
  
            const giaBanCell = document.createElement("td");
            giaBanCell.innerText = data[i].giaBan;
            row.appendChild(giaBanCell);
  
            const hanSuDungCell = document.createElement("td");
            hanSuDungCell.innerText = data[i].hanSuDung;
            row.appendChild(hanSuDungCell);
  
            const soLuongCell = document.createElement("td");
            soLuongCell.innerText = data[i].soLuong;
            row.appendChild(soLuongCell);
  
            const tongTienCell = document.createElement("td");
            tongTienCell.innerText = data[i].tongTien;
            row.appendChild(tongTienCell);
  
            const thueCell = document.createElement("td");
            thueCell.innerText = data[i].thue;
            row.appendChild(thueCell);
  
            const loiNhuanCell = document.createElement("td");
            loiNhuanCell.innerText = data[i].loiNhuan;
            row.appendChild(loiNhuanCell);
  
            const tenNhanVienCell = document.createElement("td");
            tenNhanVienCell.innerText = data[i].tenNhanVien;
            row.appendChild(tenNhanVienCell);
  
            tableBody.appendChild(row);
          }
        } else {
          const Cell = document.createElement("td");
          Cell.innerText = "Không có dữ liệu";
          Cell.colSpan = 12;
          Cell.style.color = "red";
          Cell.style.fontSize = "20px";
          Cell.style.textAlign = "center";
          const row = document.createElement("tr");
          row.appendChild(Cell);
          tableBody.appendChild(row);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  