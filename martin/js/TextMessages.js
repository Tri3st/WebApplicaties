/**
 *
 * @module TextMessages
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

const textToggle = function() {
    const box = $('#infoBox');
    if (box.css("visibility") === 'hidden') box.css('visibility', 'visible');
    else box.css('visibility', 'hidden');
}

export {textMessage, textToggle};