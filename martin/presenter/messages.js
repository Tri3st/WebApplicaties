/**
 * @module messages
 * @description functies die dingen op het scherm tonen.
 */

/**
 * @function textMessage
 * @description Laat een bericht zien in het item met ID 'infoBox'.
 *              Het bericht kan worden meegegeven met 'message' en het type bepaalt
 *              wat de header van het bericht wordt.
 *
 * @param {string} message Bericht wat moet worden weergegeven.
 * @param {string} type Type: 'GAMEOVER' of 'WINNING'
 */
function textMessage(message, type) {
    let head;
    switch (type) {
        case 'GAMEOVER':
            head = 'GAME OVER';
            break;
        case 'WINNING':
            head = 'YOU WON';
            break;
        default:
            break;
    }
    showMessage(head, message, 'snake');
}

/**
 * @function drawTable
 * @description Tekent de tabel voor de scores dynamisch. Haalt tevens de data uit de API (voor nu uit een data
 *              file).
 */
function drawTable() {
    const scores = getScores()
    .then((score) => {
        showScoreboard(score);
        return score;
    })
    .catch((err) => console.log("Er was een fout in drawTable : ", err))
}

/**
 * @function getScores
 * @description haalt de scores uit de API (in dit geval van disk) en zet ze
 *              in een array van Objecten met de vorm :
 *              {string} name, {number} score, {date} date
 * @returns {array} scores (array van score objecten)
 */
async function getScores () {
    const response = await fetch('/js/model/scores.json', {
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

/**
 * @function formatDate
 * @description Geeft de datumstring een iets leesbaardere vorm
 *
 * @param {string} someDate string van een datum in ISO stijl
 * @returns {string} geformateerde string
 */
function formatDate (someDate) {
    let tempDate = someDate.split("T")
    tempDate = tempDate[0].split("-");
    return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
}

/**
 * @function showMessage
 * @description toont het bericht in de daarvoor bestemde plek. Afhankelijk van het type.
 *
 * @param {string} head Titel
 * @param {string} message Bericht zelf
 * @param {string} type Welke soort. 'snake', 'login'
 */
function showMessage(head, message, type) {
    let infoBoxId;
    switch (type) {
        case 'snake':
            infoBoxId = '#snakeInfoBox';
            break;
        case 'login':
            infoBoxId = '#loginInfoBox';
            break;
    }
    const box2 = $(infoBoxId);
    box2.css("visibility", "visible");
    const header = '<h3>' + head + '</h3>';
    const inside = '<p>' + message + '</p>';
    console.log("DONE IN SHOWMESSAGE !!", head);
    const body = header + inside;
    box2.html(body);
}

/**
 * @function clearMessage
 * @description Maakt het de infoBox weer leeg en niet zichtbaar voor de gebruiker.
 */
function clearMessage(type) {
    const box = $('#snakeInfoBox');
    const box2 = $('#loginInfoBox');
    box.html("<p></p>");
    box.css("visibility", "hidden");
    box2.html("<p></p>");
    box2.css("visibility", "hidden");
}

/**
 * @function showScoreboard
 * @description Tekent het scorebord op de pagina op de daarvoor bestemde plek.
 *
 * @param {object} scores
 */
function showScoreboard(scores) {
    const tableHeaderHTML = '<tr><th>Naam</th><th>Score</th><th>Datum</th></tr>';
    let tableMain = $('<table></table>').append(tableHeaderHTML);
    $.each(scores, function (index, score) {
        let row = $(`<tr class=\"row${index}\"></tr>`);
        $.each(score, function (i, value) {
            let rowData;
            if (i === 'date') {
                rowData = $(`<td class=\"row${index}data${i}\"></td>`).text(formatDate(value));
            } else {
                rowData = $(`<td class=\"row${index}data${i}\"></td>`).text(value);
            }
            row.append(rowData);
        });
        tableMain.append(row);
    });
    // add table to DOM
    $('#scoreboard').append($(tableMain));
}

export {
    showMessage, textMessage, clearMessage, formatDate, drawTable, getScores, showScoreboard
};