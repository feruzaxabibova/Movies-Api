const elLoader = $_(".js-loader");
const elFilmsList = $_(".js-films-list");
const elPrev = $_(".js-prev");
const elNext = $_(".js-next");

let page = 1;

function getData(page) {
    fetch(`https://www.omdbapi.com/?apikey=9fcd4d84&s=disney&page=${page}`)
        .then((response) => response.json())
        .then((data) => {

            elLoader.style.display = "none";
            working(data.Search);
        });

    function working(array) {
        array.forEach((element) => {
            renderFilms(element);
        });
    }
}


function renderFilms(object) {
    const newLi = createElement("li", "list-item");
    const newMovieImg = createElement("img", 'item-img');
    const newCardContent = createElement("div", "item-content");
    const newMovieTitle = createElement("h4", "item-title", object.Title);
    const newMovieYear = createElement("strong", "item-year", object.Year);
    const newMovieType = createElement("p", "item-type", object.Type)
    newMovieImg.src = object.Poster

    elFilmsList.appendChild(newLi);
    newLi.appendChild(newMovieImg);
    newCardContent.appendChild(newMovieTitle);
    newCardContent.appendChild(newMovieYear);
    newCardContent.appendChild(newMovieType);
    newLi.appendChild(newCardContent);
}


elPrev.addEventListener("click", prevPage);
function prevPage() {
    if (page > 1) {
        elFilmsList.innerHTML = "";
        page = page - 1;
        getData(page);
    }

}

elNext.addEventListener("click", nextPage);
function nextPage() {
    elFilmsList.innerHTML = "";
    page = page + 1;
    getData(page);
}

getData(page);