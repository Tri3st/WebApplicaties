/**
 *
 * @module textMessages
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
const textMessage = function (message, type) {
    const box = $('#infoBox');
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
const textToggle = function() {
    const box = $('#infoBox');
    if (box.css("visibility") === 'hidden') box.css('visibility', 'visible');
    else box.css('visibility', 'hidden');
}

export {textMessage, textToggle};