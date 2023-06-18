const modeBtn = document.getElementById("checkbox");
const movie_section = document.querySelector(".movie");
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
const marked = window.localStorage.getItem("marked");
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

searchBtn.addEventListener("click", function () {
  location.replace("./search.html");
});

let url = document.location.href;
let fetcid = url.slice(url.indexOf("=") + 1);

const Moviefunc = function (id) {
  return `<iframe src="https://www.2embed.cc/embed/${id}" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
};

const movieLoad = function () {
  let movieHtml = Moviefunc(fetcid);
  movie_section.innerHTML = movieHtml;
  //   CurrMovie(fetcid).then((dat) => {
  //     let htm = "";
  //     htm = html2(dat);
  //     movieDetails.innerHTML = htm;
  //   });
};

movieLoad();
