function submitLogin() {
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    console.log("Email = ", email);
    console.log('Password: ', password);

    sessionStorage.setItem('email', email);
    sessionStorage.setItem('password', password);

    console.log('email = ' + sessionStorage.getItem('email'));

    window.location.replace('index.html');
}

function logOut() {
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('password', '')

    window.location.replace('login.html');
}