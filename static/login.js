function validateForm() {
    var inputname = $('#userNameInput').val();
    var inputpassword = $('#password').val();

    if (inputname && inputpassword) {
        // If form validation passes, submit the form
        $('form').submit();
    } else {
        // If validation fails, alert the user
        alert("Please enter both username and password");
    }
}const saveName = () => {
    const playerName = document.getElementById('userNameInput').value;
    localStorage.setItem('storedName', JSON.stringify(playerName));
}

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', () => {
        saveName();
    });
});