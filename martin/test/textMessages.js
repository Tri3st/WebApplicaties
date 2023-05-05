/**
 * @module textMessages
 * @description tests for textMessages.js
 */
import QUnit from "qunit";
import $ from 'jquery';

const {test} = QUnit;

QUnit.module('textMessage',{
    beforeEach: () => {
        const testBox = $('#infoBox');
    }
});

test('type GAMEOVER laat een game over bericht zien', (assert) => {
    const message = "TEST"
    const html = '<h3>GAME OVER</h3>' + '<p>' + message + '</p>';
    assert.equal(testBox.html(), '<h3>GAME OVER</h3><p>TEST</p>');
})