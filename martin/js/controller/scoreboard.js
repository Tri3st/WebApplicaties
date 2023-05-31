/**
 * @module scoreboard
 * @description bevat functies om de score tabel te tekenen en bij te werken
 */


import {showScoreboard} from "../view/messages";

/**
 * @function drawTable
 * @description Tekent de tabel voor de scores dynamisch. Haalt tevens de data uit de API (voor nu uit een data
 *              file).
 */
export async function drawTable() {
    const scores = getScores();
    showScoreboard(scores);
}

/**
 * @function getScores
 * @description haalt de scores uit de API (in dit geval van disk) en zet ze
 *              in een array van Objecten met de vorm :
 *              {string} name, {number} score, {date} date
 * @returns {array} array score Objecten
 */
export function getScores () {
    let scores = [];
    fetch('../js/scores.json', {headers: {
        'Accept': 'application/json',
    }})
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        json.forEach((s) => scores.push(s));
        return json;
    })
    return scores;
}

export function formatDate (someDate) {
    let tempDate = someDate.split("T")
    tempDate = tempDate[0].split("-");
    return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
}