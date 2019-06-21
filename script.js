const searchForm = document.querySelector("#search-form");
const movies = document.querySelector("#movies");
const searchInput = document.querySelector("#searchText");
const urlPoster = "https://image.tmdb.org/t/p/w500";

const API_KEY = "30bcec8f5dda885072b3eeb762fe32c3";


document.addEventListener('DOMContentLoaded', () => renderTrending());

function apiSearch(e) {
    e.preventDefault();
    const searchText = searchInput.value;
    const url = "https://api.themoviedb.org/3/search/multi?api_key=" + API_KEY + "&language=ru&query=" + searchText + "&page=1&include_adult=false";
    movies.innerHTML = "Загрузка";
    if (searchText) {
        fetch(url).then((value) => {
            return value.json();
        }).then((result) => {
            let markup = "";

            result.results.forEach((obj) => {
                let name = obj.title || obj.name;
                markup += getMovieMarkup(name, obj.overview, obj.poster_path, obj.id);

            });

            movies.innerHTML = markup;
        }).catch((obj) => {

        });
    }
}

searchForm.addEventListener('submit', apiSearch);

function getMovieMarkup(name, description, img, id) {
    name = name.substr(0, 30);
    img = img ? urlPoster + img : "http://styled.cc/images/st-404.jpg";
    return `<div class="movie col-sm-6 col-md-3 mb-4">
                   <div class="card w-100" style="width: 18rem;">
                       <img src=${img} class="card-img-top" alt="...">
                      <div class="movie-body card-img-overlay ">
                          <div class="row h-100">
                              <h3 class="card-title w-100 min-vh-25 h-25 text-center">${name}</h3>
                              <p class="card-text text-center max-vh-50 h-50 movie-description">${description}</p>
                              <a href=./view.html?id=${id} class="btn btn-primary w-100 movie-button">Подробнее</a>
                          </div>
                       </div>
                  </div>
              </div>`;
}

/**
 *
 * @param api
 * @param media_type all/tv/movie/person
 * @param time_window day/week
 */
function renderTrending(api = API_KEY, media_type = "all", time_window = "week") {
    console.log("render");
    const url = `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?language=ru&api_key=${api}`;
    movies.innerHTML = "Загрузка";
    fetch(url).then((value) => {
        return value.json();
    }).then((result) => {
        console.log(result);
        let markup = "";

        result.results.forEach((obj) => {
            let name = obj.title || obj.name;
            markup += getMovieMarkup(name, obj.overview, obj.poster_path, obj.id);
        });

        movies.innerHTML = markup;
    }).catch((obj) => {

    });
}

