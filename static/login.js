function validateForm() {
    var inputname = $('#username').val();
    var inputpassword = $('#password').val();

    if (inputname && inputpassword) {
        // If form validation passes, submit the form
        $('form').submit();
    } else {
        // If validation fails, alert the user
        alert("Please enter both username and password");
    }
}