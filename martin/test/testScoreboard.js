import { drawTable } from "../src/scoreboard";
const QUnit = require("qunit");
const $ = require("jquery");

QUnit.module("dashboard drawTable fucntie");

QUnit.test("of het de tabel ophaalt", (assert) => {
    const actual =
        "<!-- Hier wordt met jQuery de scoreboard tabel in geplakt. -->" +
        '<table><tr><th>Naam</th><th>Score</th><th>Datum</th></tr><tr class="row0"><td class="row0dataname">Martin</td>' +
        '<td class="row0datascore">120</td><td class="row0datadate">07-03-2022</td></tr><tr class="row1">' +
        '<td class="row1dataname">MVD</td><td class="row1datascore">90</td><td class="row1datadate">06-03-2022</td>' +
        '</tr><tr class="row2"><td class="row2dataname">RemcoNL</td><td class="row2datascore">100</td><td class="row2datadate">' +
        '03-03-2022</td></tr><tr class="row3"><td class="row3dataname">Hans</td><td class="row3datascore">30</td><td class="row3datadate">' +
        '01-03-2022</td></tr><tr class="rowdefault"><td class="rowdefaultdata0">[object Object]</td><td class="rowdefaultdata1">[object Object]' +
        '</td><td class="rowdefaultdata2">[object Object]</td><td class="rowdefaultdata3">[object Object]</td></tr></table>';
    const scores = $("#scoreboard").html();
    console.log(scores);
    const promise = assert.async();
    let scoresAfterDrawTable;
    drawTable()
        .then(() => {
            scoresAfterDrawTable = $("#scoreboard").html();
            console.log(scoresAfterDrawTable);
            promise();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            assert.equal(actual, scoresAfterDrawTable);
        });
});