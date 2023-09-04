import {CURRENTLOGGEDIN, ALLUSERS, USERMODEL, DBNAME} from '../constanten.js';
import {DataBaseManager} from "../model/inloggen.js";

/**
 * @module inloggen
 */

let currentlyLoggedInUser = '';
const db = new DataBaseManager();

const init = function() {
    console.log("Inside init() >>>");
    // get currentlyLoggedInUser
    currentlyLoggedInUser = db.getCurrentLoggedIN() || '';
};

const logIn = function(username, password) {
    if (db.verifyUser(username, password)) {
        db.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }
};

const logOut = function (){
    db.setCurrentLoggedIn('');
};

const register = function(username, password) {
    if (!db.findUser(username)){
        db.addUser(username, password);
        db.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }

}

export {init, logIn, logOut, register, db, currentlyLoggedInUser};