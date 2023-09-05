import {logIn as loginLogin, logOut as loginLogout, init as loginInit, register as loginRegister} from '../presenter/inloggen.js';
import {clearMessage, showMessage} from "./snakeView.js";

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
    logoutBTN.on('click', (e) => {
        e.preventDefault();
        logout();
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
    if (loginRegister(username, password)) {
        message = `User ${username} successfully logged in`;
        head = "SUCCESS";
        clearInputFields();
    } else {
        head = "ERROR";
        message = "This username already exists. Try another";
    }
    showMessage(head, message, 'login');
}

function clearInputFields() {
    const username = $('#username-input');
    const password = $('#password-input');
    username.text("");
    password.text("");
}