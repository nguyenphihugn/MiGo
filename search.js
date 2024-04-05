const modeBtn = document.getElementById("checkbox");
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box");
const searchinput = document.getElementById("searchinput");
const searchinfo = document.getElementById("searchresult");
const searchResultDiv = document.querySelector(".search_result_div");
const sbox = body.querySelector(".search-box-2");

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
  location.replace("./search.html");
});

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

if (SpeechRecognition) {
  console.log("Your browser supports voice!");
  sbox.insertAdjacentHTML(
    "beforeend",
    '<button type="button" class="micbtn"><i class="bx bxs-microphone" id="micro"></i></button>'
  );

  const micBtn = document.querySelector(".micbtn");
  const micIcon = micBtn.querySelector("i");

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  micBtn.addEventListener("click", () => {
    if (micIcon.classList.contains("bxs-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  });
  recognition.addEventListener("start", () => {
    micIcon.classList.remove("bxs-microphone");
    micIcon.classList.add("bxs-microphone-off");
    // searchinput.focus();
    console.log("Voice activated, SPEAK");
  });

  recognition.addEventListener("end", () => {
    micIcon.classList.remove("bxs-microphone-off");
    micIcon.classList.add("bxs-microphone");
    // searchinput.focus();
    console.log("Speech recognition service disconnected");
  });
  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(event);
    searchinput.value = transcript;
    let htmll = "";
    searchResultDiv.innerHTML = "";
    let searchQuery = transcript;
    searchinfo.textContent = `Kết quả tìm kiếm cho ${searchQuery} :`;
    searchitem(searchQuery).then((movies) => {
      movies.forEach((moviee) => {
        if (
          moviee.media_type == "movie" &&
          "release_date" in moviee &&
          moviee.poster_path != null
        ) {
          htmll += searchMoviefun(moviee);
        }

        if (moviee.media_type == "person" && moviee.profile_path != null) {
          htmll += searchPersonFun(moviee);
        }
        searchResultDiv.innerHTML = htmll;
      });
    });
  });
} else {
  console.log("Your browser doesn't support voice!");
}

const myApi = "11f047b1d0571bbf2c275777798c6057";

const searchitem = async (srchquery) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${myApi}&language=en-US&query=${srchquery}`
  );
  const data = await res.json();
  const NowPlayingmovies = data.results;
  return NowPlayingmovies;
};

const averagVoteformat = function (receivedVote) {
  let currVote = receivedVote.toString();
  const newVote = currVote.slice(0, 3);
  return newVote;
};

const searchMoviefun = (movie) => {
  let url = "./movieDetail.html?id=" + encodeURIComponent(movie.id);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${
    movie.id
  }"
  src='./images/image-removebg-preview.png'
  data-src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
  loading="lazy" 
  onload="this.src=this.getAttribute('data-src')"
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

const searchPersonFun = (Castee) => {
  let url = "./personDetail.html?id=" + encodeURIComponent(Castee.id);
  // console.log(Castee);
  return `<div class="item" >
    <a class="posterlink" href="${url}"> <img class="poster" data-id="${Castee.id}" 
    src='./images/image-removebg-preview.png'
    data-src="https://image.tmdb.org/t/p/w500/${Castee.profile_path}" 
    loading="lazy" 
    onload="this.src=this.getAttribute('data-src')"
        alt="${Castee.name}"></a>
         <p class="movie_title movie_title_search" >${Castee.name}</p>
         <div class="date_rating tvshow</p><span class="dot dot2 recommendTvShow_date_dot"></span>
         <p class="rating rating_search"><span><svg xmlns="http://www.w3.org/2000/svg" width="12"
                     height="12" fill="Orange" class="star bi-star-fill" viewBox="0 0 24 24">
                     <path d="M16.5 8c0 1.5-.5 3.5-2.9 4.3.7-1.7.8-3.4.3-5-.7-2.1-3-3.7-4.6-4.6-.4-.3-1.1.1-1 .7 0 1.1-.3 2.7-2 4.4C4.1 10 3 12.3 3 14.5 3 17.4 5 21 9 21c-4-4-1-7.5-1-7.5.8 5.9 5 7.5 7 7.5 1.7 0 5-1.2 5-6.4 0-3.1-1.3-5.5-2.4-6.9-.3-.5-1-.2-1.1.3"></path>
                 </svg></span> ${Castee.popularity}</p>
             <div class="category category_search recommendTvShow_category">Nhân Vật</div>
             </div>
         </div>`;
};

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};

const searchInput = document.getElementById("searchinput");
let typingTimer;
const delay = 700;
searchInput.addEventListener("keyup", function () {
  clearTimeout(typingTimer);

  typingTimer = setTimeout(function () {
    console.log("User stopped typing!");
    if (searchinput.value != "") {
      let htmll = "";
      searchResultDiv.innerHTML = "";
      let searchQuery = searchinput.value;
      searchinfo.textContent = `Kết quả tìm kiếm cho ${searchQuery} :`;
      searchitem(searchQuery).then((movies) => {
        movies.forEach((moviee) => {
          if (
            moviee.media_type == "movie" &&
            "release_date" in moviee &&
            moviee.poster_path != null
          ) {
            htmll += searchMoviefun(moviee);
          }

          if (moviee.media_type == "person" && moviee.profile_path != null) {
            htmll += searchPersonFun(moviee);
          }
          searchResultDiv.innerHTML = htmll;
        });
      });
    } else {
      htmll = "";
      searchResultDiv.innerHTML = "";
      searchinfo.textContent = `Nhập từ khoá tìm kiếm`;
    }
  }, delay);
});

window.onload = function () {
  searchBtn.focus();
};
