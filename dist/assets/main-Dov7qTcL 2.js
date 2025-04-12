import{a as b}from"./vendor-DXmaTlaC.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&t(m)}).observe(document,{childList:!0,subtree:!0});function e(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function t(o){if(o.ep)return;o.ep=!0;const c=e(o);fetch(o.href,c)}})();document.addEventListener("DOMContentLoaded",function(){const i=document.querySelector("[data-menu-open]"),n=document.getElementById("mobile-menu__container"),e=document.querySelector("[data-backdrop]"),t=document.getElementById("theme-switcher"),o=document.body;function c(){const a=n.classList.contains("open");n.classList.toggle("open",!a),e.classList.toggle("show",!a)}i.addEventListener("click",c),e.addEventListener("click",()=>{n.classList.remove("open"),e.classList.remove("show")});function m(){localStorage.getItem("theme")==="dark"?(o.classList.add("dark-theme"),document.documentElement.setAttribute("data-theme","dark"),t.classList.add("dark-mode")):(o.classList.remove("dark-theme"),document.documentElement.setAttribute("data-theme","light"),t.classList.add("light-mode"))}t.addEventListener("click",()=>{o.classList.contains("dark-theme")?(o.classList.remove("dark-theme"),document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"),t.classList.remove("dark-mode"),t.classList.add("light-mode")):(o.classList.add("dark-theme"),document.documentElement.setAttribute("data-theme","dark"),localStorage.setItem("theme","dark"),t.classList.remove("light-mode"),t.classList.add("dark-mode"))}),localStorage.getItem("theme")||localStorage.setItem("theme","dark"),m();const s=document.querySelectorAll(".nav-link");window.location.pathname.split("/").pop();const d=localStorage.getItem("activePage");if(d){const a=document.querySelector(`.nav-link[href*='${d}']`);a&&a.classList.add("active")}s.forEach(a=>{a.addEventListener("click",function(){const y=a.getAttribute("href");localStorage.setItem("activePage",y)})})});function A(){const i=document.querySelector(".hero-container"),n=document.getElementById("movieModal"),e=document.querySelector(".close-btn"),t=document.getElementById("trailerContainer"),o=document.getElementById("trailerIframe");let c={};async function m(){const r="cccc5e6104b30f55a3f3b525ec4830b1";try{(await b.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${r}&language=en-US`)).data.genres.forEach(l=>{c[l.id]=l.name})}catch(u){console.error("Genre listesi alınamadı",u)}}function s(r){return r.map(u=>c[u]||"Unknown")}async function d(){const r="cccc5e6104b30f55a3f3b525ec4830b1",u="https://api.themoviedb.org/3";await m();try{const l=(await b.get(`${u}/movie/popular?api_key=${r}&language=tr-TR`)).data.results;if(l.length>0){const v=l[Math.floor(Math.random()*l.length)];y(v)}else E()}catch(p){console.log(p),E()}}function a(r){let u="",p=Math.floor(r/2);for(let l=0;l<5;l++)l<p?u+='<span class="fa fa-star checked"></span>':u+='<span class="fa fa-star"></span>';return u}function y(r){i.style.backgroundImage=`
  linear-gradient(to right, #111 40%, rgba(17, 17, 17, 0) 80%),
  url(https://image.tmdb.org/t/p/original/${r.backdrop_path})
`,i.innerHTML=`
      <div class="hero-content">
        <h1>${r.title}</h1>
        <p class="star">${a(r.vote_average)}</p>
        <p class="overview">${r.overview}</p>
        <button class="trailer">Watch Trailer</button>
        <button class="detail">More Details</button>
      </div>`,document.querySelector(".trailer").addEventListener("click",l=>{l.preventDefault(),_(r.id)}),document.querySelector(".detail").addEventListener("click",l=>{l.preventDefault(),D(r)})}function E(){i.innerHTML=`
      <div class="hero-content-default">
        <h1>Let’s Make Your Own Cinema</h1>
        <p>Is a guide to creating a personalized movie theater experience. You'll need a projector, screen, and speakers.</p>
        <button class="started">Get Started</button>
      </div>`}async function _(r){const p=`https://api.themoviedb.org/3/movie/${r}/videos?api_key=cccc5e6104b30f55a3f3b525ec4830b1&language=en-US`;try{const v=(await b.get(p)).data.results.find(g=>g.type==="Trailer");if(v){const g=`https://www.youtube.com/embed/${v.key}`;o.src=g,t.style.display="block",n.style.display="block"}else alert("Sorry, no trailer available.")}catch(l){console.error("Error fetching trailer",l),alert("Sorry, there was an issue fetching the trailer.")}}function D(r){const p=document.querySelector(".modal-content").querySelector(".modal-body");p.innerHTML="";const l=document.createElement("div");l.classList.add("modal-poster");const v=document.createElement("img");v.src=`https://image.tmdb.org/t/p/w500/${r.poster_path}`,v.alt="Movie Poster",v.classList.add("hero-modal-movie-poster"),l.appendChild(v);const g=document.createElement("div");g.classList.add("hero-modal-info");const S=document.createElement("h2");S.textContent=r.title,g.appendChild(S);const $=document.createElement("p");$.textContent=`RELEASE DATE: ${r.release_date}`,g.appendChild($);const T=document.createElement("p");T.innerHTML=`RATİNG: ${a(r.vote_average)}`,g.appendChild(T);const I=s(r.genre_ids),M=document.createElement("p");M.textContent=`GENRES: ${I.join(", ")}`,g.appendChild(M);const w=document.createElement("p");w.textContent=r.overview||"No description available.",g.appendChild(w),p.appendChild(l),p.appendChild(g),n.style.display="block"}e.addEventListener("click",()=>{n.style.display="none",t.style.display="none",o.src=""}),window.onclick=function(r){r.target===n&&(n.style.display="none",t.style.display="none",o.src="")},d()}async function G(){const i="6c6ff1eefb34466f1e524e319f306b8f",n="https://api.themoviedb.org/3";try{const e=await b.get(`${n}/movie/popular?api_key=${i}&language=tr-TR`);console.log("Veri:",e.data);const t=e.data.results;t.length>0&&[".img",".img1",".img2"].forEach((c,m)=>{const s=t[m],d=document.querySelector(c);if(d){const a=document.createElement("div");a.classList.add("movie-card"),a.dataset.movieId=s.id,a.style.cursor="pointer",a.innerHTML=`
            <div class="image-container">
              <img src="https://image.tmdb.org/t/p/w500${s.poster_path||""}" alt="${s.title}" width="280" height="406">
            </div>
            <div class="movie-details">
              <div class="movie-name">
                <h3>${s.title}</h3>
                <p>${q(s.genre_ids).join(", ")}</p>
              </div>
              <div class="stars">
                ${H(s.vote_average)}
              </div>
            </div>
          `,d.appendChild(a)}})}catch(e){console.error("Error fetching movies:",e)}}function H(i){let n="";const e=Math.floor(i/2);for(let t=0;t<5;t++)t<e?n+='<span class="fa fa-star checked"></span>':n+='<span class="fa fa-star"></span>';return n}function q(i){const n=[{id:28,name:"Aksiyon"},{id:12,name:"Macera"},{id:16,name:"Animasyon"},{id:35,name:"Komedi"},{id:80,name:"Suç"},{id:99,name:"Belgesel"},{id:18,name:"Dram"},{id:10751,name:"Aile"},{id:14,name:"Fantastik"},{id:36,name:"Tarih"},{id:27,name:"Korku"},{id:10402,name:"Müzik"},{id:9648,name:"Gizem"},{id:10749,name:"Romantik"},{id:878,name:"Bilim Kurgu"},{id:10770,name:"Televizyon"},{id:53,name:"Gerilim"},{id:10752,name:"Savaş"},{id:37,name:"Western"}];return i.map(e=>{const t=n.find(o=>o.id===e);return t?t.name:"Bilinmiyor"})}function O(){const i="6c6ff1eefb34466f1e524e319f306b8f",n="https://api.themoviedb.org/3",e=document.getElementById("movie-container");async function t(){try{const d=(await b.get(`${n}/movie/upcoming?api_key=${i}&language=tr-TR`)).data.results;if(d.length===0){e.innerHTML="<p>Yakında çıkacak film bulunamadı.</p>";return}const a=d[Math.floor(Math.random()*d.length)];e.innerHTML=`
      <div class="upcoming-movie-card">
        <img src="https://image.tmdb.org/t/p/w500${a.poster_path}" 
             alt="${a.title}" class="upcoming-movie-poster">
        <div class="movie-info">
        <h3 class="movie-title">${a.title}</h3>

        <div class="release-vote-popular-genre">
        
        <div class="release-vote">
              <p><strong>Release date:</strong> <span class="release-date-value">${c(a.release_date)}</span></p>
          <p><strong>Vote / Votes:</strong><span class="vote-average">${a.vote_average}</span> / <span class="vote-count">${a.vote_count}</span></p>
        </div>
        
        <div class="popular-genre"> 
        <p><strong>Popularity:</strong> <span class="popularity">  ${a.popularity.toFixed(1)} </span></p>
          <p><strong>Genre:</strong> <span class="genre">${o(a.genre_ids)}</p></span> 
        </div>
         
        </div>
        
          
          <h3 class="about">ABOUT</h3>
          <p class="movie-overview">${a.overview}</p>
          <button class="add-to-library"> Add to my library</button>
        </div>
      </div>
    `,document.querySelector(".add-to-library").addEventListener("click",()=>m(a))}catch(s){console.error("Hata:",s),e.innerHTML="<p>Film yüklenirken hata oluştu.</p>"}}function o(s){const d={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};return s.map(a=>d[a]||"Bilinmeyen Tür").join(", ")}function c(s){const[d,a,y]=s.split("-");return`${y}.${a}.${d}`}function m(s){let d=JSON.parse(localStorage.getItem("movieLibrary"))||[];d.some(a=>a.id===s.id)?alert(`${s.title} zaten kütüphanenizde mevcut.`):(d.push(s),localStorage.setItem("movieLibrary",JSON.stringify(d)))}t()}function R(){document.addEventListener("DOMContentLoaded",()=>{const i=document.querySelector("[data-modal-open]"),n=document.querySelector("[data-modal-close]"),e=document.querySelector("[data-modal]");i.addEventListener("click",t=>{t.preventDefault(),e.classList.remove("is-hidden"),document.body.style.overflow="hidden"}),n.addEventListener("click",()=>{e.classList.add("is-hidden"),document.body.style.overflow="auto"}),e.addEventListener("click",t=>{t.target===e&&(e.classList.add("is-hidden"),document.body.style.overflow="auto")})})}let B="6c6ff1eefb34466f1e524e319f306b8f",C="https://api.themoviedb.org/3",L=1,k=1,f=1;window.addEventListener("DOMContentLoaded",()=>{h(L),z()});async function h(i=1,n=""){let e=document.querySelector(".catalog");if(console.log(e),!e){console.error("Catalog öğesi bulunamadı! Lütfen HTML'de .catalog öğesinin bulunduğundan emin olun.");return}e.innerHTML="";try{let t=n?`${C}/search/movie?api_key=${B}&language=tr-TR&page=${i}&query=${n}`:`${C}/movie/popular?api_key=${B}&language=tr-TR&page=${i}`;const o=await b.get(t);let c=o.data.results;k=o.data.total_pages,c.length===0?e.innerHTML="<div class='no-results'><p>Oops...</p> <p>We are sorry !</p><p>We don't have any results matching your search.</p></div>":c.forEach(m=>{let s=document.createElement("div");s.classList.add("movie-card"),s.innerHTML=`
          <div class="image-container">
            <img src="https://image.tmdb.org/t/p/w500${m.poster_path}" alt="${m.title}">
          </div>
          <div class="movie-details">
            <div class="movie-name">
              <h3>${m.title}</h3>
              <p>${N(m.genre_ids).join(", ")}</p>
            </div>
            <div class="stars">
              ${x(m.vote_average)}
            </div>
          </div>
        `,e.appendChild(s)}),P(n)}catch(t){console.error("Hata:",t)}}function P(i=""){const n=document.querySelector(".pagination");if(n.innerHTML="",f>1){let e=document.createElement("button");e.innerText="Prev",e.classList.add("pagination-button"),e.addEventListener("click",()=>{f-=3,h(f,i)}),n.appendChild(e)}for(let e=f;e<f+3&&e<=k;e++){let t=document.createElement("button");t.innerText=e,t.classList.add("pagination-button"),e===L&&t.classList.add("active"),t.addEventListener("click",()=>{L=e,h(e,i)}),n.appendChild(t)}if(f+3<=k){let e=document.createElement("button");e.innerText="Next",e.classList.add("pagination-button"),e.addEventListener("click",()=>{f+=3,h(f,i)}),n.appendChild(e)}}function x(i){let n="",e=Math.floor(i/2);for(let t=0;t<5;t++)t<e?n+='<span class="fa fa-star checked"></span>':n+='<span class="fa fa-star"></span>';return n}function N(i){const n=[{id:28,name:"Aksiyon"},{id:12,name:"Macera"},{id:16,name:"Animasyon"},{id:35,name:"Komedi"},{id:80,name:"Suç"},{id:99,name:"Belgesel"},{id:18,name:"Dram"},{id:10751,name:"Aile"},{id:14,name:"Fantastik"},{id:36,name:"Tarih"},{id:27,name:"Korku"},{id:10402,name:"Müzik"},{id:9648,name:"Gizem"},{id:10749,name:"Romantik"},{id:878,name:"Bilim Kurgu"},{id:10770,name:"Televizyon"},{id:53,name:"Gerilim"},{id:10752,name:"Savaş"},{id:37,name:"Western"}];return i.map(e=>{const t=n.find(o=>o.id===e);return t?t.name:"Bilinmiyor"})}function z(){const i=document.getElementById("search-btn"),n=document.getElementById("genre-select");i.addEventListener("click",()=>{const e=n.value.trim();e?h(1,e):h(1)}),n.addEventListener("keyup",e=>{const t=n.value.trim();e.key==="Enter"&&t&&h(1,t)})}function K(){const i=document.getElementById("scrollToTopBtn");window.onscroll=function(){document.body.scrollTop>300||document.documentElement.scrollTop>300?i.style.display="block":i.style.display="none"},i.addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})})}A();G();O();R();h();K();
//# sourceMappingURL=main-Dov7qTcL.js.map
