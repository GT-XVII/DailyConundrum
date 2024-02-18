const addScore = (name, score) => {
    const scoreboard = document.querySelector('ol');
    const scoreElement = document.createElement('li');
    scoreElement.className = 'scoreElement';
    scoreElement.innerText = `${name} scored ${score} points.`;
    scoreboard.appendChild(scoreElement);
}

const loadScores = () => {
    const scoreboard = document.querySelector('ol');

    fetch('/get_scores') // Fetch scores from Flask server
    .then(response => response.json())
    .then(scores => {
        if (scores.length === 0) {
            scoreboard.innerText = 'No scores available.';
        } else {
            scores.sort((a, b) => b.score - a.score).forEach(itemData => {
                addScore(itemData.name, itemData.score);
            });
        }
    })
    .catch(error => {
        console.error('Error loading scores:', error);
        scoreboard.innerText = 'Failed to load scores.';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});