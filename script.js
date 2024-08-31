let main_screen = document.getElementById("main");
let isntructions = document.getElementById("instructions");
let leaders = document.getElementById("leaderboard");
let ground = document.getElementById("ground");

main_screen.style.display = "block";
isntructions.style.display = "none";
leaders.style.display = "none"
ground.style.display = "none"

let difficulty = 0;

let colors = ["black", "white", "gray", "lightgray", "red", "aqua", "blue", "brown", "cyan", "darkblue", "darkgreen", "darkgrey", "darkorange", "darkred", "green", "lime", "lightblue", "lightgreen", "lightyellow", "magenta", "maroon", "navy", "orange", "pink", "purple", "red", "yellow"];
let primaryColors = ["red", "blue", "black", "white", "green", "purple", "red", "yellow"];

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "how") {
        howToPlay();
    } else if (targetElement.id === "lead") {
        leaderboard();
    } else if (targetElement.id === "start") {
        startGame();
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

function startGame() {
    main_screen.style.display = "none";
    leaders.style.display = "none"
    isntructions.style.display = "none";
    ground.style.display = "block"
}