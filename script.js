const searchForm = document.querySelector("#search-form");
const movies = document.querySelector("#movies");
const searchInput = document.querySelector("#searchText");

function apiSearch(e) {
    e.preventDefault();
    const searchText = searchInput.value,
        url = "https://api.themoviedb.org/3/search/movie?api_key=30bcec8f5dda885072b3eeb762fe32c3&language=ru&query=" + searchText + "&page=1&include_adult=false";
    if (searchText)
        requestApi(url).then((res) => {
            const result = JSON.parse(res);
            let markup = "";
            for (let i = 0; i < result.total_results; i++) {
                let obj = result.results[i];
                if (!obj)
                    continue;
                let name = obj.title || obj.name;

                markup += getMovieMarkup(name, obj.overview, obj.poster_path);
            }
            movies.innerHTML = markup;
        }).catch((res)=>{

        });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status !== 200) {
                reject({
                    status: xhr.status,
                });
                return;
            }

            resolve(xhr.response);
        });
        xhr.addEventListener('error', () => {
            reject({
                status: xhr.status,
            });
        });
    });


}

function getMovieMarkup(name, description, img) {
    name = name.substr(0, 30);
    description = description.substr(0, 60) + "...";
    img = "https://image.tmdb.org/t/p/w500" + img;
    return '<div class="col">\n' +
        '           <div class="card mb-2" style="width: 18rem;">\n' +
        '               <img src="' + img + '" class="card-img-top" alt="...">\n' +
        '               <div class="card-body">\n' +
        '                   <h5 class="card-title">' + name + '</h5>\n' +
        '                   <p class="card-text">' + description + '</p>\n' +
        '                   <a href="#" class="btn btn-primary">Посмотреть</a>\n' +
        '               </div>\n' +
        '           </div>\n' +
        '       </div>';
}