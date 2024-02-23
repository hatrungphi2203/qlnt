function hienDSKhachHang() {
    const cn = sessionStorage.getItem("cn");
    const tenChiNhanhElement = document.getElementById("tenChiNhanh");
    tenChiNhanhElement.innerText = cn;

    const nv = JSON.parse(sessionStorage.getItem("nv"));
    const tennvElement = document.getElementById("tennv");
    tennvElement.innerText = nv[0];




    $.ajax({
        url: `http://localhost:3000/qlnt/khach/`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            const tableBody = document.getElementById("table-kho");
            tableBody.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                const row = document.createElement("tr");


                const maKHCell = document.createElement("td");
                maKHCell.innerText = data[i].maKhachHang;
                row.appendChild(maKHCell);

                const tenKhachHangCell = document.createElement("td");
                tenKhachHangCell.innerText = data[i].tenKhachHang;
                row.appendChild(tenKhachHangCell);

                const tichdiemCell = document.createElement("td");
                tichdiemCell.innerText = data[i].tichDiem;
                row.appendChild(tichdiemCell);

                const sdtKHCell = document.createElement("td");
                sdtKHCell.innerText = data[i].sdtKH;
                row.appendChild(sdtKHCell);

                tableBody.appendChild(row);
            }


            $("#example3").DataTable().destroy();

            $("#example3").DataTable({
                select: true,
                dom: "Bfrtip",
                buttons: [
                    {
                        extend: "copyHtml5",
                        exportOptions: {
                            columns: [0, 1, 2, 3],
                        },
                    },
                    {
                        extend: "excelHtml5",
                        exportOptions: {
                            columns: [0, 1, 2, 3],
                        },
                    },
                    {
                        extend: "pdfHtml5",
                        exportOptions: {
                            columns: [0, 1, 2, 3],
                        },
                    },
                    {
                        extend: "print",
                        exportOptions: {
                            columns: [0, 1, 2, 3],
                        },
                    },
                ],
                data: data,
                columns: [
                    { data: "maKhachHang" },
                    { data: "tenKhachHang" },
                    { data: "tichDiem" },
                    { data: "sdtKH" },
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
hienDSKhachHang();