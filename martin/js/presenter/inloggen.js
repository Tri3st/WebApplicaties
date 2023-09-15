/**
 * @module inloggen
 */

let all_users = [];
$( document ).ready(() => {

    console.log('READY!');
    init();

//pagina herlaadt
//andere pagina = geen login.






    let  currentLoggedin = localStorage.getItem('currentLoggedIn');
    if (currentLoggedin) {
         $('#username').html(`Ingelogd als : <span class="ingelogde-user">${currentLoggedin}</span>`);
         $('#inlogBTN').attr('disabled', 'disabled');
         $('#logoutBTN').removeAttr('disabled');

    } else {
         $('#logoutBTN').attr('disabled', 'disabled');
         $('#inlogBTN').removeAttr('disabled');
    }
    const usersArray = JSON.parse(localStorage.getItem("all_users")) || [];


    $('#inlogBTN').click(() => {
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        const users = usersArray.map((user) => user.username);
        console.log(users, username)
        const loginBool = users.includes(username)
        console.log(loginBool)
       
//`${username}`
        if (users.includes(username)) {
            console.log("login succesvol");
            
            //array.findIndex((u) => u.username == "martin" && u.password == "test2");
            if (usersArray.findIndex((u) => u.username === username && u.password === password)){

                console.log(usersArray.findIndex((u) => u.username === username && u.password === password));
                const infoBoxBericht = "Succesvol ingelogd";
                console.log("if login");
                $('#username-input').val('');
                $('#password-input').val('');
                $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
                $('.infoBox').css('visibility', 'visible');
                setLoggedInUser(username);
                $('#inlogBTN').attr('disabled', 'disabled');
                $('#logoutBTN').removeAttr('disabled');
                $('#username').html(`Ingelogd als : <span class="ingelogde-user">${username}</span>`);
                } else {
                    errorLogin();
                }
           } else {
                errorLogin();
           }
    });
    $('#registerBTN').click(() => {
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
                
                // username already exists
                // kies een andere username
            }
            else {
                console.log("else reg");
                usersArray.push(user);
                infoBoxBericht = "user met succesvol aangemaakt.";
                $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
                $('.infoBox').css('visibility', 'visible');

                //register();
            }
            localStorage.setItem('all_users', JSON.stringify(usersArray));
        }
    })

});
function errorLogin() {
            const infoBoxBericht = "Username en password combinatie bestaat niet.";
            console.log("else login");
            $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
            $('.infoBox').css('visibility', 'visible');
}
const init = function() {
    // TODO
    localStorage.clear;
    localStorage.setItem('currentLoggedIn','');
    console.log("init");

};

const logIn = function() {
    // TODO
};

const logOut = function (){
    $('#logoutBTN').click(() => {
        localStorage.setItem('currentLoggedIn', '')
        $('#logoutBTN').attr('disabled', 'disabled');
        $('#inlogBTN').removeAttr('disabled');$('#username').html(`Ingelogd als : <span class="ingelogde-user"></span>`);
    });
};

const register = function() {
    // TODO implement
}

function checkLoggedIn() {
    const user = localStorage.getItem('currentLoggedIn');
    return user !== '';
}

function getLoggedInUser(){
    let user = '';
    if (checkLoggedIn()) {
        user = localStorage.getItem('currentLoggedIn');
    }
    return user;
}

function setLoggedInUser(user) {
    localStorage.setItem('currentLoggedIn', user);
}

function saveUser(user) {
    // TODO implement
}

function saveScore(user) {
    // TODO implement
}

export {init, logIn, logOut, register, getLoggedInUser, setLoggedInUser, saveUser, saveScore};