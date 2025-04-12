document.addEventListener("DOMContentLoaded",function(){if(!document.getElementById("movie-popup-overlay")){const e=document.createElement("div");e.id="movie-popup-overlay",e.style.cssText=`
      display:none; position:fixed; top:0; left:0; width:100%; height:100%;
      background-color:rgba(0, 0, 0, 0.8); z-index:9999; align-items:center; justify-content:center;
    `,document.body.appendChild(e),e.addEventListener("click",t=>{t.target===e&&d()}),document.addEventListener("keydown",t=>{t.key==="Escape"&&d()})}y()});function p(){document.querySelectorAll(".movie-card").forEach(e=>{var t;if(e.style.cursor="pointer",!e.dataset.movieId){const o=(t=e.querySelector("h3"))==null?void 0:t.textContent;o&&u(o,e)}})}async function u(e,t){var o;try{const r=`https://api.themoviedb.org/3/search/movie?api_key=6c6ff1eefb34466f1e524e319f306b8f&language=tr-TR&query=${encodeURIComponent(e)}`,a=await(await fetch(r)).json();((o=a.results)==null?void 0:o.length)>0&&(t.dataset.movieId=a.results[0].id)}catch(n){console.error("Movie ID search error:",n)}}function y(){p(),document.body.addEventListener("click",function(e){var n;const t=e.target.closest(".movie-card");if(!t)return;const o=t.dataset.movieId;if(o)l(o);else{const r=(n=t.querySelector("h3"))==null?void 0:n.textContent;r&&v(r)}})}async function v(e){var t;try{const n=`https://api.themoviedb.org/3/search/movie?api_key=6c6ff1eefb34466f1e524e319f306b8f&language=tr-TR&query=${encodeURIComponent(e)}`,i=await(await fetch(n)).json();((t=i.results)==null?void 0:t.length)>0&&l(i.results[0].id)}catch(o){console.error("Search and show error:",o)}}async function l(e){const t=document.getElementById("movie-popup-overlay");if(t){t.innerHTML='<div style="...">Loading...</div>',t.style.display="flex";try{const n=`https://api.themoviedb.org/3/movie/${e}?api_key=6c6ff1eefb34466f1e524e319f306b8f&language=tr-TR`,i=await(await fetch(n)).json(),a=window.innerWidth<768,s=document.createElement("div");s.style.cssText=`
      position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
      background-color:#222; color:white; padding:20px; border-radius:10px;
      width:90%; max-width:800px; max-height:80vh; overflow:auto; box-shadow:0 0 20px rgba(248, 119, 25, 0.3);
    `,s.innerHTML=`
      <div style="position:relative;">
        <span style="position:absolute; top:0; right:0; font-size:24px; cursor:pointer; color:#aaa;">&times;</span>
        <div class="popup-content-wrapper" style="display:flex; flex-direction:${a?"column":"row"}; gap:15px;">
          <div class="popup-image" style="${a?"":"flex:0 0 40%;"} text-align:center;">
            <img src="https://image.tmdb.org/t/p/w500${i.poster_path}" alt="${i.title}" style="max-width:100%; max-height:300px; object-fit:contain; border-radius:8px;">
          </div>
          <div class="popup-details" style="${a?"":"flex:1;"} display:flex; flex-direction:column;">
            <h2 style="color:#f87719;">${i.title}</h2>
            <p><strong>Release Date:</strong> ${i.release_date}</p>
            <p><strong>Rating:</strong> ${i.vote_average}/10</p>
            <p><strong>Genres:</strong> ${i.genres.map(c=>c.name).join(", ")}</p>
            <h3>Overview</h3>
            <p>${i.overview||"No overview available."}</p>
            <button id="add-to-library" style="margin-top:auto; padding:10px 15px; background:linear-gradient(141.22deg, #ffc226 9.4%, #f84119 91.91%); color:white; border:none; border-radius:74px; cursor:pointer;">Add to my library</button>
          </div>
        </div>
      </div>
    `,t.innerHTML="",t.appendChild(s),s.querySelector("span").addEventListener("click",d),s.querySelector("#add-to-library").addEventListener("click",function(){f(i),this.textContent="Added to library",this.style.opacity="0.7",this.disabled=!0})}catch{t.innerHTML='<div style="...">Error loading movie details.<button onclick="closeMoviePopup()">Close</button></div>'}}}function f(e){let t=JSON.parse(localStorage.getItem("movieLibrary")||"[]");t.some(o=>o.id===e.id)||(t.push({id:e.id,title:e.title,poster_path:e.poster_path,release_date:e.release_date,vote_average:e.vote_average,genre_ids:e.genres.map(o=>o.id),added_date:new Date().toISOString()}),localStorage.setItem("movieLibrary",JSON.stringify(t)))}function d(){const e=document.getElementById("movie-popup-overlay");e&&(e.style.display="none")}setInterval(p,3e3);window.closeMoviePopup=d;
//# sourceMappingURL=moviePopUp-D7awKcYM.js.map
