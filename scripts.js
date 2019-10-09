let news = [];
let i = 1;
let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f960bc0e09242daa33a36e9d15eb747&page=" + i;
// loading page first time------
loadPage();
async function loadPage() {
    news = await fetchData(news)
    render(news);
}
// update--------------------
async function updateUrl() {
    // news = await fetchData(news);
    console.log("old", news);
    i = i + 1;
    url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=3f960bc0e09242daa33a36e9d15eb747&page=" + i
    let newsPageNext;
    newsPageNext = await fetchData(newsPageNext);
    console.log("new", newsPageNext);
    news = news.concat(newsPageNext);
    console.log("updated", news)
    render(news);
}
//----------------------------
async function fetchData(array) {
    let json = await fetch(url);
    let result = await json.json()
    array = result.articles;
    return array;
}
async function render(array) {
    // array = await fetchData(array);
    let html = array.map((item, i) => {
        if (item.content !== null) {
            return `
        <div class="card">
            <div class="card-header">
                Post by ${item.source.name} (${moment(item.publishedAt).fromNow()})
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-8 content">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-text">${item.content}</p>
                        <div class="buttonArea">
                            <a href="${item.url}" class="btn btn-primary">More</a>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <img class="rounded mx-auto d-block"
                            src="${item.urlToImage}">
                    </div>
                </div>
            </div>
        </div>`
        }
    }).join("");
    document.getElementById('main').innerHTML = html;
    document.getElementById('numberOfNews').innerHTML = `<h5>No. of Articles: ${array.length}</h5>`;
}
