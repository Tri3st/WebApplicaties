/**
 * @module textMessages
 * @description houdt zich bezig met de verwerking van de berichten.
 */

import {showMessage} from "../view/messages";

/**
 * @function textMessage
 * @description Laat een bericht zien in het item met ID 'infoBox'.
 *              Het bericht kan worden meegegeven met 'message' en het type bepaalt
 *              wat de header van het bericht wordt.
 *
 * @param {string} message Bericht wat moet worden weergegeven.
 * @param {string} type Type: 'GAMEOVER' of 'WINNING'
 */
export function textMessage(message, type) {
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
    showMessage(head, message);
}