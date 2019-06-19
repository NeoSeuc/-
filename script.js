const searchForm = document.querySelector("#search-form");
const movies = document.querySelector("#movies");
const searchInput = document.querySelector("#searchText");
const urlPoster = "https://image.tmdb.org/t/p/w500";
function apiSearch(e) {
    e.preventDefault();
    const searchText = searchInput.value;
    const url = "https://api.themoviedb.org/3/search/multi?api_key=30bcec8f5dda885072b3eeb762fe32c3&language=ru&query=" + searchText + "&page=2&include_adult=false";

    if (searchText)
        fetch(url).then((value) => {
            return value.json();
        }).then((result) => {
            console.log(result);
            let markup = "";

            result.results.forEach((obj)=>{
                let name = obj.title || obj.name;
                markup += getMovieMarkup(name, obj.overview, obj.poster_path);
            });

            movies.innerHTML = markup;
        }).catch((obj) => {
            console.log(obj);
        });
}

searchForm.addEventListener('submit', apiSearch);

function getMovieMarkup(name, description, img) {
    name = name.substr(0, 30);
    description = description.substr(0, 60) + "...";
    img = img ? urlPoster+img : "http://styled.cc/images/st-404.jpg";
    return `<div class="col">
                   <div class="card " style="width: 18rem;">
                       <img src=${img} class="card-img-top" alt="...">
                      <div class="card-body">
                          <h5 class="card-title">${name}</h5>
                          <p class="card-text">${description}</p>
                          <a href="#" class="btn btn-primary">Посмотреть</a>
                       </div>
                  </div>
              </div>`;
}