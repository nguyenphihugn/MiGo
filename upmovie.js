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

const today = new Date();
const yyyy = today.getFullYear();
const yyyy2 = today.getFullYear() + 1;
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = yyyy + "-" + mm + "-" + dd;
const next1year = yyyy2 + "-" + mm + "-" + dd;
// console.log(next1year);

const firstpage = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&language=vi-VN&include_adult=false&page=${intialPage}&primary_release_date.gte=${formattedToday}&primary_release_date.lte=${next1year}&with_genres=${categoryId}`
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
    `https://api.themoviedb.org/3/discover/movie?api_key=${myApi}&language=vi-VN&include_adult=false&page=${intialPage}&primary_release_date.gte=2023-05-30&primary_release_date.lte=2023-12-30&with_genres=${categoryId}`
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
        onerror="this.onerror=null;this.src='./resources/logoblur.png';"
        loading="lazy" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${format(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <div class="category">Phim</div>
             </div>
         </div>`;
};

function format(inputDate) {
  var splitDate = inputDate.split("-");
  if (splitDate.count == 0) {
    return null;
  }

  var year = splitDate[0];
  var month = splitDate[1];
  var day = splitDate[2];

  return day + "/" + month + "/" + year;
}

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
