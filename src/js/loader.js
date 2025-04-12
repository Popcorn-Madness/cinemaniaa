window.addEventListener("load", function () {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("content");
  // 3 saniye bekle, sonra loader'ı kaldır ve içeriği göster
  setTimeout(() => {
    loader.style.display = "none";
    content.style.display = "block";
  }, 1500); // 3000 ms = 3 saniye
});
