import {createFood, createSegment, Element, formatDate, getScores, textMessage} from "../js/presenter/snake.js";
import {getCanvasSizes} from "../js/view/snakeView.js";
import {UP, DOWN} from '../js/constanten.js';

QUnit.module("Test een paar Snake functies");

QUnit.test("of textMessage GAME OVER bericht werkt.", (assert) => {
    const expected = "<h3>GAME OVER</h3><p>test</p>";
    const box = $('#infoBox');
    textMessage('test', 'GAMEOVER');
    assert.equal(box.html(), expected);
});

QUnit.test("of textMessage WINNING bericht werkt.", (assert) => {
    const expected = "<h3>YOU WON</h3><p>andere test</p>";
    const box = $('#infoBox');
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
        console.log("simulate key pressed UP");
        keydown = UP;
    })

    event.trigger("keydown");

    console.log("event : ", event);
    console.log('keydown : ', keydown)

    setTimeout(function() {
        assert.equal(keydown, expected);
        assert.notEqual(keydown, falseExpected);
        done();
    });
});
