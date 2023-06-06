import {showMessage} from "../view/snakeView.js";
/**
 * @module snake
 * @description Module met functies, klassen en hulpfuncties voor de snake pagina.
 */

const R        = 10,          // straal van een element
      STEP     = 2*R,         // stapgrootte
                              // er moet gelden: WIDTH = HEIGHT
      LEFT     = "left",      // bewegingsrichtingen 
      RIGHT    = "right",
      UP       = "up",
      DOWN     = "down",

      NUMFOODS = 15,          // aantal voedselelementen       

      XMIN     = R,           // minimale x waarde 
      YMIN     = R,           // minimale y waarde 
	  
	  SLEEPTIME = 500,        // aantal milliseconde voor de timer

      SNAKE   = "DarkRed" ,    // kleur van een slangsegment
      FOOD    = "Olive",       // kleur van voedsel
	  HEAD    = "DarkOrange",  // kleur van de kop van de slang
      MAINTEXT = "Black",
      ALERTTEXT = "Red",
      MAIN_BG = 'Gray'
	
var snake,
	foods = [],		          // voedsel voor de slang
	width,                    // breedte van het tekenveld
	height,                   // hoogte van het tekenveld
	xMax,                     // maximale waarde van x = width - R
	yMax,                     // maximale waarde van y = height - R
    snakeTimer,
	direction = UP;

$( document ).ready(() => {
	$("#startSnake").click(init);
	$("#stopSnake").click(stop);
})


/**
 * @function init()
 * @description Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang,
 *       genereer voedsel, en teken alles
*/
function init() {
    console.log("inside INIT()");
    drawTable();
    width = $('#mySnakeCanvas')[0].width;
    height = $('#mySnakeCanvas')[0].height;
    xMax = width - R;
    yMax = height - R;
	snake = createStartSnake();
    foods = createFoods();
    jQuery(document).keydown(function(e) {
        $('.pijl').removeClass('pijl-aktief');
        switch(e.which) {
            case 37:
                if (direction !== RIGHT){
                    direction = LEFT;
                    $('#pijl-links').addClass('pijl-aktief');
                }
                break;
            case 38:
                if (direction !== DOWN) {
                    direction = UP;
                    $('#pijl-omhoog').addClass('pijl-aktief');
                }
                break;
            case 39:
                if (direction !== LEFT) {
                    direction = RIGHT;
                    $('#pijl-rechts').addClass('pijl-aktief');
                }
                break;
            case 40:
                if (direction !== UP){
                    direction = DOWN;
                    $('#pijl-omlaag').addClass('pijl-aktief');
                }
                break;
        }
    });
    snakeTimer = setInterval(() => {
        move(direction);
    }, SLEEPTIME);

    // lees events (keypress) en beweeg slang in de juiste richting


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
        draw();
	}
	else {
		console.log("snake cannot move " + direction);
        clearInterval(snakeTimer);
	}
}


/***************************************************************************
 **                 Constructors                                          **
 ***************************************************************************/
/**
   @constructor Snake
   @description Klasse Snake met 2 functies:
                    - canMove : controlleer of slang niet van het canvas af loopt.
                    - doMove  : doe de beweging
   @param {array} segments een array met aaneengesloten slangsegmenten
                   Het laatste element van segments wordt de kop van de slang 
*/ 
function Snake(segments) {
    this.segments = segments;
    this.head = segments[segments.length - 1];
    this.head.color = HEAD;
    this.tail = segments[0];
    this.tail.color = SNAKE;
    this.direction = direction;
    this.canMove = function(direction) {
        let head2 = Object.assign({}, this.head);
        switch (direction) {
            case UP:
                return head2.y - STEP >= YMIN;
            case DOWN:
                return head2.y + STEP <= yMax;
            case LEFT:
                return head2.x - STEP >= XMIN;
            case RIGHT:
                return head2.x + STEP <= xMax;
        }
    }
    this.doMove = function(direction) {
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
        // TODO als de slang zichzelf raakt (bijv als deze heel lang is)
        if (this.head.collidesWithOneOf(foods)) {
            const foodIndex = foods.findIndex((food) => food.x === head.x && food.y === head.y);
            foods.splice(foodIndex, 1);
        } else {
           this.segments.shift();
        }
        this.tail = this.segments[0];
        this.head.color = HEAD;
        checkGameIsOver();
  }
    this.toString = function () {
        return this.segments.join(" - ");
    }
}

/**
 * @constructor Element
 * @description Klasse Element (segment van slang of food) met 1 functie:
 *              - collidesWithOneOf : controlleert of het element met één van de
 *                                    meegegeven elementen botst.
 *
 * @param {number} radius straal
 * @param {number} x x-coordinaat middelpunt
 * @param {number} y y-coordinaat middelpunt
 * @param {string} color kleur van het element
*/ 
function Element(radius, x, y, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.color = color;
    this.collidesWithOneOf = function(elements) {
        let result = false;
        elements.forEach((element) => {
            if (Math.abs(this.x - element.x) === 0 && Math.abs(this.y - element.y) === 0) {
                console.debug("COLLISSION WITH FOOD element ", element.x, element.y)
                result = true;
            }
        })
        return result;
    }
    this.toString = function () {
        return `(${this.x},${this.y})`;
    }
}
/***************************************************************************
 **                 Hulpfuncties                                          **
 ***************************************************************************/
 
/**
  @function createStartSnake() -> Snake
  @description Slang creëren, bestaande uit  twee segmenten,
               in het midden van het veld
  @return: slang volgens specificaties
*/
function createStartSnake() {
	var segments   = [createSegment(R + width/2, R + height/2),
	                  createSegment(R + width/2, height/2 - R)];
     return new Snake(segments);
}
/**
  @function createSegment(x,y) -> Element
  @description Slangsegment creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color SNAKE
*/
function createSegment(x, y) {
	return new Element(R, x, y, SNAKE);
}
/**
  @function createFood(x,y) -> Element
  @description Voedselelement creeren op een bepaalde plaats
  @param {number} x x-coordinaat middelpunt
  @param {number} y y-coordinaart middelpunt
  @return: {Element} met straal R en color FOOD
*/
function createFood(x, y) {
	return new Element(R, x, y, FOOD);
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
   var  i = 0,    
        food,
        tempFoods = [];
   //we gebruiken een while omdat we, om een arraymethode te gebruiken, eerst een nieuw array zouden moeten creëren (met NUMFOODS elementen)
   while (i < NUMFOODS ) {
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

function stop() {
    clearInterval(snakeTimer);
}

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
    showMessage(head, message);
}

/**
 * @function drawTable
 * @description Tekent de tabel voor de scores dynamisch. Haalt tevens de data uit de API (voor nu uit een data
 *              file).
 */
function drawTable() {
    const scores = getScores()
        .then(() => {
            showScoreboard(scores);
        })
        .catch((err) => console.log("Er was een fout in drawTable : ", err))
}

/**
 * @function getScores
 * @description haalt de scores uit de API (in dit geval van disk) en zet ze
 *              in een array van Objecten met de vorm :
 *              {string} name, {number} score, {date} date
 * @returns {Array} scores (array van score objecten)
 */
async function getScores () {
    const response = await fetch('../js/model/scores.json', {
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

function formatDate (someDate) {
    let tempDate = someDate.split("T")
    tempDate = tempDate[0].split("-");
    return `${tempDate[2]}-${tempDate[1]}-${tempDate[0]}`;
}