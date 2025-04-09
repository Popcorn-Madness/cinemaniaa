// Simple movie popup implementation
document.addEventListener("DOMContentLoaded", function () {
  // Create popup container only once
  if (!document.getElementById("movie-popup-overlay")) {
    const popupOverlay = document.createElement("div");
    popupOverlay.id = "movie-popup-overlay";
    popupOverlay.style.display = "none";
    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = "0";
    popupOverlay.style.left = "0";
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popupOverlay.style.zIndex = "9999";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.justifyContent = "center";

    document.body.appendChild(popupOverlay);

    // Close popup when clicking outside
    popupOverlay.addEventListener("click", function (e) {
      if (e.target === popupOverlay) {
        closeMoviePopup();
      }
    });

    // Add ESC key listener
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMoviePopup();
      }
    });
  }

  // Add click event to all movie cards
  setupMovieCardListeners();
});

// Adds data-movie-id to movie cards if missing
function addMovieIdsToCards() {
  document.querySelectorAll(".movie-card").forEach((card) => {
    // Make sure it's clickable
    card.style.cursor = "pointer";

    // If no movie ID, use title to set one later
    if (!card.dataset.movieId) {
      const title = card.querySelector("h3")?.textContent;
      if (title) {
        searchForMovieId(title, card);
      }
    }
  });
}

// Find movie ID by title
async function searchForMovieId(title, element) {
  try {
    const apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=tr-TR&query=${encodeURIComponent(
      title
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movieId = data.results[0].id;
      element.dataset.movieId = movieId;
    }
  } catch (error) {
    console.error("Error searching for movie:", error);
  }
}

// Adds click event listeners to movie cards
function setupMovieCardListeners() {
  // Add IDs to cards first
  addMovieIdsToCards();

  // Delegate click event to body to catch all movie cards
  document.body.addEventListener("click", function (e) {
    const movieCard = e.target.closest(".movie-card");
    if (!movieCard) return;

    const movieId = movieCard.dataset.movieId;
    if (movieId) {
      showMoviePopup(movieId);
    } else {
      const title = movieCard.querySelector("h3")?.textContent;
      if (title) {
        searchAndShowMovie(title);
      }
    }
  });
}

// Search for a movie by title and show popup
async function searchAndShowMovie(title) {
  try {
    const apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=tr-TR&query=${encodeURIComponent(
      title
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      showMoviePopup(data.results[0].id);
    } else {
      console.error("Movie not found:", title);
    }
  } catch (error) {
    console.error("Error searching for movie:", error);
  }
}

// Displays the movie popup with movie details
async function showMoviePopup(movieId) {
  const popupOverlay = document.getElementById("movie-popup-overlay");
  if (!popupOverlay) return;

  // Show loading state
  popupOverlay.innerHTML = `
      <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background-color:#222; color:white; padding:20px; border-radius:10px; text-align:center; max-width:90%;">
          Loading...
      </div>
  `;

  popupOverlay.style.display = "block";

  try {
    const apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=tr-TR`;

    const response = await fetch(url);
    const movie = await response.json();

    // Create the popup content
    const popupContent = document.createElement("div");
    popupContent.style.position = "absolute";
    popupContent.style.top = "50%";
    popupContent.style.left = "50%";
    popupContent.style.transform = "translate(-50%, -50%)";
    popupContent.style.backgroundColor = "#222";
    popupContent.style.color = "white";
    popupContent.style.padding = "20px";
    popupContent.style.borderRadius = "10px";
    popupContent.style.width = "90%";
    popupContent.style.maxWidth = "800px";
    popupContent.style.maxHeight = "80vh";
    popupContent.style.overflow = "auto";
    popupContent.style.boxShadow = "0 0 20px rgba(248, 119, 25, 0.3)";

    popupContent.innerHTML = `
          <div style="position:relative;">
              <span style="position:absolute; top:0; right:0; font-size:24px; cursor:pointer; color:#aaa;">&times;</span>
              <div style="display:flex; flex-direction:column; gap:15px;">
                  <div style="text-align:center;">
                      <img 
                          src="https://image.tmdb.org/t/p/w500${
                            movie.poster_path
                          }" 
                          alt="${movie.title}" 
                          style="max-width:100%; max-height:300px; object-fit:contain;"
                      >
                  </div>
                  <div>
                      <h2 style="color:#f87719; margin-bottom:10px;">${
                        movie.title
                      }</h2>
                      <p style="margin-bottom:5px;"><strong>Release Date:</strong> ${
                        movie.release_date
                      }</p>
                      <p style="margin-bottom:5px;"><strong>Rating:</strong> ${
                        movie.vote_average
                      }/10</p>
                      <p style="margin-bottom:15px;"><strong>Genres:</strong> ${movie.genres
                        .map((g) => g.name)
                        .join(", ")}</p>
                      <h3 style="margin-bottom:5px;">Overview</h3>
                      <p>${movie.overview || "No overview available."}</p>
                  </div>
              </div>
          </div>
      `;

    // Clear the overlay and add the new content
    popupOverlay.innerHTML = "";
    popupOverlay.appendChild(popupContent);

    // Add close functionality to the X button
    const closeButton = popupContent.querySelector("span");
    closeButton.addEventListener("click", closeMoviePopup);

    // Add tablet/desktop responsive styling
    if (window.innerWidth >= 768) {
      const contentDiv = popupContent.querySelector("div > div");
      contentDiv.style.flexDirection = "row";

      const imgDiv = popupContent.querySelector("div > div > div:first-child");
      imgDiv.style.flex = "0 0 40%";
      imgDiv.style.marginRight = "20px";
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    popupOverlay.innerHTML = `
          <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background-color:#222; color:white; padding:20px; border-radius:10px; text-align:center; max-width:90%;">
              <p>Error loading movie details.</p>
              <button onclick="closeMoviePopup()" style="margin-top:10px; padding:5px 10px; background:#f87719; border:none; color:white; cursor:pointer; border-radius:5px;">Close</button>
          </div>
      `;
  }
}

// Closes the movie popup
function closeMoviePopup() {
  const popupOverlay = document.getElementById("movie-popup-overlay");
  if (popupOverlay) {
    popupOverlay.style.display = "none";
  }
}

// Run this every few seconds to catch dynamically added movie cards
setInterval(addMovieIdsToCards, 3000);

// Make closeMoviePopup globally available for the error handler
window.closeMoviePopup = closeMoviePopup;
