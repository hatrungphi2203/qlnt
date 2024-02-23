function hienFormThuocHetHan() {
    var form = document.getElementById("hienFormHH");
    if (form.style.display === "none") {
      form.style.display = "block";
    } else if(form.style.display === "block") {
      form.style.display = "none";
    }
     
  }
  function hiendsGHH(){
    const cn = sessionStorage.getItem("cn");
    $.ajax({
      url: `http://localhost:3000/qlnt/kho/ghh/${cn}`,
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log(data);
        const tableBody = document.getElementById("chitiet_thuochh");
        tableBody.innerHTML = "";
  
        for (let i = 0; i < data.length; i++) {
          const row = document.createElement("tr");
            let date1 = new Date(data[i].ngayHetHan);
            let ngayHetHan = date1.toLocaleString("vi-VN", {
              timeZone: "Asia/Ho_Chi_Minh",
              dateStyle: "short",
            });
            ngayHetHan = ngayHetHan.split(" ")[0].replace(/\//g, "/");
          const maSKUCell = document.createElement("td");
          maSKUCell.innerText = data[i].maSKU;
          row.appendChild(maSKUCell);
  
          const tenBietDuoc = document.createElement("td");
          tenBietDuoc.innerText = data[i].tenBietDuoc;
          row.appendChild(tenBietDuoc);
  
          const ngayHetHanCell = document.createElement("td");
          ngayHetHanCell.innerText = ngayHetHan;
          row.appendChild(ngayHetHanCell);
  
  
          const soLuongCell = document.createElement("td");
          soLuongCell.innerText = data[i].soLuong;
          row.appendChild(soLuongCell);
  
          tableBody.appendChild(row);
        }
      }});
  }
  hiendsGHH()