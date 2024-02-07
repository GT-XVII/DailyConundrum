if (sessionStorage.getItem('AuthenticationState') === null) {
    window.location.href = "/AccessDenied.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreboard = document.querySelector('ol');
    const addScore = (name, score) => {
        const scoreElement = document.createElement('li');
        scoreElement.className = 'scoreElement';
        scoreElement.innerText = `${name} scored ${score} points.`;
        scoreboard.appendChild(scoreElement);
    }

    addScore('RuanMaster', 23);
    addScore('LiamTheGod', 21);
});