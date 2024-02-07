const addScore = (name, score) => {
    const scoreboard = document.querySelector('ol');
    const scoreElement = document.createElement('li');
    scoreElement.className = 'scoreElement';
    scoreElement.innerText = `${name} scored ${score} points.`;
    scoreboard.appendChild(scoreElement);
}

const loadScores = () => {
    const storedScores = JSON.parse(localStorage.getItem('scores'));
    if (storedScores) {
        storedScores.sort((a,b) => b.score - a.score).forEach(itemData => {
        addScore(itemData.name, itemData.score);
        });
    }
    return null;
}



document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});