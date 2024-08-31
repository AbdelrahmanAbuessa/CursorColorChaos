let main_screen = document.getElementById("main");
let isntructions = document.getElementById("instructions");
let leaders = document.getElementById("leaderboard");
let ground = document.getElementById("ground");
let announceText = document.getElementById("announceText");
let colorBlock = document.getElementById("colorBlock");

let tiles = document.getElementById("playground");

let timer_element = document.getElementById("timer");

let interval;

main_screen.style.display = "block";
isntructions.style.display = "none";
leaders.style.display = "none"
ground.style.display = "none"

let game = false;

let round = 0;

let timer = 4;

let primaryColors = ["red", "blue", "black", "white", "green", "purple", "red", "yellow", "cyan", "darkblue", "lightblue", "lightgray", "gray", "darkgray", "darkred", "darkgreen", "lightgreen"];

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "how") {
        howToPlay();
    } else if (targetElement.id === "lead") {
        leaderboard();
    } else if (targetElement.id === "start") {
        loadGame();
    } else if (targetElement.id === "return") {
        returnToMenu();
    }
})

function leaderboard() {
    leaders.style.display = "block"
    main_screen.style.display = "none";
    isntructions.style.display = "none";
}

function howToPlay() {
    leaders.style.display = "none"
    main_screen.style.display = "none";
    isntructions.style.display = "flex";
}

function returnToMenu() {
    main_screen.style.display = "block";
    leaders.style.display = "none"
    isntructions.style.display = "none";
}

function loadGame() {
    main_screen.style.display = "none";
    leaders.style.display = "none"
    isntructions.style.display = "none";
    ground.style.display = "block"
    timer_element.innerText = "";

    if (!game) {
        let index = Math.floor(Math.random() * primaryColors.length);
        if (index === 0) {
            index = 1;
        }
        let start_color = primaryColors[index];
        announceText.innerText = "Click to start the game";
        colorBlock.style.backgroundColor = start_color;
        colorBlock.onclick = function () {
            startGame();
            game = true;
        }
    }
}

function startGame() {
    timer = 4;
    timer_element.innerText = timer;
    colorBlock.onclick = "";
    announceText.innerText = "The Color is:";
    if (round > -1) {
        generateTiles();
        interval = window.setInterval(function () {
            timer -= 1;
            timer_element.innerText = timer;
            if (timer < 0) {
                loseGame();
            }
        }, 1000)
    }
}

function generateTiles() {
    timer = 4;
    timer_element.innerText = timer;
    let probability = 0.000001;
    let primaryNumber = Math.floor(Math.random() * primaryColors.length);
    let randomColor = primaryColors[primaryNumber];
    colorBlock.style.backgroundColor = randomColor;
    for (let i = 0; i < 160; i++) {
        let randomNumber = Math.floor(Math.random() * primaryColors.length);
        if (randomNumber === primaryNumber) {
            randomNumber = primaryNumber - 2;
        }
        let tile = document.createElement("div");
        tile.className = "tile";
        tile.id = i;
        if (randomNumber < probability) {
            tile.style.backgroundColor = randomColor;
        } else {
            tile.style.backgroundColor = primaryColors[randomNumber];
        }
        tile.setAttribute("color", tile.style.backgroundColor);
        tile.onclick = function () {
            if (tile.getAttribute("color") === randomColor) {
                round += 1;
                nextRound(round);
            } else {
                round = -1;
                nextRound(round);
            }
        }
        tiles.appendChild(tile);
    }
}

function nextRound(r) {
    if (r > -1) {
        tiles.innerHTML = "";
        generateTiles();
    } else {
        loseGame();
    }
}


function loseGame() {
    ground.innerHTML = "";
    window.clearInterval(interval);
    console.log("lose game");
}
// set timeout, check if mouse is hovering over correct square
// if not hover then end game 