let main_screen = document.getElementById("main");
let isntructions = document.getElementById("instructions");
let leaders = document.getElementById("leaderboard");
let ground = document.getElementById("ground");
let announceText = document.getElementById("announceText");
let colorBlock = document.getElementById("colorBlock");
let loseScr = document.getElementById("losing");
let tiles = document.getElementById("playground");
let timer_element = document.getElementById("timer");
let leadName = document.getElementById("leadName");
let leadScore = document.getElementById("number");
let alertmsg = document.getElementById("alert");
let interval;

let leadList = document.getElementById("leaderboard-list");

main_screen.style.display = "block";
isntructions.style.display = "none";
leaders.style.display = "none"
ground.style.display = "none"
loseScr.style.display = "none"
alertmsg.style.display = "none"

let game = false;
let round = 0;
let squareNumber;
let score = 0;
let timer = 4;
let primaryColors = ["red", "blue", "black", "white", "green", "purple", "red", "yellow", "cyan", "darkblue", "lightblue", "lightgray", "gray", "darkgray", "darkred", "darkgreen", "lightgreen"];

let leaderboard = [];

if (localStorage.getItem("lead")) {
    leaderboard = JSON.parse(localStorage.getItem("lead"));
    leaderboard.forEach(leader => {
        let cellData = document.createElement("div");
        cellData.className = "person";
        cellData.innerHTML = `
            <div class="leaderboard-name" id="leaderboard-name">${leader.lead}</div>
            <div class="leaderboard-score" id="leaderboard-score">${leader.score}</div>
        `;
        leadList.appendChild(cellData);
    });
}

let name;
let recordedScore;

document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "how") {
        howToPlay();
    } else if (targetElement.id === "lead") {
        showlead();
    } else if (targetElement.id === "start") {
        loadGame();
    } else if (targetElement.id === "return") {
        returnToMenu();
    } else if (targetElement.id === "submitLead") {
        submitLead();
    }
})

function showlead() {
    leaders.style.display = "block"
    main_screen.style.display = "none";
    isntructions.style.display = "none";
    loseScr.style.display = "none"
}

function howToPlay() {
    leaders.style.display = "none"
    loseScr.style.display = "none"
    main_screen.style.display = "none";
    isntructions.style.display = "flex";
}

function returnToMenu() {
    loseScr.style.display = "none"
    main_screen.style.display = "block";
    leaders.style.display = "none"
    isntructions.style.display = "none";
}

function loadGame() {
    loseScr.style.display = "none"
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
    let probability;
    let primaryNumber = Math.floor(Math.random() * primaryColors.length);
    let randomColor = primaryColors[primaryNumber];
    colorBlock.style.backgroundColor = randomColor;
    if (round <= 5) {
        probability = 0.3 * primaryColors.length;
        squareNumber = 10;
    } else if (round > 5 && round <= 10) {
        probability = 0.3 * primaryColors.length;
        squareNumber = 15;
    } else if (round > 10 && round <= 20) {
        probability = 0.2 * primaryColors.length;
        squareNumber = 30;
    } else if (round > 20 && round <= 30) {
        probability = 0.2 * primaryColors.length;
        squareNumber = 50;
    } else if (round > 30 && round <= 40) {
        probability = 0.15 * primaryColors.length;
        squareNumber = 75;
    } else if (round > 40 && round <= 50) {
        probability = 0.05 * primaryColors.length;
        squareNumber = 110;
    } else if (round > 50) {
        probability = 0.0001 * primaryColors.length;
        squareNumber = 160;
    }
    for (let i = 0; i < squareNumber; i++) {
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
                score += 1;
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
    ground.style.display = "none";
    loseScr.style.display = "block";
    leadScore.innerText = score;
    leadName.focus();
    window.clearInterval(interval);
}

function submitLead() {
    if (leadName.value === "") {
        alertmsg.style.display = "block";
    } else {
        leaderboard.push(new Object({
            lead: leadName.value,
            score: score,
        }))
        localStorage.setItem("lead", JSON.stringify(leaderboard));
        returnToMenu();
    }
    score = 0;
}