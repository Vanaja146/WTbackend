const gameArea = document.getElementById("game-area");
const timerElement = document.getElementById("time");
let score = 0;
let wrongAttempts = 0;
const totalTime = 300; // Total game time in seconds
let remainingTime = totalTime;

// Start the game timer
const gameTimer = setInterval(() => {
    remainingTime--;
    timerElement.innerText = remainingTime;

    if (remainingTime <= 0 || wrongAttempts >= 3) {
        endGame();
    }
}, 1000);

// Generate bubbles
function generateBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble", "grow");

    // Random alphabet or number for the bubble content
    const isLetter = Math.random() > 0.5;
    bubble.innerText = isLetter ? String.fromCharCode(65 + Math.floor(Math.random() * 26)) : Math.floor(Math.random() * 10);
    bubble.dataset.value = bubble.innerText;

    // Position bubble randomly
    bubble.style.left = `${Math.random() * 80}%`;
    bubble.style.top = `${Math.random() * 80}%`;

    gameArea.appendChild(bubble);

    // Remove bubble after 20 seconds if not popped
    setTimeout(() => {
        if (gameArea.contains(bubble)) {
            gameArea.removeChild(bubble);
            wrongAttempts++;
        }
    }, 20000);
}

// Spawn a new bubble every 2 seconds
setInterval(generateBubble, 2000);

// Detect user input
document.addEventListener("keydown", (event) => {
    const bubbles = document.querySelectorAll(".bubble");

    bubbles.forEach((bubble) => {
        if (bubble.dataset.value === event.key.toUpperCase()) {
            score++;
            bubble.remove();
        }
    });
});

// End game and submit score
function endGame() {
    clearInterval(gameTimer);

    fetch("/submit-score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: localStorage.getItem("token"), score })
    }).then(() => {
        window.location.href = "/leaderboard.html";
    });
}
