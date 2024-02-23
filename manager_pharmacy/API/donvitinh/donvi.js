function hienDonVi() {
  const params = {
    maDonVi: 'H',
    tenDonVi: 'Hop',
  };

  const queryString = new URLSearchParams(params).toString();

  fetch(`http://localhost:3000/qlnt/dvt/?${queryString}`)
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('donvi');
      const list = document.getElementById('myULdonvi');
      select.innerHTML = '<option value=""></option>';
      list.innerHTML = '';

      for (let i = 0; i < data.length; i++) {
        const option = document.createElement('option');
        option.value = data[i].maDonVi;
        option.innerText = data[i].tenDonVi;
        select.appendChild(option);

        const listItem = document.createElement('li');
        listItem.innerText = data[i].tenDonVi;
        list.appendChild(listItem);
      }
    })
    .catch(error => console.log(error));
}

function timDonVi() {
  var input = document.getElementById("donvi");
  var filter = input.value.toUpperCase();
  var ul = document.getElementById("myULdonvi");
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
  chonDonVi();
}

function chonDonVi() {
  const select = document.getElementById('donvi');
  const list = document.getElementById('myULdonvi');

  list.addEventListener('click', function (e) {
    const li = e.target;
    if (li.tagName === 'LI') {
      select.value = li.value;
      list.style.display = 'none';
    }
  });
}
hienDonVi();




