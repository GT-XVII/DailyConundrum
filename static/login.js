const saveName = () => {
    const playerName = document.getElementById('userNameInput').value;
    localStorage.setItem('storedName', JSON.stringify(playerName));
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        saveName();
    });
});