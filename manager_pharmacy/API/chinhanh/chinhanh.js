function hienChiNhanh() {
    const params = {
        machinhanh: 'NT_01',
        tenChiNhanh: 'Cao Lo Phuong 4 Quan 8',
        diaChi: '180 Cao Lo Phuong 4 Quan 8 tp.HCM',
        sdt: '01234567890',
    };
  
    const queryString = new URLSearchParams(params).toString();
  
    fetch(`http://localhost:3000/qlnt/chinhanh/?${queryString}`)
      .then(response => response.json())
      .then(data => {
        const select = document.getElementById('tenchinhanh');
        const list = document.getElementById('myULtenchinhanh');
        select.innerHTML = '<option value=""></option>';
        list.innerHTML = '';
  
        for (let i = 0; i < data.length; i++) {
          const option = document.createElement('option');
          option.value = data[i].tenchinhanh;
          option.innerText = data[i].tenChiNhanh;
          select.appendChild(option);
  
          const listItem = document.createElement('li');
          listItem.innerText = data[i].tenchinhanh;
          list.appendChild(listItem);
        }
      })
      .catch(error => console.log(error));
  }

  function timChiNhanh() {
    var input = document.getElementById("tenchinhanh");
    var filter = input.value.toUpperCase();
    var ul = document.getElementById("myULtenchinhanh");
    var li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
      var txtValue = li[i].textContent || li[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "block";
      } else {
        li[i].style.display = "none";
      }
    }
    if (filter === "") {
      ul.style.display = "none";
    } else {
      ul.style.display = "block";
    }
    chonChiNhanh();
    
  }
  
  function chonChiNhanh() {
    const select = document.getElementById('tenchinhanh');
    const list = document.getElementById('myULtenchinhanh');
  
    list.addEventListener('click', function (e) {
      const li = e.target;
      if (li.tagName === 'LI') {
        select.value = li.value;
        list.style.display = 'none';
      }
    });
    
  }
  hienChiNhanh();
////
  