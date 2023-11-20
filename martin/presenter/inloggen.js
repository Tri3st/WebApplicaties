/**
 * @module inloggen
 */
import {DataBaseManager} from "../model/database.js";
import {showMessage} from "./messages.js";

let all_users = [];
let dbm;
const loginBTN = $('#loginBTN');
const logoutBTN = $('#logoutBTN');
const registerBTN = $('#registerBTN');

$( document ).ready(() => {

    console.log('READY in inloggen.js!');


    init();

    checkLoggedin();

    loginBTN.on("click", function (){
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        login(username, password);
    });

    registerBTN.on("click", function (){
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        register(username, password);
    })

    logoutBTN.on("click", function (){
        logout();
    })

});

function init() {
    dbm = new DataBaseManager();
}

function checkLoggedin() {
    let  currentLoggedin = dbm.getCurrentLoggedIn();
    console.log("Currentlogged in : ", currentLoggedin);
    if (currentLoggedin) {
        console.log("We have a logged in user!");
        $('#loggedInUsername').html(`${currentLoggedin}`);
        loginBTN.attr('disabled', 'disabled');
        registerBTN.attr('disabled', 'disabled');
        logoutBTN.removeAttr('disabled');
    } else {
        $('#loggedInUsername').html("");
        logoutBTN.attr('disabled', 'disabled');
        loginBTN.removeAttr('disabled');
        registerBTN.removeAttr('disabled');
    }
}

function register(username, password) {
    if (username !== '' && password !== ''){
        console.log("registering ", username);
        if(!dbm.findUser(username)){
            dbm.addUser(username, password);
            showMessage('SUCCESS', 'User successfully registered.', 'login')
        } else {
            showMessage('ERROR', 'Username already exists.', 'login')
        }
    }
}

function login(username, password) {
    if (dbm.verifyUser(username, password)) {
        console.log("login succesvol");
        $('#username-input').val('');
        $('#password-input').val('');
        showMessage('Log In Successful', 'Je bent ingelogd!', 'login')
        dbm.setCurrentLoggedIn(username);
        loginBTN.attr('disabled', 'disabled');
        logoutBTN.removeAttr('disabled');
        checkLoggedin();
    } else {
        showMessage('ERROR', 'There was an error while logging in.', 'login')
    }
}

function logout(){
    const username = dbm.getCurrentLoggedIn();
    showMessage('UITGELOGD', `Je bent uitgelogd ${username}.`, 'login');
    dbm.setCurrentLoggedIn('');

    checkLoggedin();
}

export {login, logout, register, checkLoggedin};