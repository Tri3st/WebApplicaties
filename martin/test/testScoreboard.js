import {getScores, formatDate} from "../js/controller/scoreboard.js";

QUnit.module("dashboard drawTable fucntie");

QUnit.test("of de tabel met scores correct opgehaald wordt.", (assert) => {
    const expected = `[
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
]`;
    const actual = getScores();
    assert.equal(actual, expected);
});