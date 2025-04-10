// // import axios from "axios";

// // // export function myLibrary() {
// // let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
// // let url = "https://api.themoviedb.org/3";
// // let genresList = [
// //   { id: 28, name: "Aksiyon" },
// //   { id: 12, name: "Macera" },
// //   { id: 16, name: "Animasyon" },
// //   { id: 35, name: "Komedi" },
// //   { id: 80, name: "Suç" },
// //   { id: 99, name: "Belgesel" },
// //   { id: 18, name: "Dram" },
// //   { id: 10751, name: "Aile" },
// //   { id: 14, name: "Fantastik" },
// //   { id: 36, name: "Tarih" },
// //   { id: 27, name: "Korku" },
// //   { id: 10402, name: "Müzik" },
// //   { id: 9648, name: "Gizem" },
// //   { id: 10749, name: "Romantik" },
// //   { id: 878, name: "Bilim Kurgu" },
// //   { id: 10770, name: "Televizyon" },
// //   { id: 53, name: "Gerilim" },
// //   { id: 10752, name: "Savaş" },
// //   { id: 37, name: "Western" },
// //   { id: 38, name: "Absürd" },
// // ];
// // let currentPage = 1; // Başlangıç sayfası
// // window.onload = function () {
// //   // Sayfa yüklendiğinde genre dropdown'ını doldur
// //   populateGenreDropdown();
// //   // Film listesini yükle
// //   libraryList(currentPage);
// //   // Load More butonunu dinle
// //   const loadMoreButton = document.querySelector(".loadMoreBtn");
// //   loadMoreButton.addEventListener("click", function () {
// //     currentPage++;
// //     libraryList(currentPage);
// //     window.scrollTo({ top: 0, behavior: "smooth" });
// //   });
// // };
// // // Genre dropdown'ını doldurmak için fonksiyon
// // function populateGenreDropdown() {
// //   let genreSelect = document.querySelector(".genreSelect");
// //   // İlk olarak "Genre" seçeneğini ekleyelim
// //   genreSelect.innerHTML = `<option value="">Tür Seç</option>`;
// //   // Türleri dropdown'a ekleyelim
// //   genresList.forEach((genre) => {
// //     let option = document.createElement("option");
// //     option.value = genre.id;
// //     option.textContent = genre.name;
// //     genreSelect.appendChild(option);
// //   });
// //   // Genre seçildiğinde filtreleme yapmak için event listener ekleyelim
// //   genreSelect.addEventListener("change", (e) => {
// //     let genreId = e.target.value;
// //     currentPage = 1; // Tür değiştirilirse sayfayı sıfırla
// //     libraryList(currentPage, genreId); // genreId'yi filtrelemek için gönder
// //   });
// // }
// // export async function libraryList(page = 1, genreId = "") {
// //   let catalog = document.querySelector(".library-catalog");
// //   catalog.innerHTML = ""; // Önceki filmleri temizle
// //   let noResultsMessage = document.querySelector(".no-results-message");
// //   if (noResultsMessage) {
// //     noResultsMessage.remove(); // Eski mesajı kaldır
// //   }
// //   try {
// //     // Eğer genreId varsa, bu türle filtrele
// //     let endpoint = genreId
// //       ? `${url}/discover/movie?api_key=${apiKey}&language=tr-TR&page=${page}&with_genres=${genreId}`
// //       : `${url}/movie/popular?api_key=${apiKey}&language=tr-TR&page=${page}`;
// //     const response = await axios.get(endpoint);
// //     let movies = response.data.results;
// //     // Eğer filmler boşsa, mesaj göster
// //     if (movies.length === 0) {
// //       let message = document.createElement("div");
// //       message.classList.add("no-results-message");
// //       if (genreId) {
// //         message.innerHTML =
// //           "<p>OOPS...</p>" +
// //           "<p>We are sorry!</p>" +
// //           "<p>You don't have any movies at your library</p>";
// //       } else {
// //         message.innerHTML = "<p>Üzgünüz, şu an popüler filmler yok.</p>";
// //       }
// //       catalog.appendChild(message);
// //     } else {
// //       // Filmleri ekleyelim
// //       movies.forEach((movie) => {
// //         let movieDiv = document.createElement("div");
// //         movieDiv.classList.add("movie-card-library");
// //         movieDiv.dataset.movieId = movie.id;
// //         movieDiv.style.cursor = "pointer";
// //         movieDiv.innerHTML = `
// //           <div class="image-container">
// //             <img src="https://image.tmdb.org/t/p/w500${
// //               movie.poster_path || ""
// //             }" alt="${movie.title}">
// //           </div>
// //           <div class="movie-details-library">
// //             <div class="movie-name-library">
// //               <h3>${movie.title}</h3>
// //               <p>${getGenres(movie.genre_ids).join(", ")}</p>
// //             </div>
// //             <div class="stars">
// //               ${getStars(movie.vote_average)}
// //             </div>
// //           </div>
// //         `;
// //         catalog.appendChild(movieDiv);
// //       });
// //     }
// //   } catch (error) {
// //     console.error("Hata:", error);
// //   }
// // }
// // // Yıldızları oluşturmak için fonksiyon
// // function getStars(voteAverage) {
// //   let stars = "";
// //   let fullStars = Math.floor(voteAverage / 2);
// //   for (let i = 0; i < 5; i++) {
// //     if (i < fullStars) {
// //       stars += `<span class="fa fa-star checked"></span>`;
// //     } else {
// //       stars += `<span class="fa fa-star"></span>`;
// //     }
// //   }
// //   return stars;
// // }
// // // Türleri almak için (Türler film API'sinde ID ile gelir)
// // function getGenres(genreIds) {
// //   return genreIds.map((id) => {
// //     const genre = genresList.find((g) => g.id === id);
// //     return genre ? genre.name : "Bilinmiyor";
// //   });
// // }
// // // }

import axios from "axios";

let apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
let url = "https://api.themoviedb.org/3";
let genresList = [
  { id: 28, name: "Aksiyon" },
  { id: 12, name: "Macera" },
  { id: 16, name: "Animasyon" },
  { id: 35, name: "Komedi" },
  { id: 80, name: "Suç" },
  { id: 99, name: "Belgesel" },
  { id: 18, name: "Dram" },
  { id: 10751, name: "Aile" },
  { id: 14, name: "Fantastik" },
  { id: 36, name: "Tarih" },
  { id: 27, name: "Korku" },
  { id: 10402, name: "Müzik" },
  { id: 9648, name: "Gizem" },
  { id: 10749, name: "Romantik" },
  { id: 878, name: "Bilim Kurgu" },
  { id: 10770, name: "Televizyon" },
  { id: 53, name: "Gerilim" },
  { id: 10752, name: "Savaş" },
  { id: 37, name: "Western" },
  { id: 38, name: "Absürd" },
];
let currentPage = 1; // Başlangıç sayfası

window.onload = function () {
  // Sayfa yüklendiğinde genre dropdown'ını doldur
  populateGenreDropdown();
  // LocalStorage'dan film listelerini yükle
  loadLibraryMovies();
  // Load More butonunu dinle
  const loadMoreButton = document.querySelector(".loadMoreBtn");
  loadMoreButton.addEventListener("click", function () {
    currentPage++;
    loadLibraryMovies(); // Sayfa arttıkça filmleri tekrar yükle
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// Genre dropdown'ını doldurmak için fonksiyon
function populateGenreDropdown() {
  let genreSelect = document.querySelector(".genreSelect");
  genreSelect.innerHTML = `<option value="">Tür Seç</option>`;
  genresList.forEach((genre) => {
    let option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreSelect.appendChild(option);
  });

  genreSelect.addEventListener("change", (e) => {
    let genreId = e.target.value;
    currentPage = 1; // Tür değiştirilirse sayfayı sıfırla
    loadLibraryMovies(genreId); // Filtreli film listesi
  });
}

// Filmleri LocalStorage'dan yüklemek ve göstermek
function loadLibraryMovies(genreId = "") {
  let catalog = document.querySelector(".library-catalog");
  catalog.innerHTML = ""; // Önceki filmleri temizle

  let movieLibrary = JSON.parse(localStorage.getItem("movieLibrary")) || []; // LocalStorage'dan film verilerini al

  // Eğer localStorage'da hiç film yoksa, mesaj göster
  if (movieLibrary.length === 0) {
    let message = document.createElement("div");
    message.classList.add("no-results-message");
    message.innerHTML = "<p>Henüz kütüphanenizde film yok.</p>";
    catalog.appendChild(message);
    return;
  }

  // Eğer genreId varsa, türle filtrele
  let filteredMovies = genreId
    ? movieLibrary.filter((movie) =>
        movie.genre_ids.includes(parseInt(genreId))
      )
    : movieLibrary;

  // Eğer filtrelenmiş filmler yoksa, mesaj göster
  if (filteredMovies.length === 0) {
    let message = document.createElement("div");
    message.classList.add("no-results-message");
    message.innerHTML = "<p>Bu türe ait film bulunamadı.</p>";
    catalog.appendChild(message);
  } else {
    // Filmleri ekleyelim
    filteredMovies.forEach((movie) => {
      let movieDiv = document.createElement("div");
      movieDiv.classList.add("movie-card-library");
      movieDiv.dataset.movieId = movie.id;
      movieDiv.style.cursor = "pointer";
      movieDiv.innerHTML = `
        <div class="image-container">
          <img src="https://image.tmdb.org/t/p/w500${
            movie.poster_path || ""
          }" alt="${movie.title}">
        </div>
        <div class="movie-details-library">
          <div class="movie-name-library">
            <h3>${movie.title}</h3>
            <p>${getGenres(movie.genre_ids).join(", ")}</p>
          </div>
          <div class="stars">
            ${getStars(movie.vote_average)}
          </div>
        </div>
      `;
      catalog.appendChild(movieDiv);
    });
  }
}

// Yıldızları oluşturmak için fonksiyon
function getStars(voteAverage) {
  let stars = "";
  let fullStars = Math.floor(voteAverage / 2);
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars += `<span class="fa fa-star checked"></span>`;
    } else {
      stars += `<span class="fa fa-star"></span>`;
    }
  }
  return stars;
}

// Türleri almak için (Türler film API'sinde ID ile gelir)
function getGenres(genreIds) {
  return genreIds.map((id) => {
    const genre = genresList.find((g) => g.id === id);
    return genre ? genre.name : "Bilinmiyor";
  });
}
