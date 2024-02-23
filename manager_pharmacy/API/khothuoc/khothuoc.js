// Lấy modal
var modal = document.getElementById("myModal");

// Lấy nút đóng modal
var span = document.getElementsByClassName("close")[0];

// Mở modal khi nhấn vào button
function openModal() {
  modal.style.display = "block";
}

// Đóng modal khi nhấn vào nút đóng
span.onclick = function () {
  modal.style.display = "none";
};

// Đóng modal khi nhấn vào bất kỳ đâu bên ngoài modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
const tableContainer = document.querySelector(".table-container");
const toggleButton = document.querySelector(".toggle-button");

toggleButton.addEventListener("click", function () {
  tableContainer.classList.toggle("show");
});

