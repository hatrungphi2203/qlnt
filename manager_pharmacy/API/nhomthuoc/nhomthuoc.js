function hienNhomThuoc() {
   const params = {
      maNhom: 'DH',
      tenNhom: 'dau hong',
   };

   const queryString = new URLSearchParams(params).toString();

   fetch(`http://localhost:3000/qlnt/nhomthuoc/?${queryString}`)
      .then(response => response.json())
      .then(data => {
         const list = document.getElementById('myULtennhomthuoc');
         list.innerHTML = '';

         for (let i = 0; i < data.length; i++) {
            const listItem = document.createElement('li');
            listItem.innerText = data[i].tenNhom;
            listItem.setAttribute('data-maNhom', data[i].maNhom);
            list.appendChild(listItem);
         }
      })
      .catch(error => console.log(error));
}


function timNhomThuoc() {
   var input = document.getElementById("tennhomthuoc");
   var filter = input.value.toUpperCase();
   var ul = document.getElementById("myULtennhomthuoc");
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
   chonNhomThuoc();
}

function chonNhomThuoc() {
   const list = document.getElementById('myULtennhomthuoc');
   const input = document.getElementById('tennhomthuoc');

   list.addEventListener('click', function (e) {
      const li = e.target;
      if (li.tagName === 'LI') {
         input.value = li.innerText;
         list.style.display = 'none';
         const maNhom = li.getAttribute('data-manhom');
         input.setAttribute('data-maNhom', maNhom);

         //console.log(tenNhom);
      }
   });
}
hienNhomThuoc();



fetch('http://localhost:3000/qlnt/nhomthuoc/')
  .then(response => response.json())
  .then(data => {
    const listItems = data;

    const inputElement = document.getElementById('tennhomthuoc');
    let timeoutId;

    inputElement.addEventListener('focusout', (event) => {
      const errorElement = event.target.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
        event.target.classList.remove('error');
      }
    });

    inputElement.addEventListener('input', (event) => {
      const inputText = event.target.value.trim();
      let found = false;

      for (let i = 0; i < listItems.length; i++) {
        const listItemText = listItems[i].tennhomthuoc;
        if (listItemText === inputText) {
          found = true;
          break;
        }
      }

      if (found) {
        const errorElement = event.target.parentElement.querySelector('.error-message');
        if (errorElement) {
          errorElement.remove();
          event.target.classList.remove('error');
        }
      } else {
        const parentElement = event.target.parentElement;
        const errorElement = parentElement.querySelector('.error-message');
        if (!errorElement && event.target === document.activeElement) {
          const errorElement = document.createElement('span');
          errorElement.className = 'error-message';
          errorElement.textContent = 'Giá trị nhập vào không hợp lệ. Vui lòng nhập lại hoặc chọn từ danh sách.';
          parentElement.appendChild(errorElement);
        }
        event.target.classList.add('error');
      }
    });

    inputElement.addEventListener('focus', (event) => {
      const errorElement = event.target.parentElement.querySelector('.error-message');
      if (errorElement) {
        errorElement.remove();
        event.target.classList.remove('error');
      }
    });
  })
  .catch(error => console.error(error));