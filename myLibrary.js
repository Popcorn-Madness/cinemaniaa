import"./assets/loader-CMxwXPbA.js";import"./assets/vendor-DXmaTlaC.js";const d=[{id:28,name:"Aksiyon"},{id:12,name:"Macera"},{id:16,name:"Animasyon"},{id:35,name:"Komedi"},{id:80,name:"Suç"},{id:99,name:"Belgesel"},{id:18,name:"Dram"},{id:10751,name:"Aile"},{id:14,name:"Fantastik"},{id:36,name:"Tarih"},{id:27,name:"Korku"},{id:10402,name:"Müzik"},{id:9648,name:"Gizem"},{id:10749,name:"Romantik"},{id:878,name:"Bilim Kurgu"},{id:10770,name:"Televizyon"},{id:53,name:"Gerilim"},{id:10752,name:"Savaş"},{id:37,name:"Western"},{id:38,name:"Absürd"}];window.onload=function(){m(),s();const e=document.querySelector(".genreSelect");e==null||e.addEventListener("change",i=>{s(i.target.value)})};function s(e=""){const i=document.querySelector(".library-catalog");i.innerHTML="";let a=JSON.parse(localStorage.getItem("movieLibrary"))||[];const n=e?a.filter(t=>t.genre_ids.includes(parseInt(e))):a;if(n.length===0){i.innerHTML='<div class="no-results-message"><p>OOPS...</p><p>Your library is empty..</p></div>';return}n.forEach(t=>{const r=document.createElement("div");r.className="movie-card-library",r.dataset.movieId=t.id,r.innerHTML=`
      <div class="image-container">
        <img src="https://image.tmdb.org/t/p/w500${t.poster_path}" alt="${t.title}">
      </div>
      <div class="movie-details-library">
        <div class="movie-name-library">
          <h3>${t.title}</h3>
          <p>${c(t.genre_ids).join(", ")}</p>
        </div>
        <div class="stars">${o(t.vote_average)}</div>
      </div>
      <div class="delete-btn">
        <i class="fas fa-trash-alt" title="Sil"></i>
      </div>
    `,r.querySelector(".delete-btn").addEventListener("click",()=>{a=a.filter(l=>l.id!==t.id),localStorage.setItem("movieLibrary",JSON.stringify(a)),s(e)}),i.appendChild(r)})}function o(e){let i="",a=Math.floor(e/2);for(let n=0;n<5;n++)i+=n<a?'<span class="fa fa-star checked"></span>':'<span class="fa fa-star"></span>';return i}function c(e){return e.map(i=>{const a=d.find(n=>n.id===i);return a?a.name:"Bilinmiyor"})}function m(){const e=document.querySelector(".genreSelect");e.innerHTML='<option value="">All Genres</option>',d.forEach(i=>{const a=document.createElement("option");a.value=i.id,a.textContent=i.name,e.appendChild(a)})}
//# sourceMappingURL=myLibrary.js.map
