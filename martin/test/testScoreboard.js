import {getScores, formatDate} from "../js/presenter/scoreboard.js";

QUnit.module("dashboard drawTable functie");

QUnit.test("of de tabel met scores correct opgehaald wordt.", async (assert) => {

    const done = assert.async();

    const expected = [
        {"name": "Martin", "score": 120, "date": "2022-03-07T10:04:000Z"},
        {"name": "MVD", "score": 90, "date": "2022-03-06T10:04:000Z"},
        {"name": "RemcoNL", "score": 100, "date": "2022-03-03T10:04:000Z"},
        {"name": "Hans", "score": 30, "date": "2022-03-01T10:04:000Z"}
    ];
    const actual = await getScores();
    assert.deepEqual(actual, expected, "Tabel wordt correct opgehaald.");
    done();
});

QUnit.test("met een verkeerde tabel", async (assert) => {
    const done = assert.async();

    const expected = [
        {"name": "aabb", "score": 120, "date": "2022-03-07T10:04:000Z"},
        {"name": "ccdd", "score": 90, "date": "2022-03-06T10:04:000Z"},
        {"name": "eeff", "score": 100, "date": "2022-03-03T10:04:000Z"}
    ];
    const actual = await getScores();
    assert.notDeepEqual(actual, expected, "verkeerde tabel wordt gedetecteerd.");
    done();
});