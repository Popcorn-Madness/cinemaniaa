import axios from "axios";

export function hero() {
  const heroSection = document.querySelector(".hero-container");
  const modal = document.getElementById("movieModal");
  const closeModalButton = document.querySelector(".close-btn");
  const movieDescriptionElement = document.getElementById("movieDescription");
  const movieTrailerLink = document.getElementById("movieTrailerLink");
  const trailerContainer = document.getElementById("trailerContainer");
  const trailerIframe = document.getElementById("trailerIframe");
  const closeTrailerButton = document.getElementById("closeTrailerBtn");

  async function getTrendMovies() {
    let key = "cccc5e6104b30f55a3f3b525ec4830b1";
    let url = "https://api.themoviedb.org/3";
    try {
      const response = await axios.get(
        `${url}/movie/popular?api_key=${key}&language=tr-TR`
      );
      const movies = response.data.results;
      if (movies.length > 0) {
        const movie = movies[Math.floor(Math.random() * movies.length)];
        displayMovie(movie);
      } else {
        displayDefaultHero();
      }
    } catch (error) {
      console.log(error);
      displayDefaultHero();
    }
  }

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

  function displayMovie(movie) {
    heroSection.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`;
    heroSection.style.backgroundSize = "cover";

    heroSection.innerHTML = `
        <div class="hero-content">
        <h1>${movie.title}</h1>
        <p class="star">${getStars(movie.vote_average)}</p>
        <p class="overview">${movie.overview}</p>
        <button class="trailer">Watch Trailer</button>
        <button class="detail">More Details</button>
        </div>`;

    // Watch Trailer Button Click
    const watchTrailerButton = document.querySelector(".trailer");
    watchTrailerButton.addEventListener("click", (e) => {
      e.preventDefault();
      // hideMovieDetails();
      getTrailer(movie.id);
    });

    // More Details Button Click
    const moreDetailsButton = document.querySelector(".detail");
    moreDetailsButton.addEventListener("click", (e) => {
      e.preventDefault();
      // hideTrailer();
      showDetails(movie);
    });
  }

  // function hideMovieDetails() {
  //   Film detaylarını gizle
  //   const heroContent = document.querySelector(".hero-content");
  //   if (heroContent) {
  //     heroContent.style.display = "none"; // Detayları gizle
  //   }
  // }

  // function hideTrailer() {
  //   // Fragmanı gizle
  //   trailerContainer.style.display = "none"; // Trailer konteynerini gizle
  //   trailerIframe.src = ""; // Video'yu durdur
  // }

  function displayDefaultHero() {
    heroSection.innerHTML = `
        <div class="hero-content-default">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
        <button class="started">Get Started</button>
        </div>`;
  }

  async function getTrailer(movieId) {
    let key = "cccc5e6104b30f55a3f3b525ec4830b1";
    let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`;

    try {
      const response = await axios.get(url);
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailer) {
        const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;
        trailerIframe.src = trailerUrl;
        trailerContainer.style.display = "block"; // Show the trailer container
        modal.style.display = "block"; // Show the modal
      } else {
        alert("Sorry, no trailer available.");
      }
    } catch (error) {
      console.error("Error fetching trailer", error);
      alert("Sorry, there was an issue fetching the trailer.");
    }
  }

  function showDetails(movie) {
    const movieDescription = movie.overview || "No description available.";
    movieDescriptionElement.textContent = movieDescription;
    // movieTrailerLink.href = `https://www.youtube.com/watch?v=${movie.id}`; // Placeholder link for details, you might need a specific API endpoint.

    modal.style.display = "block";
  }

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    trailerContainer.style.display = "none"; // Hide trailer container when closing modal
    trailerIframe.src = ""; // Stop the video
  });

  closeTrailerButton.addEventListener("click", () => {
    modal.style.display = "none";
    trailerContainer.style.display = "none"; // Hide trailer container when closing trailer
    trailerIframe.src = ""; // Stop the video
  });

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      trailerContainer.style.display = "none"; // Hide trailer container when closing modal
      trailerIframe.src = ""; // Stop the video
    }
  };

  getTrendMovies();
}
