const modeBtn = document.getElementById("checkbox");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const currentPopularMoviesDiv = document.querySelector(
  ".current_popular_movies_div"
);
const trending_div_container = document.querySelector(
  ".trending_div_container"
);
const trending_left_btn = document.querySelector(".trending_left_btn");
const trending_right_btn = document.querySelector(".trending_right_btn");
const trending_container = document.querySelector(".trending_container");
const leftArrow = document.querySelectorAll(".leftarrow");
const rightarrow = document.querySelectorAll(".rightarrow");
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

searchBtn.addEventListener("click", function () {
  window.location.replace("./search.html");
});

const myApi = "11f047b1d0571bbf2c275777798c6057";

const NowPlaying = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${myApi}&language=vi-VN&page=1`
  );
  const data = await res.json();
  const NowPlayingmovies = data.results;
  return NowPlayingmovies;
};

const popularnow = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${myApi}&language=vi-VN&page=1`
  );
  const data = await res.json();
  const popularnowmovies = data.results;
  return popularnowmovies;
};

const TodayTrending = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${myApi}&language=vi-VN`
  );
  const data = await res.json();
  const trendingtoday = data.results;
  return trendingtoday;
};

const NowPlayingfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="Now_playing_movies" >
    <a class="posterlink" href=${url}> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
        onerror="this.onerror=null;this.src='.images/logoblur.png';"
        loading="lazy" alt="${movie.title}"></a>
         <p class="movie_title">${movie.title}</p>
         <div class="date_rating">
             <p class="date">${dateFormatter(
               movie.release_date
             )}</p><span class="dot dot2"></span>
             <p class="rating">${
               movie.vote_average
             }<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                         height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                         <path
                             d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                     </svg></span></p>
             <div class="category">Phim</div>
             </div>
         </div>`;
};

const currpopularfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="current_popular_movies" >
    <a class="posterlink" href=${url}> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
  onerror="this.onerror=null;this.src='.images/logoblur.png';"
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

const trendinghtml = function (data) {
  let url = "./movieDetail.html?id=" + encodeURIComponent(data.id);
  return `<div class="trending_div slides">
    <div class="trending_child"> </div>
    <a class="trending_poster" href="${url}"  data-id="${data.id}">
        <img class="trending_poster"
            src="https://image.tmdb.org/t/p/original//${data.backdrop_path}"
            alt="${data.title}">
           
            <div class="trending_child_2"> </div>
        <div class="trending_details">
            <h1 class="Trending_heading">Phim Nổi Bật
            </h1>
            <h3 class="trending_title">${data.title}</h3>

        </div>
    </a>

</div>`;
};

const dateFormatter = function (date) {
  let currdate = date;
  const newDate = currdate.slice(0, 4);
  return newDate;
};

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

TodayTrending().then((trends) => {
  trends.forEach((trend) => {
    const html = trendinghtml(trend);
    trending_div_container.insertAdjacentHTML("beforeend", html);
  });
  const slide = document.querySelectorAll(".slides");
  slide.forEach(
    (item, i) => (item.style.transform = `translateX(${100 * i}%)`)
  );

  let currentSlide = 0;
  maxSlide = slide.length;

  const goToSlide = function (slides) {
    slide.forEach(
      (item, i) => (item.style.transform = `translateX(${100 * (i - slides)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  };

  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  };

  trending_right_btn.addEventListener("click", nextSlide);

  trending_left_btn.addEventListener("click", previousSlide);

  timer = setInterval(function () {
    nextSlide();
  }, 5000);

  function myStopFunction() {
    clearTimeout(timer);
  }

  document
    .querySelector(".trending_child_2")
    .addEventListener("mouseover", myStopFunction);
  document
    .querySelector(".trending_child_2")
    .addEventListener("mouseout", function () {
      timer = setInterval(function () {
        nextSlide();
      }, 5000);
    });
});

NowPlaying().then((movies) => {
  movies.forEach((moviee) => {
    const htmll = NowPlayingfun(moviee);
    NowPlayingMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const NowPlayingMovies = document.querySelectorAll(".Now_playing_movies");
  NowPlayingMovies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

popularnow().then((movies) => {
  movies.forEach((moviee) => {
    const htmll = currpopularfun(moviee);
    currentPopularMoviesDiv.insertAdjacentHTML("beforeend", htmll);
  });

  const current_popular_movies = document.querySelectorAll(
    ".current_popular_movies"
  );
  current_popular_movies.forEach(
    (ele, i) => (ele.style.transform = `TranslateX(${i * 115}%)`)
  );
});

leftArrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplaying") {
      Sidescroll(NowPlayingMoviesDiv, "left", 2, 500, 15);
    }

    if (item.parentElement.id == "Trendingmovies") {
      Sidescroll(currentPopularMoviesDiv, "left", 2, 500, 15);
    }
  })
);

rightarrow.forEach((item) =>
  item.addEventListener("click", function () {
    if (item.parentElement.id == "nowplaying") {
      Sidescroll(NowPlayingMoviesDiv, "right", 2, 500, 15);
    }

    if (item.parentElement.id == "Trendingmovies") {
      Sidescroll(currentPopularMoviesDiv, "right", 2, 500, 15);
    }
  })
);

const Sidescroll = function (element, direction, speed, distance, step) {
  scrollAmount = 0;
  let slideTimer = setInterval(function () {
    if (direction == "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
};
