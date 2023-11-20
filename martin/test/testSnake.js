import { move, createStartSnake, createSegment, createFood, createFoods, draw, getCanvasSizes } from "../presenter/snake.js";
import {UP, DOWN} from '../model/constanten.js';
import {DataBaseManager} from "../model/database.js";
import {Element} from '../model/element.js';
import {login, logout, register, checkLoggedin} from "../presenter/inloggen.js";

QUnit.module("Test een paar Snake functies");

QUnit.test("of createSegment werkt.", (assert) => {
    const expected = new Element(10, 0, 0, 'DarkRed');
    const actual = createSegment(0, 0);
    const falseActual = createSegment(1, 1);

    assert.deepEqual(actual, expected);
    assert.notDeepEqual(falseActual, expected);
});

QUnit.test("of createFood werkt.", (assert) => {
    const expected = new Element(10, 0, 0, 'Olive');
    const actual = createFood(0, 0);
    const falseActual = createFood(1, 1);

    assert.deepEqual(actual, expected);
    assert.notDeepEqual(falseActual, expected);
});

QUnit.test("of getCanvasSize werkt.", (assert) => {
    const expected = {width: 600, height: 480};
    const actual = getCanvasSizes();
    console.log(actual);
    const falseActual = {width: 0, height: 0};

    assert.deepEqual(actual, expected);
    assert.notDeepEqual(falseActual, expected);
});

QUnit.module("Test een paar DataBaseManager functies", {
    before: function () {
        localStorage.clear();
        this.dbm = new DataBaseManager();
    },

    after: function () {
        localStorage.clear();
    }
});

QUnit.test("of het maken van een nieuwe DataBaseManager werkt.", function (assert) {
    const expectedUsers = [];
    const actual = this.dbm.users;

    assert.deepEqual(actual, expectedUsers);
});

QUnit.test("of het maken van een user werkt.", function (assert) {
    this.dbm.addUser("testuser2", "secret");
    const found = this.dbm.findUser("testuser2");

    assert.equal(found, 0);
});

QUnit.test("of verwijderen van een user werkt.", function (assert) {

    // maak een paar users aan
    this.dbm.addUser("test1", "secret");
    this.dbm.addUser("test2", "moreSecret");

    // verwijder de gebruiker met usernaam "test2"
    this.dbm.removeUser("test1");
    const found = this.dbm.findUser("test1");

    assert.deepEqual(found, false);
});