function hienThiTaiKhoan() {
  const params = {
    tenNhanVien:"ffffffff",
    sdt: "1234578789",
  };

  const queryString = new URLSearchParams(params).toString();
  console.log(queryString);
  fetch(`http://localhost:3000/qlnt/user/?${queryString}`)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("table-taikhoan");
      tableBody.innerHTML = "";
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const row = document.createElement("tr");

        const maUserCell = document.createElement("td");
        maUserCell.innerText = data[i].tenNhanVien;
        row.appendChild(maUserCell);

        const sdtCell = document.createElement("td");
        sdtCell.innerText = data[i].sdt;
        row.appendChild(sdtCell);

        tableBody.appendChild(row);
      }
    })
    .catch((error) => console.log(error));
}
