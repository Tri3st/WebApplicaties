/**
 * @module snakeView
 * @description Alle view-functies voor de Snake pagina
 */
import {formatDate} from '../presenter/snake.js';

/**
 * @function showMessage
 * @description toont het bericht in de daarvoor bestemde plek.
 *
 * @param head
 * @param message
 */
function showMessage(head, message) {
    const box = $('#infoBox');
    const header = '<h3>' + head + '</h3>';
    const inside = '<p>' + message + '</p>';
    box.html(header + inside);
    box.css("visibility", "visible");
}

/**
 * @function textToggle
 * @description Laten zien of niet laten zien van het bericht.
 *
 */
function infoBoxTextToggle() {
    const box = $('#infoBox');
    if (box.css("visibility") === 'hidden') box.css('visibility', 'visible');
    else box.css('visibility', 'hidden');
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

/**
 @function draw()
 @description Teken de slang en het voedsel
 */
function draw() {
    $('#mySnakeCanvas').clearCanvas();
    for (var i = 0; i < foods.length; i++) {
        var food = foods[i];
        drawElement(food);
    }
    for (var j = 0; j < snake.segments.length; j++) {
        var segment = snake.segments[j];
        drawElement(segment);
    }
}