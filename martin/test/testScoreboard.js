import { drawTable } from "../src/scoreboard";
const QUnit = require("qunit");
const $ = require("jquery");

QUnit.module("dashboard drawTable fucntie");

QUnit.module("drawTable");
test("of de tabel van de scores opgehaald wordt.", async (assert) => {
    const scores = $('#scoreboard').html();
    await drawTable();
    const scoresAfterDrawTable = $('#scoreboard').html();
    const actual = `
                        <!-- Hier wordt met jQuery de scoreboard tabel in geplakt. -->
                    <table><tr><th>Naam</th><th>Score</th><th>Datum</th></tr><tr class="row0"><td class="row0dataname">Martin</td><td class="row0datascore">120</td>
                    <td class="row0datadate">07-03-2022</td></tr><tr class="row1"><td class="row1dataname">MVD</td><td class="row1datascore">90</td><td class="row1datadate">06-03-2022</td>
                    </tr><tr class="row2"><td class="row2dataname">RemcoNL</td><td class="row2datascore">100</td><td class="row2datadate">03-03-2022</td></tr>
                    <tr class="row3"><td class="row3dataname">Hans</td><td class="row3datascore">30</td><td class="row3datadate">01-03-2022</td></tr></table>`;
    // voor de aanroep van de functie klopt het nog niet
    assert.notEqual(scores, actual);

    // NA het aanroepen van de functie wel.
    assert.equal(scoresAfterDrawTable, actual);
});