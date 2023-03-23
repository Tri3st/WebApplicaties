/**
 * @module inloggen
 */


$( document ).ready(() => {
    console.log('READY!');
    const username = $('#username-input').val();
    const password = $('#password-input').val();

    let  currentLoggedin;
    const usersArray = JSON.parse(localStorage.getItem("all_users")) || [];

    $('#inlogBTN').click(() => {
        if (usersArray.map((user) => user.username).includes(username)){
            if (usersArray.findIndex((user) => user.username === username && user.password === password)){
                currentLoggedin = username;
            }
        }
    });
    $('#registerBTN').click(() => {
    if (username !== '' && password !== '') {
            const user = {
                "username": username,
                "password": password
            };
            console.log(user)
            if (usersArray.map((user) => user.username).includes(username)){
                // username already exists
            }
            else {
                usersArray.push({username: username, password: password});
            }
            localStorage.setItem('all_users', JSON.stringify(usersArray));
        }
    })
});