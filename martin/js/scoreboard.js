/**
 * @module scoreboard
 * @description bevat functies om de score tabel te tekenen en bij te werken
 */


/**
 * @function drawTable
 * @description Tekent de tabel voor de scores dynamisch. Haalt tevens de data uit de API (voor nu uit een data
 *              file).
 */
async function drawTable() {
    console.log("inside drawTable() >>>");
    const scores = await getScores();
    console.log("scores: ", scores)
    const tableHeader = $('<tr></tr>')
        .append('<th>Naam</th><th>Score</th><th>Datum</th>')
    var tableBody = $('<table></table>').append($("<tbdody>"))
        .append(tableHeader)
    $.each(scores, function(index, score) {
        let row = $('<tr></tr>');
        $.each(score, function(i, value) {
            let rowData = $('<td></td>').text(value);
            row.append(rowData);
        });
        tableBody.append(row);
    })
    // add table to DOM
    $('#scoreboard').append(tableBody);
}

/**
 * @function getScores
 * @description haalt de scores uit de API (in dit geval van disk, tot de API klaar is) en zet ze
 *              in een array van Objecten met de vorm :
 *              {string} name, {number} score, {date} date
 * @returns {[object]} array score Objecten
 */
const getScores = function () {
    var scores;
    return fetch('./js/scores.json', {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            return response.text()
        })
        .then((json) => {
            // scores = json;
            scores = JSON.parse(json);
            return scores;
        })
        .catch((error) => {
            console.log("Er ging iets fout in getScores (scoreboard.js)!");
            console.error(error);
        });
}

export {drawTable};