import {textMessage} from "../js/textMessages";

const {test} = QUnit;

QUnit.module("textMessage");
test("of een WIN bericht wordt getoond", (assert) => {
    textMessage("Dit is een win test.", "WINNING");
    const boxWin = $('#infoBox').html();
    const actual = `<h3>YOU WON</h3><p>Dit is een win test.</p>`;

    assert.equal(boxWin, actual);
});

test("of een VERLIES bericht wordt getoond", (assert) => {
    textMessage("Dit is een game over test.", "GAMEOVER");
    const boxGameOver = $('#infoBox').html();
    const actual = `<h3>GAME OVER</h3><p>Dit is een game over test.</p>`;

    assert.equal(boxGameOver, actual);
});