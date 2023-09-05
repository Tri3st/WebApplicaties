import {createFood, createSegment, Element, formatDate, getScores, textMessage} from "../js/presenter/snake.js";
import {getCanvasSizes} from "../js/view/snakeView.js";
import {UP, DOWN} from '../js/constanten.js';
import {DataBaseManager} from "../js/model/inloggen.js";
import {logIn, logOut, register} from '../js/presenter/inloggen.js';

QUnit.module("Test een paar Snake functies");

QUnit.test("of snake textMessage GAME OVER bericht werkt.", (assert) => {
    const expected = "<h3>GAME OVER</h3><p>test</p>";
    const box = $('#snakeInfoBox');
    textMessage('test', 'GAMEOVER');
    assert.equal(box.html(), expected);
});

QUnit.test("of snake textMessage WINNING bericht werkt.", (assert) => {
    const expected = "<h3>YOU WON</h3><p>andere test</p>";
    const box = $('#snakeInfoBox');
    textMessage('andere test', 'WINNING');
    assert.equal(box.html(), expected);
});

QUnit.test("of formatDate werkt.", (assert) => {
    const expected = "01-01-2023";
    const date = "2023-01-01T12:00:000Z";
    const formattedDate = formatDate(date.toString());
    assert.equal(formattedDate, expected);
});

QUnit.test("of getScores werkt.", (assert) => {
    const expected = JSON.stringify([
        { name: "Martin", score: 120, date: "2022-03-07T10:04:000Z" },
        { name: "MVD", score: 90, date: "2022-03-06T10:04:000Z" },
        { name: "RemcoNL", score: 100, date: "2022-03-03T10:04:000Z" },
        { name: "Hans", score: 30, date: "2022-03-01T10:04:000Z" }]);

    const done = assert.async();

    getScores()
    .then(function(result){
        const result2 = JSON.stringify(result);
        assert.equal(result2,expected);
        done();
    })
    .catch(done);
});

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
    const falseActual = {width: 0, height: 0};

    assert.deepEqual(actual, expected);
    assert.notDeepEqual(falseActual, expected);
});

QUnit.test("of doKeydown werkt.", (assert) => {

    const expected = UP;
    const falseExpected = DOWN;

    const done = assert.async();

    let keydown = '';
    const event = $(document).on("keydown", function() {
        keydown = UP;
    })

    event.trigger("keydown");

    setTimeout(function() {
        assert.equal(keydown, expected);
        assert.notEqual(keydown, falseExpected);
        done();
    });
});

QUnit.module("Test een paar DataBaseManager functies");

QUnit.test("of het maken van een nieuwe DataBaseManager werkt.", (assert) => {
    localStorage.clear();
    const dbm = new DataBaseManager();
    const expectedUsers = [];
    const actual = dbm.users;

    assert.deepEqual(actual, expectedUsers);
});

QUnit.test("of het maken van een user werkt.", (assert) => {
    localStorage.clear();
    const dbm = new DataBaseManager();
    // TODO implement
    assert.equal(1, 1);
});


let dbm;

QUnit.module("Test een paar inlog functies", {
    beforeEach: function() {
        localStorage.clear();
        dbm = new DataBaseManager();
        dbm.addUser("user1", "password");
    }
});

QUnit.test("of login werkt", (assert) => {
    assert.expect(3);
    // a log in with the right credentials
    const login = logIn("user1", "password");
    // a log in with wrong credentials
    const falseLogin = logIn("false", "bogus");
    // and the currently logged in user
    const current = dbm.getCurrentLoggedIn();

    assert.equal(login, true);
    assert.notEqual(falseLogin, true);
    assert.equal(current, "user1");
});

QUnit.test("of logout werkt", (assert) => {
    assert.expect(2);
    // log the user in
    logIn("user1", "password");
    // check that we have a currentLoggedIn value
    const before = dbm.getCurrentLoggedIn();
    // now log out
    logOut();
    // and check that we have NO currentLoggedIn value
    const after = dbm.getCurrentLoggedIn();

    assert.equal(before, 'user1');
    assert.equal(after, "");
});

QUnit.test("of register werkt", (assert) => {
    assert.expect(3);
    console.log(dbm);
    // register a new user
    const registered = register("user2", "secret");
    // check if it is also logged in
    const current = dbm.getCurrentLoggedIn();
    // check if the user can be found in the database manager
    const alsoCurrent = dbm.findUser("user2");

    console.log(dbm, current, alsoCurrent);

    assert.equal(registered, true);
    assert.equal(current, "user2");
    assert.equal(typeof alsoCurrent, "number")
});

