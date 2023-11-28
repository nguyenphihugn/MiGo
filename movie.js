const modeBtn = document.getElementById("checkbox");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const categoUl = document.querySelector(".tvshowcatrgory_ul");
const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);
const searchResultDiv = document.querySelector(".search_result_div");
const NextBtn = document.querySelector(".Next_btn");
const previousBtn = document.querySelector(".previous_btn");
const pageCount = document.querySelector(".pageCount");
const preLoader = document.querySelector(".preLoader");

const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box");

modeBtn.onchange = (e) => {
  if (modeBtn.checked === true) {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    window.localStorage.setItem("mode", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    window.localStorage.setItem("mode", "light");
  }
};

const mode = window.localStorage.getItem("mode");
if (mode == "dark") {
  modeBtn.checked = true;
  document.documentElement.classList.remove("light");
  document.documentElement.classList.add("dark");
}

if (mode == "light") {
  modeBtn.checked = false;
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.add("light");
}

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

window.addEventListener("load", function () {
  preLoader.style.display = "none";
});

const myApi = "11f047b1d0571bbf2c275777798c6057";

let categoryId = "";

const genrelist = async () => {
  let htmlll = "";
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${myApi}&language=vi-VN`
  );
  const data = await res.json();
  const genres = data.genres;
  genres.forEach((item) => {
    htmlll += `<li class="tvshowGenreList" data-id=${item.id}>${item.name}</li>`;
  });
  categoUl.innerHTML = htmlll;
};

genrelist();

const firstpage = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&sort_by=popularity.desc&include_adult=false&page=${intialPage}&with_genres=${categoryId}&language=vi-VN`
  );
  const data = await res.json();
  const airingtoday = data.results;
  let htmll = " ";
  airingtoday.forEach((item) => {
    if (item.poster_path !== null) {
      htmll += searchfun(item);
      searchResultDiv.innerHTML = htmll;
    }
  });
};

const airingTodayfun = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&sort_by=popularity.desc&include_adult=false&with_genres=${categoryId}&language=vi-VN`
  );
  const data = await res.json();
  let totalPages = data.total_pages;
  return totalPages;
};

let intialPage = 1;
firstpage();
airingTodayfun().then((totalpage) => {
  pageCount.innerText = `Trang ${intialPage} - ${totalpage}`;
});

const btnactive = function (intial, totalpage) {
  if (intial == 1) {
    previousBtn.classList.add("btnDeactive");
    NextBtn.classList.remove("btnDeactive");
  }

  if (intial > 1) {
    previousBtn.classList.remove("btnDeactive");
    NextBtn.classList.remove("btnDeactive");
  }

  if (intial == totalpage) {
    previousBtn.classList.remove("btnDeactive");
    NextBtn.classList.add("btnDeactive");
  }
};

previousBtn.classList.add("btnDeactive");

NextBtn.addEventListener("click", function () {
  airingTodayfun().then((totalpage) => {
    if (intialPage < totalpage) {
      intialPage += 1;
      firstpage();
      pageCount.innerText = `Trang ${intialPage} - ${totalpage}`;
      btnactive(intialPage, totalpage);
    }
  });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

previousBtn.addEventListener("click", function () {
  airingTodayfun().then((totalpage) => {
    if (intialPage > 1) {
      intialPage -= 1;
      pageCount.innerText = `Trang ${intialPage} - ${totalpage}`;
      firstpage();
      btnactive(intialPage, totalpage);
    }
  });
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

const searchfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
  <a class="posterlink" href=${url}> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
        onerror="this.onerror=null;this.src='./images/logoblur.png';"
        loading="lazy" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${averagVoteformat(
               movie.vote_average
             )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Phim</div>
             </div>
         </div>`;
};

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

const dateFormatter = function (date) {
  let currdate = date;
  const newDate = currdate?.slice(0, 4);
  return newDate;
};

categoUl.addEventListener("click", function (e) {
  let element = e.target;
  if (element.classList.contains("tvshowGenreList")) {
    const categoLi = document.querySelectorAll(".tvshowcatrgory_ul li");
    categoLi.forEach((i) => i.classList.remove("actv"));
    element.classList.add("actv");
    categoryId = element.dataset.id;
    intialPage = 1;
    firstpage();
    airingTodayfun().then((totalpage) => {
      pageCount.innerText = `Trang ${intialPage} - ${totalpage}`;
    });
  }
});

searchBtn.addEventListener("click", function () {
  location.replace("./search.html");
});
