/**
 * @module snake
 * @description Module met functies, hulpfuncties voor de snake pagina.
 */
import {R, STEP, UP, XMIN, YMIN, SLEEPTIME, SNAKE, FOOD} from '../model/constanten.js';
import {clearMessage, drawTable, textMessage} from './messages.js';
import {Snake} from "../model/snake.js";
import {Element} from '../model/element.js';
	
let snake,
    numfoods = 15,   // aantal voedselelementen
	foods = [],		  // voedsel voor de slang
	width,                    // breedte van het tekenveld
	height,                   // hoogte van het tekenveld
	xMax,                     // maximale waarde van x = width - R
	yMax,                     // maximale waarde van y = height - R
    snakeTimer,
    canvas,
	direction = UP;

$( document ).ready(() => {
    // getUserInfo()
    drawTable();
	$("#startSnake").click(init);
	$("#stopSnake").click(stop);
})


/**
 * @function init()
 * @description Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang,
 *       genereer voedsel, en teken alles
*/
function init() {
    clearMessage('snake');
    numfoods = parseInt($('#food-select option:selected').text());
    width = getCanvasSizes().width;
    height = getCanvasSizes().height;
    xMax = width - R;
    yMax = height - R;
    canvas = {width, height, xMax, yMax};
	snake = createStartSnake();
    foods = createFoods();
    jQuery(document).keydown(function(event) {
        direction = doKeydown(event, direction);
    });

    snakeTimer = setInterval(() => {
        move(direction);
    }, SLEEPTIME);
}

/**
  @function move(direction)
  @description Beweeg slang in aangegeven richting
               tenzij slang uit canvas zou verdwijnen
  @param   {string} direction de richting (een van de constanten UP, DOWN, LEFT of RIGHT)
*/
function move(direction) {
	if (snake.canMove(direction)) {
		snake.doMove(direction);
        draw(foods, snake);
	}
	else {
        textMessage("Je hebt de muur geraakt!", 'GAMEOVER');
        stop();
	}
}

/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/
 
/**
  @function createStartSnake() -> Snake
  @description Slang creëren, bestaande uit  twee segmenten,
               in het midden van het veld
  @return {Snake} slang volgens specificaties
*/
function createStartSnake() {
	const segments   = [createSegment(R + width/2, R + height/2),
	                  createSegment(R + width/2, height/2 - R)];
     return new Snake(direction, canvas, segments, foods);
}
/**
  @function createSegment(x,y) -> Element
  @description Slangsegment creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return {Element} met straal R en color SNAKE
*/
function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}
/**
  @function createFood(x,y) -> Element
  @description Voedselelement creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return {Element} met straal R en color FOOD
*/
function createFood(x, y) {
	return new Element(R, x, y, FOOD);
}


/**
  @function getRandomInt(min: number, max: number) -> number
  @description Creeren van random geheel getal in het interval [min, max]
  @param {number} min een geheel getal als onderste grenswaarde
  @param {number} max een geheel getal als bovenste grenswaarde (max > min)
  @return {number} een random geheel getal x waarvoor geldt: min <= x <= max
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
  @function createFoods() -> array met food
  @description [Element] array van random verdeelde voedselpartikelen
  @return [Element] array met food
*/
function createFoods() {   
   let  i = 0,
        food,
        tempFoods = [];
   //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
   while (i < numfoods ) {
     const xsteps = (xMax - (2 * XMIN)) / STEP
     const xval = XMIN + (getRandomInt(0, xsteps) * STEP);
     const ysteps = (yMax - (2 * YMIN)) / STEP;
     const yval = YMIN + (getRandomInt(0, ysteps) * STEP);
     food = createFood(xval, yval);
     if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(tempFoods) ) {
         tempFoods.push(food);
       i++
     }
   }
   return tempFoods;
}

/**
 * @function stop
 * @description Stopt de timer. En dus ook het spel. Maakt alle tekstvelden leeg. En toont een bericht.
 */
function stop() {
    clearInterval(snakeTimer);
    // TODO toon score ?
}

/**
 * @function checkGameIsOver
 * @description Kijkt of de slang gebotst heeft met zichzelf of dat al het voedsel op is.
 */
function checkGameIsOver(){
    // checkt alleen of de slang bots met 4e segment of meer
    // minder is gewoon niet mogelijk
    if(snake.segments.length > 4){
        const botsBareSlang = snake.segments.slice(0,-4);
        if (snake.head.collidesWithOneOf(botsBareSlang)){
            textMessage("Je hebt de slang geraakt!", 'GAMEOVER');
            stop();
        }
    }

    if (foods.length === 0) {
        textMessage("Al het voedsel is weg! Je hebt gewonnen!!", 'WINNING');
        stop();
    }
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

export {checkGameIsOver}