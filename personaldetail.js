const personMoviesDiv = document.querySelector(".person_movies_div");
const profilePictureContainer = document.querySelector(
  ".profile_picture_container"
);
const personName = document.querySelector(".person_name");
const biography = document.querySelector(".biography");
const birthPlace = document.querySelector(".birth_place");
const gender = document.querySelector(".gender");
const DoB = document.querySelector(".DoB");
const searchResultDiv = document.querySelector(".search_result_div");
const CategoriesContainer = document.querySelector(".CategoriesContainer");
const categories_btn = document.querySelectorAll(".categories_btn");
const modeBtn = document.getElementById("checkbox");
const NowPlayingMoviesDiv = document.querySelector(".Now_playing_movies_div");
const movieDetailnavContainer = document.querySelector(
  ".movieDetailnavContainer"
);
const moreinfo = document.querySelector(".moreinfo");
const main = document.querySelector(".main_container");
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
  main.style.display = "";
});

const myApi = "11f047b1d0571bbf2c275777798c6057";

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

const personMoivesfun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
      <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
    loading="lazy" 
          onerror="this.onerror=null;this.src='./resources/biglogo.png';"
           alt="${movie.title}"></a>
           <p class="movie_title movie_title_search" >${movie.title}</p>
           <div class="date_rating">
               <p class="date date_search">${dateFormatter(
                 movie.release_date
               )}</p><span class="dot dot2"></span>
               <p class="rating rating_search">${averagVoteformat(
                 movie.vote_average
               )}<span><svg xmlns="http://www.w3.org/2000/svg" width="10"
                           height="10" fill="Yellow" class="star bi-star-fill" viewBox="0 0 16 16">
                           <path
                               d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                       </svg></span></p>
               <div class="category category_search">Phim</div>
               </div>
           </div>`;
};

const personMOvies = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${myApi}&append_to_response=combined_credits`
  );
  const data = await res.json();
  const NowPlayingmovies = data;
  return NowPlayingmovies;
};

let pp = "";
let morein4 = "";

let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);
function personallcat() {
  let htmll = " ";
  personMOvies(fetcid).then((dat) => {
    profilep(dat);
    let moviecrdits = dat.combined_credits.cast;
    moviecrdits.sort((cast1, cast2) => cast2.vote_average - cast1.vote_average);
    moviecrdits.forEach((item) => {
      if (
        item.media_type == "movie" &&
        item.release_date !== "" &&
        item.poster_path !== null
      ) {
        htmll += personMoivesfun(item);
      }
      searchResultDiv.innerHTML = htmll;
    });
  });
}
personallcat();

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

const profilep = function (person) {
  // console.log(person);
  personName.textContent = person.name;
  biography.textContent = person.biography;
  birthPlace.textContent = person.place_of_birth;
  gender.textContent = person.gender == 2 ? "Nam" : "Nữ";
  DoB.textContent = format(person.birthday);
  let pp = `<img class="pp" src="https://image.tmdb.org/t/p/w500/${person.profile_path}" alt="">`;
  let morein4 = `<a class="GoogleButton" href="https://www.google.com/search?q=${person.name}" target="_blank">Tìm hiểu thêm</a> </span> `;
  moreinfo.innerHTML = morein4;
  profilePictureContainer.innerHTML = pp;
};

searchBtn.addEventListener("click", function () {
  location.replace("./search.html");
});
