/**
 * @module scoreboard
 * @description bevat functies om de score tabel te tekenen en bij te werken
 */


import {showScoreboard} from "../view/messages.js";

/**
 * @function drawTable
 * @description Tekent de tabel voor de scores dynamisch. Haalt tevens de data uit de API (voor nu uit een data
 *              file).
 */
function drawTable() {
    const scores = getScores().then(() => {
        showScoreboard(scores);
    });
}

/**
 * @function getScores
 * @description haalt de scores uit de API (in dit geval van disk) en zet ze
 *              in een array van Objecten met de vorm :
 *              {string} name, {number} score, {date} date
 * @returns {Array} scores (array van score objecten)
 */
async function getScores () {
    const response = await fetch('../js/model/scores.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }})
    if (response.ok) {
        const jsonValue = await response.json();
        return Promise.resolve(jsonValue);
    } else {
        return Promise.reject("There was an error");
    }
}

function formatDate (someDate) {
    let tempDate = someDate.split("T")
    tempDate = tempDate[0].split("-");
    return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
}

export {drawTable, getScores, formatDate};
