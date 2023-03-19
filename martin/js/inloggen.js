/**
 * @module inloggen
 */


$( document ).ready(() => {
    console.log('READY!');
    const username = $('#username-input');
    const password = $('#password-input');

    $('#inlogBTN').click(() => {

    });
    $('#registerBTN').click(() => {
    if (username !== '' && password !== '') {
            const user = {
                username: username.toString(),
                password: password.toString()
            };
            console.log(user)
            localStorage.setItem(`${username}`, `${password}`);
        }
    })
});