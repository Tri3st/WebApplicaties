import { assert } from 'qunit';
import {getScore, drawTable} from '../js/scoreboard'; 

const {test} = QUnit;

QUnit.module("getScores should get the scores");
test("test ophalen van scores", async (assert) => {
    const scores = await getScores();
    const actual = [
        {
          "name": "Martin",
          "score": 120,
          "date": "2022-03-07T10:04:000Z"
        },
        {
          "name": "MVD",
          "score": 90,
          "date": "2022-03-06T10:04:000Z"
        },
        {
          "name": "RemcoNL",
          "score": 100,
          "date": "2022-03-03T10:04:000Z"
        },
        {
          "name": "Hans",
          "score": 30,
          "date": "2022-03-01T10:04:000Z"
        }
      ];
    assert.equal(scores, actual);
});