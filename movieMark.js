// Xu Ly Dang Nhap
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const modeBtn = document.getElementById("checkbox");
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box");
const searchResultDiv = document.querySelector(".search_result_div");
const preLoader = document.querySelector(".preLoader");
const main = document.querySelector(".main_container");
const headertext = document.querySelector(".text_movie");

const firebaseConfig = {
  apiKey: "AIzaSyBqJwRtrx9eDiFUxL8muj4NKJisH78GS9M",
  authDomain: "auth-migomovie.firebaseapp.com",
  databaseURL: "https://auth-migomovie-default-rtdb.firebaseio.com",
  projectId: "auth-migomovie",
  storageBucket: "auth-migomovie.appspot.com",
  messagingSenderId: "165090376492",
  appId: "1:165090376492:web:7c970c762354e5b2304a89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  const username = document.querySelector(".username");
  if (user) {
    const uid = user.uid;
    username.innerHTML = user.displayName;
    if (user.photoURL != null) {
      // Use user.photoUrl
      document.getElementById("ava").src = user.photoURL;
    }

    let htmll = "";
    searchResultDiv.innerHTML = "";
    // Check data in Database
    get(child(ref(database), "users/" + uid + "/movieid"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          //   console.log(snapshot.val());
          var data = snapshot.val();
          for (var key in data) {
            var temp = {
              key: key,
              id: data[key],
            };
            // console.log(temp.id);
            searchitem(temp.id).then((movies) => {
              htmll += searchMoviefun(movies);
              searchResultDiv.innerHTML = htmll;
            });
          }
        } else {
          headertext.innerHTML = "Chưa Có Bộ Phim Nào Được Lưu";
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    window.location.href = "login.html";
  }
});

signoutdata.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.href = "login.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});

// Xu Ly Ham
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

window.addEventListener("load", function () {
  preLoader.style.display = "none";
  main.style.display = "";
});

const myApi = "11f047b1d0571bbf2c275777798c6057";

const searchitem = async (srchquery) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${srchquery}?api_key=${myApi}&language=vi-VN`
  );
  const data = await res.json();
  const NowPlayingmovies = data;
  //   console.log(data);
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

const dateFormatter = function (date) {
  let currdate = date;
  let newDate = currdate.slice(0, 4);
  return newDate;
};
