// Sample leaderboard data for testing purposes
let leaderboard = [
    { username: "Alice", score: 150 },
    { username: "Bob", score: 120 },
    { username: "Charlie", score: 100 }
];

// Function to update leaderboard with the current player's score
function updateLeaderboard(username, score) {
    // Add the new score to the leaderboard
    leaderboard.push({ username: username, score: score });

    // Sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Keep only the top 5 scores
    leaderboard = leaderboard.slice(0, 5);

    displayLeaderboard();
}

// Function to display leaderboard
function displayLeaderboard() {
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';  // Clear previous entries

    // Display each leaderboard entry
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.username}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });

    // Show the leaderboard container
    leaderboardContainer.style.display = 'block';
}

// Function to end the game and show the leaderboard
function endGame() {
    clearInterval(timerInterval);
    clearInterval(bubbleInterval);
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('game-over-container').style.display = 'block';
    document.getElementById('final-score').innerText = 'Your Score: ' + score;
    gameInProgress = false;

    // Update the leaderboard with the current player's score
    const username = document.getElementById('player-name').innerText;
    updateLeaderboard(username, score);
}
