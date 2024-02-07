//if (sessionStorage.getItem('AuthenticationState') === null) {
//    window.location.href = "/AccessDenied.html";
//}

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
        storedScores.forEach(itemData => {
        addScore(itemData.name, itemData.score);
        });
        return this.storedScores
    }
    return null;
}



document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});