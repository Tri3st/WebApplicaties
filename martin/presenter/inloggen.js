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

    let  currentLoggedin = dbm.getCurrentLoggedIn();
    console.log("Currentlogged in : ", currentLoggedin);
    if (currentLoggedin) {
        console.log("We have a logged in user!");
         $('#username').html(`Ingelogd als : <span class="ingelogde-user">${currentLoggedin}</span>`).show();
         loginBTN.attr('disabled', 'disabled');
         logoutBTN.removeAttr('disabled');

    } else {
         logoutBTN.attr('disabled', 'disabled');
         loginBTN.removeAttr('disabled');
    }

   loginBTN.click(() => {
        console.log("inlog buiten functie");
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        console.log("Username : ", username);
        logIn(username, password);

    });

  /*  $('#registerBTN').click(() => {
        console.log("register buiten functie");
        let infoBoxBericht = "";
        const usernameN = $('#username-input').val();
        const passwordN = $('#password-input').val();
        if (usernameN !== '' && passwordN !== '') {
            const user = {
                "username": usernameN,
                "password": passwordN,
                "userData": {
                    "nrOfFoods": 15,
                    "highscore": 0
                },
            };
            console.log(user)


            const check = usersArray.map((waarde) => waarde.username);
            if (check.includes(usernameN)){
                console.log("if reg");
                infoBoxBericht = "username bestaat al, kies een andere username ingelogd";
                $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
                $('.infoBox').css('visibility', 'visible');
                

            }
            else {
                usersArray.push(user);
                infoBoxBericht = "user met succesvol aangemaakt.";
                $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
                $('.infoBox').css('visibility', 'visible');

            }
            //localStorage.setItem('all_users', JSON.stringify(usersArray));
        }
    })*/

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
};

function register (usernameN, passwordN) {
const usersArray = JSON.parse(localStorage.getItem("all_users")) || [];

    const check = usersArray.map((waarde) => waarde.username);
            if (check.includes(usernameN)){
                console.log("if reg");
                return true;
                

            }
            else {
                usersArray.push(usernameN);
                console.log("else reg");
                return false;
            }
}