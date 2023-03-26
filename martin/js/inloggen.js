/**
 * @module inloggen
 */

let all_users = [];

$( document ).ready(() => {
    console.log('READY!');


    let  currentLoggedin;
    const usersArray = JSON.parse(localStorage.getItem("all_users")) || [];

    $('#inlogBTN').click(() => {
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        const users = usersArray.map((user) => user.username);
        console.log(users, username)
        const loginBool = users.includes(username)
        console.log(loginBool)
        if (usersArray.map((user) => user.username).includes(`${username}`)){
            console.log("login succesvol")
            if (usersArray.findIndex((user) => user.username === username && user.password === password)){

                const infoBoxBericht = "Succesvol ingelogd";
                $('#username-input').val('');
                $('#password-input').val('');
                $('.infoBox').append(`<p>${infoBoxBericht}</p>`);
                $('.infoBox').css('visibility', 'visible');
                localStorage.setItem('currentLoggedIn', username)
            }
        }
    });
    $('#registerBTN').click(() => {
        const username = $('#username-input').val();
        const password = $('#password-input').val();
        if (username !== '' && password !== '') {
            const user = {
                "username": username,
                "password": password,
                "userData": {
                    "nrOfFoods": 15,
                    "highscore": 0
                },
            };
            console.log(user)
            if (usersArray.map((user) => user.username).includes(username)){
                // username already exists
                // kies een andere username
            }
            else {
                usersArray.push(user);
            }
            localStorage.setItem('all_users', JSON.stringify(usersArray));
        }
    })
});