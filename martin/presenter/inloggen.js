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
    });

    registerBTN.click(() => {
        if (username !== '' && password !== ''){
            if(!dbm.findUser(username)){
                dbm.addUser(username, password);
            } else {
                showMessage('ERROR', 'Username already exists.', 'login')
            }
        }

    })

    logoutBTN.click(() => {
        showMessage('UITGELOGD', 'Je bent uitgelogd.', 'login')
        dbm.setCurrentLoggedIn('');
        checkLoggedin();
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
        $('#username').html('<span>' + currentLoggedin + '</span>');
        $('#loginBTN').attr('disabled', 'disabled');
        $('#logoutBTN').removeAttr('disabled');
    } else {
        $('#username').html('<span></span>');
        $('#logoutBTN').attr('disabled', 'disabled');
        $('#loginBTN').removeAttr('disabled');
    }
}