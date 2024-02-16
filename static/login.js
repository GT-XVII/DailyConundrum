function validateForm() {
    const logInButton = document.getElementById('logInButton')
    var inputname = $('#username').val();
    var inputpassword = $('#password').val();

    if (inputname && inputpassword) {
        $('form').submit();
    } else {
        alert("Please enter both username and password");
    }
}

const saveName = () => {
    const playerName = document.getElementById('username').value;
    localStorage.setItem('storedName', JSON.stringify(playerName));
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        saveName();
    })
});