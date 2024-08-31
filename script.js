document.addEventListener("click", function (e) {
    let targetElement = e.target;
    if (targetElement.id === "how") {
        howToPlay();
    } else if (targetElement.id === "lead") {
        leaderboard();
    } else if (targetElement.id === "start") {
        startGame();
    }
})