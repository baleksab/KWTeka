let gameList = [];
let genreSet = new Set();
let playerSet = new Set();
let devSet = new Set();

let searchFilter = document.getElementById("name-filter");
let genreFilter = document.getElementById("genre-filter");
let playerFilter = document.getElementById("player-filter");
let devFilter = document.getElementById("dev-filter");
let scoreFilter = document.getElementById("score-filter");

let gamesTable = document.getElementById("game-table");

function loadXML() {
    let xml = new XMLHttpRequest();

    xml.onload = function() {
        if (this.status !== 200)
            return;

        let xmlObjects = xml.responseXML.getElementsByTagName("game");

        for (let xmlObject of xmlObjects) {
            let name = xmlObject.getElementsByTagName("description")[0].textContent;
            let dev = xmlObject.getElementsByTagName("dev")[0].textContent;
            let score = xmlObject.getElementsByTagName("score")[0].textContent;
            let year = xmlObject.getElementsByTagName("year")[0].textContent;
            let player = xmlObject.getElementsByTagName("player")[0].textContent;
            let desc = xmlObject.getElementsByTagName("story")[0].textContent;
            let rating = xmlObject.getElementsByTagName("rating")[0].textContent;
            let genre = xmlObject.getElementsByTagName("genre")[0].textContent;

            let game = {
                name: name,
                dev: dev,
                score: score,
                year: year,
                player: player,
                desc: desc,
                rating: rating,
                genres: new Array()
            };

            if (genre.includes("/")) {
                let genres = genre.split("/");

                for (let genre of genres) {
                    genreSet.add(genre);
                    game.genres.push(genre);
                }
            } else {
                genreSet.add(genre);
                game.genres.push(genre);
            }

            game.row = document.createElement("tr");
            game.row.innerHTML =
                `
                    <td>${game.name}</td>
                    <td>${game.dev}</td>
                    <td>${game.score}</td>
                    <td>${game.year}</td>
                    <td>${game.player}</td>
                    <td>${game.rating}</td>
                    <td>${game.genres.join(", ")}</td>
                `
            game.row.addEventListener("click", e => alert(game.name + ":\n" + game.desc));

            gamesTable.appendChild(game.row);

            playerSet.add(player);
            devSet.add(dev);

            gameList.push(game);
        }

        populateFilters();
        filterTable();
    }

    xml.open("GET", "data/database.xml", true);
    xml.send();
}

function populateFilters() {
    genreFilter.innerHTML += `<option value="All">All</option>`;

    for (let genre of genreSet)
        genreFilter.innerHTML += `<option value="${genre}">${genre}</option>`;

    playerFilter.innerHTML += `<option value="All">All</option>`;

    for (let player of playerSet)
        playerFilter.innerHTML += `<option value="${player}">${player}</option>`;

    devFilter.innerHTML += `<option value="All">All</option>`;

    for (let dev of devSet)
        devFilter.innerHTML += `<option value="${dev}">${dev}</option>`;
}

function filterTable() {
    let regex = new RegExp(searchFilter.value, 'i');

    for (let game of gameList) {
        if (!regex.test(game.name)) {
            game.row.style.display = "none";

            continue;
        }

        if (genreFilter.value !== "All" && !game.genres.includes(genreFilter.value)) {
            game.row.style.display = "none";

            continue;
        }

        if (playerFilter.value !== "All" && playerFilter.value !== game.player) {
            game.row.style.display = "none";

            continue;
        }

        if (devFilter.value !== "All" && devFilter.value !== game.dev) {
            game.row.style.display = "none";

            continue;
        }

        if (scoreFilter.value !== "All") {
            if (scoreFilter.value === ">=1" && parseFloat(game.score) < 1) {
                game.row.style.display = "none";

                continue;
            } else if (scoreFilter.value === ">=2" && parseFloat(game.score) < 2) {
                game.row.style.display = "none";

                continue;
            } else if (scoreFilter.value === ">=3" && parseFloat(game.score) < 3) {
                game.row.style.display = "none";

                continue;
            } else if (scoreFilter.value === ">=4" && parseFloat(game.score) < 4) {
                game.row.style.display = "none";

                continue;
            }
        }

        game.row.style.display = "table-row";
    }
}

loadXML();