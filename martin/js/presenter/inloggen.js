import {DataBaseManager} from "../model/inloggen.js";
import {DB} from '../constanten.js';

/**
 * @module inloggen
 */

let currentlyLoggedInUser = '';

const init = function() {
    console.log("Inside init() >>>");
    // get currentlyLoggedInUser
    currentlyLoggedInUser = DB.getCurrentLoggedIn() || '';
};

const logIn = function(username, password) {
    if (DB.verifyUser(username, password)) {
        DB.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }
};

const logOut = function (){
    DB.setCurrentLoggedIn('');
};

const register = function(username, password) {
    if (DB.findUser(username) === false){
        DB.addUser(username, password);
        DB.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }
}

export {init, logIn, logOut, register};