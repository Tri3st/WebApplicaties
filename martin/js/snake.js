import {drawTable} from "./scoreboard.js";
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
      ALERTTEXT = "Red"
	
var snake,
	foods = [],		          // voedsel voor de slang
	width,                    // breedte van het tekenveld
	height,                   // hoogte van het tekenveld
	xMax,                     // maximale waarde van x = width - R
	yMax,                     // maximale waarde van y = height - R
	direction = UP;

	
$(document).ready(function() {
    drawTable();
	$("#startSnake").click(init);
	$("#stopSnake").click(stop);
});

/**
 * @function init()
 * @description Haal eventueel bestaand voedsel en een bestaande slang weg, cre\"eer een slang,
 *       genereer voedsel, en teken alles
*/
function init() {
    width = $('#mySnakeCanvas')[0].width;
    height = $('#mySnakeCanvas')[0].height;
    xMax = width - R;
    yMax = height - R;
	snake = createStartSnake();
    foods = createFoods();
    draw();
    // laat startTekst zien en wacht op eerste keyPress
    const beginText = new textWindow("Klaar om te beginnen.\nDruk pijl om te beginnen.", MAINTEXT);
    beginText.drawWindow();

    // startTimer();
    const pijlLinks = $('#pijl-links').click(goLeft);
    const pijlRechts = $('#pijl-rechts').click(goRight);
    const pijlOmhoog = $('#pijl-omhoog').click(goUp);
    const pijlOmlaag = $('#pijl-omlaag').click(goDown);

    move("UP");

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
	}
}

/**
  @function draw()
  @description Teken de slang en het voedsel
*/
function draw() {
    var myCanvas = $('#mySnakeCanvas').get(0);
    const ctx = myCanvas.getContext('2d');
    for (var i = 0; i < foods.length; i++) {
        var food = foods[i];
        drawElement(food, ctx);
    }
    for (var i = 0; i < snake.segments.length; i++) {
        var segment = snake.segments[i];
        drawElement(segment, ctx);
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
   @param {[Element]} segments een array met aaneengesloten slangsegmenten
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
        var head = this.head;
        switch (direction) {
            case UP:
                return head.y > YMIN;
            case DOWN:
                return head.y < yMax;
            case LEFT:
                return head.x > XMIN;
            case RIGHT:
                return head.x < xMax;
        }
    }
    this.doMove = function(direction) {
        var head = this.head;
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
        this.segments.push(head);
        this.head = this.segments.pop();
        this.head.color = HEAD;
        this.tail.color = SNAKE;
        this.tail = this.segments.shift();
        this.segments.push(this.tail);
        this.tail.color = SNAKE;
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
        elements.forEach((element) => {
            // TODO implement
            if (Math.abs(this.x - element.x) >= 2 * R || Math.abs(this.y - element.y) >= 2 * R) {
                return true;
            }
        })
        return false;
    }
}

/**
 * @constructor textWindow
 * @description Klasse die een tekstvernster laat zien op het beeldscherm.
 *
 * @param {string} text de tekst die weergegeven moet worden.
 * @param {string} color één van de kleur constanten. (MAINTEXT of ALLERTTEXT)
 */
function textWindow(text, color) {
    this.text = text
    this.x = Math.floor(width / 2);
    this.y = Math.floor(height / 2);
    this.color = color;
    this.drawWindow = function() {
        // TODO moet nog even gemaakt worden zodat je meerdere regels kunt meegeven. die dan
        //      mooi onder elkaar neergezet worden.
        var myCanvas = $('#mySnakeCanvas').get(0);
        const ctx = myCanvas.getContext('2d');
        ctx.font = "24px Comic Sans MS";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x, this.y);
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
  @param  {dom object} canvas het tekenveld
*/
 function drawElement(element, context) {
     const x = element.x;
     const y = element.y;
     const radius = element.radius;
     context.fillStyle = element.color;
     context.beginPath();
     context.arc(x, y, radius, 0, (2 * Math.PI), false);
     context.fill();
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
     food = createFood(XMIN + getRandomInt(0, xMax), YMIN + getRandomInt(0, yMax));
     if (!food.collidesWithOneOf(snake.segments) && !food.collidesWithOneOf(tempFoods) ) {
         tempFoods.push(food);
       i++
     }
   }
   return tempFoods;
}

function goLeft() {
    snake.direction = 'LEFT';
}

function goRight() {
    snake.direction = 'RIGHT';
}

function goUp() {
    snake.direction = 'UP';
}

function goDown() {
    snake.direction = 'DOWN';
}
