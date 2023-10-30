/**
 * @module inloggen
 */
import {DataBaseManager} from "../model/database.js";
import {showMessage} from "./messages.js";

let all_users = [];
let dbm;

$( document ).ready(() => {

    console.log('READY!');
    const loginBTN = $('#loginBTN');
    const logoutBTN = $('#logoutBTN');
    const registerBTN = $('#registerBTN');

    init();

    checkLoggedin();

    const username = $('#username-input').val();
    const password = $('#password-input').val();

    loginBTN.click(() => {
        logIn(username, password);
    });

    registerBTN.click(() => {
        if (username !== '' && password !== '') {
            register(username, password);
        }
    })

});
function errorLogin() {
            showMessage('ERROR', 'There was an error while logging in.', 'login')
}
function init() {
    dbm = new DataBaseManager();
}

function logIn(usernameN, passwordN) {
    if (dbm.verifyUser(usernameN, passwordN)) {
        console.log("login succesvol");
        $('#username-input').val('');
        $('#password-input').val('');
        showMessage('Log In Succesful', 'Je bent ingelogd!', 'login')
        dbm.setCurrentLoggedIn(usernameN);
        loginBTN.attr('disabled', 'disabled');
        logoutBTN.removeAttr('disabled');
   } else {
        errorLogin();
   }
              
}

function logOut (){
    $('#logoutBTN').click(() => {
        localStorage.setItem('currentLoggedIn', '')
        $('#logoutBTN').attr('disabled', 'disabled');
        $('#loginBTN').removeAttr('disabled');$('#username').html(`Ingelogd als : <span class="ingelogde-user"></span>`);
    });
}

function register (usernameN, passwordN) {
    dbm.addUser(usernameN, passwordN)
}

function checkLoggedin() {
    let  currentLoggedin = dbm.getCurrentLoggedIn();
    console.log("Currentlogged in : ", currentLoggedin);
    if (currentLoggedin) {
        console.log("We have a logged in user!");
        $('#username').html(`Ingelogd als : <span class="ingelogde-user">${currentLoggedin}</span>`);
        loginBTN.attr('disabled', 'disabled');
        logoutBTN.removeAttr('disabled');

    } else {
        $('#username').html(`Ingelogd als : <span class="ingelogde-user"></span>`);
        logoutBTN.attr('disabled', 'disabled');
        loginBTN.removeAttr('disabled');
    }
}