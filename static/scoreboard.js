const addScore = (name, score) => {
    const scoreboard = document.querySelector('ol');
    const scoreElement = document.createElement('li');
    scoreElement.className = 'scoreElement';
    scoreElement.innerText = `${name} scored ${score} points.`;
    scoreboard.appendChild(scoreElement);
}

const loadScores = () => {
    const scoreboard = document.querySelector('ol');
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];

    if (storedScores.length === 0) {
        scoreboard.innerText = 'No scores available.';
    } else {
        storedScores.sort((a, b) => b.score - a.score).forEach(itemData => {
            addScore(itemData.name, itemData.score);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});