import {DataBaseManager} from "../model/inloggen.js";

/**
 * @module inloggen
 */

let currentlyLoggedInUser = '';
let dbm;

const logIn = function(username, password) {
    dbm = new DataBaseManager();
    if (dbm.verifyUser(username, password)) {
        dbm.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }
};

const logOut = function (){
    dbm = new DataBaseManager();
    dbm.setCurrentLoggedIn('');
};

const register = function(username, password) {
    dbm = new DataBaseManager();
    if (dbm.findUser(username) === false){
        dbm.addUser(username, password);
        dbm.setCurrentLoggedIn(username);
        return true;
    } else {
        return false;
    }
}

export {logIn, logOut, register};