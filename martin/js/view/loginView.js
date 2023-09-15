import {checkLogIn, logIn} from '../presenter/inloggen.js';
import {clearMessage, showMessage} from "./snakeView.js";

$(document).ready(() => {
    console.log("Ready in loginView.js");
    const loginBTN = $('#loginBTN');
    const logoutBTN = $('#logoutBTN');
    const registerBTN = $('#registerBTN');

    loginBTN.on('click', (e) => {
        e.preventDefault();
        login();
    }),

    registerBTN.on('click', (e) => {
        e.preventDefault();
        register();
    })


});

function init() {
    clearMessage();
}

function login() {
    const username = $('#username-input');
    const password = $('#password-input');
    const user = {username: username.val(), password: password.val()};
    console.log("user : ", user);
    let head, message;
    if (checkLogIn(user)) {
        logIn(user);
        message = `User ${user.username} successfully logged in`;
        head = "SUCCESS";
        clearInputFields();
    } else {
        head = "ERROR";
        message = "Incorrect username or password. Try again";
    }
    showMessage(head, message);
}


function register() {
}


function clearInputFields() {
    const username = $('#username-input');
    const password = $('#password-input');
    username.val("");
    password.val("");
}