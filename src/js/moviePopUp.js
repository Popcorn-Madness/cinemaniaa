import axios from "axios";
export function moviePopUp() {
  // Global variables
  const apiKey = "6c6ff1eefb34466f1e524e319f306b8f";
  const url = "https://api.themoviedb.org/3";

  // Initialize popup functionality
  export function initializePopup() {
    console.log("Initializing popup functionality");

    // First, add CSS directly to ensure our styles are applied
    addPopupStyles();

    // Create popup container if it doesn't exist
    if (!document.getElementById("movie-popup-container")) {
      const popupContainer = document.createElement("div");
      popupContainer.id = "movie-popup-container";
      // Apply styles directly to the container
      popupContainer.style.display = "none";
      popupContainer.style.position = "fixed";
      popupContainer.style.zIndex = "9999";
      popupContainer.style.left = "0";
      popupContainer.style.top = "0";
      popupContainer.style.width = "100%";
      popupContainer.style.height = "100%";
      popupContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      popupContainer.style.overflow = "auto";

      document.body.appendChild(popupContainer);
      console.log("Popup container created");
    }

    // Use event delegation to handle clicks on movie cards
    document.addEventListener("click", function (event) {
      // Find the closest movie-card parent element
      const movieCard = event.target.closest(".movie-card");
      if (movieCard) {
        const movieId = movieCard.dataset.movieId;
        if (movieId) {
          console.log("Movie card clicked, ID:", movieId);
          showMoviePopup(movieId);
        } else {
          console.log("Movie card clicked but no movieId found");
        }
      }
    });

    // Add keyboard event listener for ESC key
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        const popupContainer = document.getElementById("movie-popup-container");
        if (popupContainer && popupContainer.style.display === "block") {
          console.log("ESC key pressed, closing popup");
          popupContainer.style.display = "none";
        }
      }
    });

    console.log("Event delegation set up for movie cards");
  }

  // Function to add popup styles directly to ensure they're applied
  function addPopupStyles() {
    if (!document.getElementById("movie-popup-styles")) {
      const styleSheet = document.createElement("style");
      styleSheet.id = "movie-popup-styles";
      styleSheet.textContent = `
      #movie-popup-container {
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        overflow: auto;
        padding: 0;
        margin: 0;
      }
      
      .movie-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 800px;
        max-height: 80vh;
        background-color: #222;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(248, 119, 25, 0.3);
        overflow: auto;
      }
      
      .popup-content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      
      .close-popup {
        color: #aaa;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 10px;
        z-index: 10000;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      
      .close-popup:hover {
        color: #f87719;
      }
      
      .popup-image {
        text-align: center;
        margin-bottom: 20px;
      }
      
      .popup-image img {
        max-width: 100%;
        max-height: 350px;
        border-radius: 8px;
        object-fit: contain;
      }
      
      .popup-details h2 {
        color: #f87719;
        margin-bottom: 10px;
      }
      
      .release-date, .rating, .genres {
        color: #ccc;
        margin-bottom: 8px;
      }
      
      .overview {
        margin-top: 15px;
      }
      
      .overview h3 {
        color: #fff;
        margin-bottom: 8px;
      }
      
      @media (min-width: 768px) {
        .popup-content {
          flex-direction: row;
        }
        
        .popup-image {
          flex: 0 0 40%;
          margin-right: 20px;
          margin-bottom: 0;
        }
        
        .popup-details {
          flex: 1;
        }
      }
    `;
      document.head.appendChild(styleSheet);
      console.log("Added popup styles directly");
    }
  }

  // Function to create and show the popup when a movie is clicked
  async function showMoviePopup(movieId) {
    console.log("Showing popup for movie ID:", movieId);
    try {
      // Get popup container
      const popupContainer = document.getElementById("movie-popup-container");
      if (!popupContainer) {
        console.error("Popup container not found");
        return;
      }

      // Show loading state
      popupContainer.innerHTML =
        '<div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;"><div class="popup-content" style="padding:20px;"><p style="color:white;text-align:center;">Loading...</p></div></div>';
      popupContainer.style.display = "block";

      // Fetch movie details
      console.log(
        `Fetching movie data from: ${url}/movie/${movieId}?api_key=${apiKey}&language=tr-TR`
      );
      const response = await axios.get(
        `${url}/movie/${movieId}?api_key=${apiKey}&language=tr-TR`
      );

      const movie = response.data;
      console.log("Movie data received:", movie.title);

      // Create popup content with inline styles to ensure positioning
      popupContainer.innerHTML = `
      <div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;box-shadow:0 0 20px rgba(248,119,25,0.3);max-height:80vh;overflow:auto;">
        <div class="popup-content" style="padding:20px;position:relative;">
          <span class="close-popup" style="color:#aaa;font-size:28px;font-weight:bold;cursor:pointer;position:absolute;right:15px;top:10px;z-index:10000;">&times;</span>
          <div class="popup-image" style="text-align:center;margin-bottom:20px;">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${
        movie.title
      }" style="max-width:100%;max-height:350px;border-radius:8px;object-fit:contain;">
          </div>
          <div class="popup-details" style="color:white;">
            <h2 style="color:#f87719;margin-bottom:10px;">${movie.title}</h2>
            <p class="release-date" style="color:#ccc;margin-bottom:8px;">Release Date: ${
              movie.release_date
            }</p>
            <p class="rating" style="color:#ccc;margin-bottom:8px;">Rating: ${
              movie.vote_average
            }/10</p>
            <p class="genres" style="color:#ccc;margin-bottom:8px;">Genres: ${movie.genres
              .map((genre) => genre.name)
              .join(", ")}</p>
            <div class="overview" style="margin-top:15px;">
              <h3 style="color:white;margin-bottom:8px;">Overview</h3>
              <p style="color:white;">${
                movie.overview || "No overview available."
              }</p>
            </div>
          </div>
        </div>
      </div>
    `;

      // Add event listener to close button
      const closeButton = document.querySelector(".close-popup");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          popupContainer.style.display = "none";
        });
      }

      // Close popup when clicking outside of it
      popupContainer.addEventListener("click", (event) => {
        if (event.target === popupContainer) {
          popupContainer.style.display = "none";
        }
      });
    } catch (error) {
      console.error("Error fetching movie details:", error);
      const popupContainer = document.getElementById("movie-popup-container");
      if (popupContainer) {
        popupContainer.innerHTML = `
        <div class="movie-popup" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:90%;max-width:800px;background-color:#222;border-radius:10px;">
          <div class="popup-content" style="padding:20px;position:relative;">
            <span class="close-popup" style="color:#aaa;font-size:28px;font-weight:bold;cursor:pointer;position:absolute;right:15px;top:10px;">&times;</span>
            <p style="color:white;">Error loading movie details. Please try again.</p>
          </div>
        </div>
      `;

        const closeButton = document.querySelector(".close-popup");
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            popupContainer.style.display = "none";
          });
        }
      }
    }
  }
}
