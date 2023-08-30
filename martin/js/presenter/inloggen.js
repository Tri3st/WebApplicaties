import {CURRENTLOGGEDIN, ALLUSERS, USERMODEL, DBNAME} from '../constanten.js';
/**
 * @module inloggen
 */

let all_users = [],
    user = USERMODEL,
    currentlyLoggedInUser = '',
    db;

const request = indexedDB.open(DBNAME, 1);

request.onerror = (event) => {
    console.error("An error occurred with IndexedDB.");
    console.error(event);
};

const init = function() {
    console.log("Inside init() >>>");
    // get all users
    all_users = JSON.parse(localStorage.getItem(ALLUSERS));
    // get currentlyLoggedInUser
    currentlyLoggedInUser = localStorage.getItem(CURRENTLOGGEDIN);
    request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore("users", {autoIncrement: true});
        store.createIndex("users_id", ["username"], {unique: true});
    };
    request.onsuccess = () => {
        console.log("Database opened successfully.");
        const db = request.result;
        const transaction = db.transaction("users", "readwrite");

        const store = transaction.objectStore("users");
        const usersIndex = store.index("users_id");
    };


};

const logIn = function(user) {
    localStorage.setItem(CURRENTLOGGEDIN, user.username);
};

const logOut = function (){
    localStorage.setItem(CURRENTLOGGEDIN, null);
};

const register = function(user) {
    // TODO
}

function checkLogIn(user) {
    init();
    console.log("all users : ", all_users);
    if (all_users.map((thisUser) => thisUser.username).includes(user.username)){
        const currUser = all_users.find((savedUser) => savedUser.username === user.username);
        return (currUser.password === user.password);
    }
    return false;
}

function checkLoggedIn() {
    init();
    return currentlyLoggedInUser !== null;
}

function getLoggedInUser(){
    let user = '';
    if (checkLoggedIn()) {
        user = localStorage.getItem(CURRENTLOGGEDIN);
    }
    return user;
}

function saveUser(user) {
    init();
    let newUser = {
        username: user.username,
        password: user.password,
        userData: {
            nrOfFoods: user.userData.nrOfFoods,
            highScore: -1,
            dateOfHighScore: ''
        }
    };
    const currentUserIndex = all_users.findIndex((currUser) => currUser.username === user.username);
    const currentUser = all_users[currentUserIndex];

    newUser.userData.nrOfFoods = user.userData.nrOfFoods;
    if (currentUser.userData.highScore < user.userData.highScore){
        newUser.userData.highScore = user.userData.highScore;
        newUser.userData.dateOfHighScore = new Date();
    } else {
        newUser.userData.highScore = currentUser.userData.highScore;
        newUser.userData.dateOfHighScore = currentUser.userData.dateOfHighScore;
    }
    all_users.splice(currentUserIndex, 1, newUser);
    localStorage.setItem(ALLUSERS, JSON.stringify(all_users));
}

export {init, logIn, logOut, register, getLoggedInUser, saveUser, checkLogIn};