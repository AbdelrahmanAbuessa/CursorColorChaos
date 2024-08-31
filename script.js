let main_screen = document.getElementById("main");
let isntructions = document.getElementById("instructions");
let leaders = document.getElementById("leaderboard");
let ground = document.getElementById("ground");
let announceText = document.getElementById("announceText");
let colorBlock = document.getElementById("colorBlock");

main_screen.style.display = "block";
isntructions.style.display = "none";
leaders.style.display = "none"
ground.style.display = "none"

let level = 0;
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
    } else if (targetElement.id === "colorBlock") {
        startGame();
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
        level = 1;
        let index = Math.floor(Math.random() * 10);
        if (index === 0) {
            index = 1;
        }
        let start_color = primaryColors[index - 1];
        announceText.innerText = "Hover over the Square to start the game";
        colorBlock.style.backgroundColor = start_color;
    } else {
        level += 1;
        startGame();
    }
}

function startGame() {
    announceText.innerText = "The Color is:";
    let index = Math.floor(Math.random() * 10);
    if (index === 0) {
        index = 1;
    }
    let color = primaryColors[index - 1];
    colorBlock.style.backgroundColor = color;
}

// loadd starter game
// when click over square: set level & dificulty
// update game, load squares, select random colors, apply them and squares and stuff
// set timeout, check if mouse is hovering over correct square
// if hover, proceed increase level and difficulty
// number of squares and number of colors increase with level and difficulty according to a chart

// if not hover then end game 