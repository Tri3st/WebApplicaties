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
    const tableHeaderHTML = '<tr><th>Naam</th><th>Score</th><th>Datum</th></tr>';
    var tableMain = $('<table></table>').append(tableHeaderHTML);
    $.each(scores, function(index, score) {
        let row = $(`<tr class=\"row${index}\"></tr>`);
        $.each(score, function(i, value) {
            let rowData;
            if (i === 'date'){
                rowData = $(`<td class=\"row${index}data${i}\"></td>`).text(formatDate(value));
            } else {
                rowData = $(`<td class=\"row${index}data${i}\"></td>`).text(value);
            }
            row.append(rowData);
        });
        tableMain.append(row);
    })
    // add table to DOM
    $('#scoreboard').append($(tableMain));
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
            console.log(scores);
            return scores;
        })
        .catch((error) => {
            console.log("Er ging iets fout in getScores (scoreboard.js)!");
            console.error(error);
        });
}

const formatDate = function(someDate) {
    let tempDate = someDate.split("T")
    tempDate = tempDate[0].split("-");
    return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
}

export {drawTable};