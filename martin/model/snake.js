/**
 * @module snake
 * @description De klasse snake
 */
import {HEAD, SNAKE, STEP, YMIN, XMIN, LEFT, RIGHT, DOWN, UP} from './constanten.js';
import {checkGameIsOver} from '../presenter/snake.js';

/**
 @class Snake
 @classdesc Klasse Snake met 3 functies: canMove (controlleer of slang niet van het canvas af loopt)
  , doMove (voer de beweging uit) en toString (om de slang in een string representatie weer te geven)
 @param direction {string} De richting waarin de slang gaat.
 @param canvas {object} Informatie over canvas. cMax, yMax, width en height.
 @param {array} segments een array met aaneengesloten slangsegmenten
  Het laatste element van segments wordt de KOP van de slang
 @param foods {[food]} het eten in het spel
 @example
 new Snake([Segment(), Segment()];
 */
function Snake(direction, canvas, segments, foods = []) {
    /** De segmenten van de slang (laatste segment in array is de kop) */
    this.segments = segments;
    /** kop van de slang */
    this.head = segments[segments.length - 1];
    this.head.color = HEAD;
    /** staart van de slang */
    this.tail = segments[0];
    this.tail.color = SNAKE;
    /** richting waarin de slang gaat bewegen */
    this.direction = direction;
    /**
     * kijkt of de slang kan bewegen in de opgegeven richting
     * @param direction richting
     * @returns {boolean} true = wel
     */
    this.canMove = function(direction) {
        let head2 = Object.assign({}, this.head);
        switch (direction) {
            case UP:
                return head2.y - STEP >= YMIN;
            case DOWN:
                return head2.y + STEP <= canvas.yMax;
            case LEFT:
                return head2.x - STEP >= XMIN;
            case RIGHT:
                return head2.x + STEP <= canvas.xMax;
        }
    }
    /**
     * beweegt in de opgegeven richting
     * @param direction de richting waarin bewogen moet worden
     * @param localFoods we geven de foods mee
     * @return en geven de foods ook weer terug.
     */
    this.doMove = function(direction, localFoods) {
        let head = Object.assign({}, this.head); // Maak een deep-copy van het object.
        switch (direction) {
            case UP:
                head.y -= STEP;
                break;
            case DOWN:
                head.y += STEP;
                break;
            case LEFT:
                head.x -= STEP;
                break;
            case RIGHT:
                head.x += STEP;
                break;
            default:
                break;
        }
        this.head.color = SNAKE;
        this.segments.push(head);
        this.head = this.segments[this.segments.length - 1];
        // Als de slang een 'food' raakt, halen we deze uit de foods array.
        // Ook doen we dan geen shift, omdat de slang langer wordt.
        if (localFoods && this.head.collidesWithOneOf(localFoods)) {
            console.log("Eten gevonden!");
            const foodIndex = localFoods.findIndex((food) => food.x === head.x && food.y === head.y);
            localFoods.splice(foodIndex, 1);
        } else {
           this.segments.shift();
        }
        this.tail = this.segments[0];
        this.head.color = HEAD;
        checkGameIsOver();
        return localFoods;
    }
    /**
     * Geeft een string representatie van het Snake object. Voor debugging.
     * @returns {string}
     */
    this.toString = function () {
        return this.segments.join(" - ");
    }
}

export {Snake};