/*
  Created by: Rachel Galang
  Last updated: 3/29/2022
  Description: Used to fetch articles from NYTimes API 
  and populate index.html 
*/


async function getTopArticles() {
    const req = new Request("https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=QARWESrFwfyskv5UWjOVAfpdBqktU90y");

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }
    
    return response.json();
}

async function getTopSectionArticles(section) {
        const req = new Request(`https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=QARWESrFwfyskv5UWjOVAfpdBqktU90y`);

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }
    
    return response.json();
}

/* I was getting 500 errors when trying to use the search API,
  so I could not include this feature. I'm leaving the code in
  and just commenting it out to show that I tried. 

  I couldn't get past testing this phase since I kept getting 500 errors
  from NYT, so I wasn't able to try populating the page with search results.

async function getSearchResults(input) {
    const req = fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + input + "&api-key=QARWESrFwfyskv5UWjOVAfpdBqktU90y");

    const response = await fetch(req);
    if (!response.ok) {
        throw new Error(response);
    }

    return response.json();
} */

window.onload = () => {
    displayTopArticles();

/*    document.querySelector("#search").addEventListener("keydown", displaySearchResults);

    let input = document.querySelector("#search");
    input.focus();
    input.setSelectionRange(0, input.value.length); */
}

document.addEventListener("click", function (event) {
    if (event.target.matches("#pop")) {
        displayTopArticles();
    }

    if (event.target.matches("#arts")) {
        displayTopSectionArticles("arts");
    }

    if (event.target.matches("#books")) {
        displayTopSectionArticles("books");
    }

    if (event.target.matches("#business")) {
        displayTopSectionArticles("business");
    }

    if (event.target.matches("#health")) {
        displayTopSectionArticles("health");
    }

    if (event.target.matches("#politics")) {
        displayTopSectionArticles("politics");
    }

    if (event.target.matches("#science")) {
        displayTopSectionArticles("science");
    }

    if (event.target.matches("#technology")) {
        displayTopSectionArticles("technology");
    }

    if (event.target.matches("#world")) {
        displayTopSectionArticles("world");
    }
    
}, false);

function generatePage(response) {
    for (let article of response.results) {
        /* I got a blank article block once during testing,
         so this is to prevent that from happening. */
        if(!article.title) {
            continue;
        }
        const articleblock = document.createElement("div");
        articleblock.setAttribute("class", "article-block");

        if (article.media && article.media[0]) {
            const articleImage = document.createElement("img");
            articleImage.setAttribute("src", article.media[0]['media-metadata'][0].url);
            articleImage.setAttribute("class", "article-image")
            articleblock.appendChild(articleImage);
        }

        if (article.multimedia) {
            const articleImage = document.createElement("img")
            articleImage.setAttribute("src", article.multimedia[2].url);
            articleImage.setAttribute("class", "article-image");
            articleblock.appendChild(articleImage);
        }
        
        const titleLink = document.createElement("a");
        titleLink.setAttribute("href", article.url);
        titleLink.setAttribute("class", "article-link underline");
        
        const titleText = document.createTextNode(article.title);

        titleLink.appendChild(titleText);
        articleblock.appendChild(titleLink);

        const container = document.querySelector("#news-grid");
        container.appendChild(articleblock);
    }
}

function displayTopArticles() {
    clearGrid();
    getTopArticles()
        .then(response => {
            generatePage(response);
        })
}

function displayTopSectionArticles(section) {
    clearGrid();
    getTopSectionArticles(section)
        .then(response => {
            generatePage(response);
        })
}

function clearGrid() {
    const gridContainer = document.querySelector("#news-grid");
    gridContainer.innerHTML = "";
}
