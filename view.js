const imageBasePath = "https://image.tmdb.org/t/p/original";
const movie = document.getElementById("movie");
const API_KEY = "30bcec8f5dda885072b3eeb762fe32c3";
const movie_id = getNumbersFromString(window.location.search);

document.addEventListener('DOMContentLoaded', () => renderMovie(movie_id));

function renderMovie(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?language=ru&api_key=" + API_KEY;

    movie.innerHTML = "Загрузка, подождите секунду!";
    fetch(url).then((value) => {
        return value.json();
    }).then((result) => {
        console.log(result);
        movie.innerHTML = getMovieViewHTML(result);
    }).catch((obj) => {

    });
}

function getMovieViewHTML(obj) {
    const companies = obj.production_companies.map((item)=>{
        if (item.logo_path)
       return `
       <div class="company mr-5">
                <img src=${"https://image.tmdb.org/t/p/w500"+item.logo_path} alt="image">
            </div>
       `;
    }).join('');
    const genres = obj.genres.map(item=>{
       return item.name;
    }).join(' ');

    const revenue = formatMoney(obj.revenue.toString());
    const budget = formatMoney(obj.budget.toString());
    return `
    <img src=${obj.backdrop_path ? imageBasePath+obj.backdrop_path:  "https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png"} alt="image">
    <div class="mt-5 mb-5">
        <div class="companies d-flex justify-content-center">${companies}</div>
        <hr>
        <h1 class="text-center">${obj.title || obj.name}</h1>
        <hr>
        <h5 class="text-center">${obj.tagline || "Тут должен быть слоган фильма, но режисер не придумал"}</h5>
        <hr>
        <div class="movie-info row d-flex justify-content-center">
            <h6 class="text-center mr-2 col-sm-2"><span>Премьера</span><br/>${obj.release_date}</h6>
            <h6 class="text-center mr-2 col-sm-2"><span>Оценка</span><br/>${obj.vote_average}</h6>
            <h6 class="text-center mr-2 col-sm-2"><span>Жанры</span><br/>${genres}</h6>
            <h6 class="text-center mr-2 col-sm-2"><span>Сборы в мире</span><br/>${revenue}</h6>
            <h6 class="text-center mr-2 col-sm-2"><span>Хронометраж</span><br/>${obj.runtime+" минут"}</h6>
            <h6 class="text-center mr-2 col-sm-2"><span>Бюджет</span><br/>${budget}</h6>
        </div>
        <h4 class="text-center mt-3">Описание фильма</h4>
       <div class="d-flex justify-content-center">
           <p class="text-center col-sm-6">${obj.overview}</p>
       </div>
        <div class="d-flex justify-content-center">
            <a class="btn btn-primary" href=${obj.homepage} target="_blank" role="button">Домашняя страница фильма</a>
        </div>
    </div>
    `;
}

function getNumbersFromString(string) {
    return string.replace( /^\D+/g, '');
}

function formatMoney(s) {
    const arr = s.split('');
    let str = "";

    for (let i = 0; i < s.length; i++) {
        str+=arr[i];
        if ((i+1)%3===0)
            str+=" ";
    }
    return str+" $";
}