/**
 * @module snakeView
 * @description Alle view-functies voor de Snake pagina
 */
import {formatDate} from '../presenter/snake.js';

/**
 * @function showMessage
 * @description toont het bericht in de daarvoor bestemde plek.
 *
 * @param {string} head Titel
 * @param {string} message Bericht zelf
 */
export function showMessage(head, message) {
    const box = $('#infoBox');
    const header = '<h3>' + head + '</h3>';
    const inside = '<p>' + message + '</p>';
    box.html(header + inside);
    box.css('visibility', 'visible');
}

/**
 * @function clearMessage
 * @description Maakt het de infoBox weer leeg en niet zichtbaar voor de gebruiker.
 */
export function clearMessage() {
    const box = $('#infoBox');
    box.html("<p></p>");
    box.css('visibility', 'hidden');
};

/**
 * @function showScoreboard
 * @description Tekent het scorebord op de pagina op de daarvoor bestemde plek.
 *
 * @param {object} scores
 */
export function showScoreboard(scores) {
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
export function draw(foods, snake) {
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

/**
  @function drawElement(element, canvas) -> void
  @description Een element tekenen
  @param {Element} element een Element object
*/
 function drawElement(element) {
     $('#mySnakeCanvas').drawArc({
         draggable: false,
         fillStyle: element.color,
         x: element.x,
         y: element.y,
         radius: element.radius
     });
}