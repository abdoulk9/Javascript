const loginButton = document.getElementById('login-form-submit');
const loginForm = document.getElementById('login-form');
const loginErroMsg = document.getElementById('login-error-msg');
const loginConnectMsg = document.getElementById('login-connect-msg');


function saveCountConnect(num) {
    if (typeof (Storage) !== 'undefined') {
        sessionStorage.setItem('count', num);
        console.log('count added');
    } else {
        console.log('data non supported');
    }
}

function redirect() {
    window.location.replace('http://localhost:5501/html/login-page.html');
}

loginButton.addEventListener('click', function (e) {
    e.preventDefault();
    let countConnect = 0;
    let userName = loginForm.username.value;
    let password = loginForm.password.value;

    if (userName === "user" && password === "web_dev") {
        alert("You're connnected as: " + userName);
        return;
    } else {
        loginErroMsg.style.opacity = 1;
        countConnect = countConnect + 1;
        console.log(`Dans le else le compteur affiche ${countConnect}`);
        saveCountConnect(countConnect);
        if (countConnect === 3) {
            loginErroMsg.style.opacity = 0;
            loginConnectMsg.style.opacity = 1;

        }
        setTimeout(() => {
            redirect(), alert("main page")
        }, 3000);
    }
});