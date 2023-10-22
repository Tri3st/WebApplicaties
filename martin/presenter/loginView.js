import {logIn as loginLogin, logOut as loginLogout, init as loginInit, register as loginRegister} from './inloggen.js';
import {clearMessage, showMessage} from "./snake.js";

$(document).ready(() => {
    console.log("Ready in loginView.js");
    init();
    const loginBTN = $('#loginBTN');
    const logoutBTN = $('#logoutBTN');
    const registerBTN = $('#registerBTN');

    loginBTN.on('click', (e) => {
        e.preventDefault();
        login();
    })

    registerBTN.on('click', (e) => {
        e.preventDefault();
        register();
    })


});

function init() {
    loginInit();
    clearMessage();
}
function login() {
    const usernameInput = $('#username-input');
    const passwordInput = $('#password-input');
    const username = usernameInput.val();
    const password = passwordInput.val();
    console.log("user : ", username);
    let head, message;
    if (loginLogin(username, password)) {
        message = `User ${username} successfully logged in`;
        head = "SUCCESS";
        clearInputFields();

    } else {
        head = "ERROR";
        message = "Incorrect username or password. Try again";
    }
    showMessage(head, message, 'login');
}

function logout() {
    loginLogout();
}

function register() {
    const usernameInput = $('#username-input');
    const passwordInput = $('#password-input');
    const username = usernameInput.val();
    const password = passwordInput.val();
    console.log("user : ", username);
    let head, message;
    if (username !== '' && password !== '') {
            const user = {
                "username": username,
                "password": password,
                "userData": {
                  "nrOfFoods": 15,
                  "highscore": 0
                },
            };
            console.log(user);
        }
    console.log("voor");

    //Als deze functie true teruggeeft, bestaat de gebruikersnaam al.
    if(loginRegister(username, password)) {
        head = "ERROR";
        message = "Username already exists!";

        console.log("if loginview");
    } else {
        head = "SUCCES";
        message = "Gebruikersnaam " + username + " is met success aangemaakt.";
        console.log("if loginview");
    }

    clearInputFields();
    //showMessage(head, message, 'register');
    /* 
    case 'register':
            infoBoxId = '#registerInfoBox'; -- bestaat niet denk ik.
            break;
            of default
    */ //voor nu heb ik enkel 2 classes aangeraakt.
    console.log("eind");


}


function clearInputFields() {
    const username = $('#username-input');
    const password = $('#password-input');
    username.text("");
    password.text("");
}