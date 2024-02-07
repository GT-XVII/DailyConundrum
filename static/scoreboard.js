if (sessionStorage.getItem('AuthenticationState') === null) {
    window.location.href = "/AccessDenied.html";
}