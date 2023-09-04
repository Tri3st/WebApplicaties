/**
 * @module snakeView
 * @description Alle view-functies voor de Snake pagina
 */
import {formatDate} from '../presenter/snake.js';

/**
 * @function showMessage
 * @description toont het bericht in de daarvoor bestemde plek. Afhankelijk van het type.
 *
 * @param {string} head Titel
 * @param {string} message Bericht zelf
 * @param {string} type Welke soort. 'snake', 'login'
 */
export function showMessage(head, message, type) {
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
export function clearMessage(type) {
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

/**
 * @function getCanvasSizes
 * @description Haalt de breedte en hoogte van het canvas element op.
 *
 * @returns {object} Object met {width: breedte, height: hoogte}
 */
export function getCanvasSizes() {
    const canvas = $('#mySnakeCanvas');
    return {
        width: canvas[0].width,
        height: canvas[0].height
    }
}

/**
 * @function doKeydown
 * @description Bepaalt de nieuwe richting die de slang op moet gaan. Dit wordt bepaalt door
 *              door wat de gebruiker voor toets indrukt. Dit event wordt meegestuurd evenals de
 *              'oude' richting. Hieruit komt de nieuwe richting terug. Ook wordt er grafisch
 *              weergegeven wat de nieuwe richting is.
 *
 * @param {object} event Het event
 * @param {string} dir De oude richting
 * @returns {string} De nieuwe richting
 */
export function doKeydown(event, dir) {
    const LEFT     = "left",
          RIGHT    = "right",
          UP       = "up",
          DOWN     = "down";
    let newDirection = '';
    $('.pijl').removeClass('pijl-aktief');
    switch(event.which) {
        case 37:
            if (dir !== RIGHT){
                newDirection = LEFT;
                $('#pijl-links').addClass('pijl-aktief');
            }
            event.preventDefault();
            break;
        case 38:
            if (dir !== DOWN) {
                newDirection = UP;
                $('#pijl-omhoog').addClass('pijl-aktief');
            }
            event.preventDefault();
            break;
        case 39:
            if (dir !== LEFT) {
                newDirection = RIGHT;
                $('#pijl-rechts').addClass('pijl-aktief');
            }
            event.preventDefault();
            break;
        case 40:
            if (dir !== UP){
                newDirection = DOWN;
                $('#pijl-omlaag').addClass('pijl-aktief');
            }
            event.preventDefault();
            break;
    }
    return newDirection;
}