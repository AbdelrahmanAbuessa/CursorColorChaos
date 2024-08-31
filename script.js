let main_screen = document.getElementById("main");
let isntructions = document.getElementById("instructions");
let leaders = document.getElementById("leaderboard");
let ground = document.getElementById("ground");
let announceText = document.getElementById("announceText");
let colorBlock = document.getElementById("colorBlock");

let tiles = document.getElementById("playground");

main_screen.style.display = "block";
isntructions.style.display = "none";
leaders.style.display = "none"
ground.style.display = "none"

let game = false;

let loss = false;

let colors = ["black", "white", "gray", "lightgray", "red", "aqua", "blue", "brown", "cyan", "darkblue", "darkgreen", "darkgrey", "darkorange", "darkred", "green", "lime", "lightblue", "lightgreen", "lightyellow", "magenta", "maroon", "navy", "orange", "pink", "purple", "red", "yellow"];
let primaryColors = ["red", "blue", "black", "white", "green", "purple", "pink", "red", "yellow"];

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

    if (!game) {
        let index = Math.floor(Math.random() * 10);
        if (index === 0) {
            index = 1;
        }
        let start_color = primaryColors[index - 1];
        announceText.innerText = "Click to start the game";
        colorBlock.style.backgroundColor = start_color;
        colorBlock.onclick = function () {
            startGame();
            game = true;
        }
    }
}

function startGame() {
    colorBlock.onclick = "";
    announceText.innerText = "The Color is:";
    if (!loss) {
        for (let i = 0; i < 4; i++) {
            let tile = document.createElement("div");
            tile.className = "tile";
            tile.id = i;
            let randomColor = primaryColors[Math.floor(Math.random() * 9)];
            tile.setAttribute("color", randomColor);
            tile.style.backgroundColor = randomColor;
            tiles.appendChild(tile);
        }
    }
}

// loadd starter game
// when click over square: set level & dificulty
// update game, load squares, select random colors, apply them and squares and stuff
// set timeout, check if mouse is hovering over correct square
// if not hover then end game 