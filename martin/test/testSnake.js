import * as snake from '../js/presenter/snake.js';

QUnit.module("Test Snake Functionaliteiten");

QUnit.test("of het Snake segment creeert.", (assert) => {
    const SNAKE = "Darkred",  R = 10, width = 200, height = 200;

    let segments = [new snake.Element(10, 110, 110, "Darkred"),
        new snake.Element(10, 110, 90, "Darkred")];

    const expectedSnake = new snake.Snake(segments);

    console.log(expectedSnake);

    const actualSnake = snake.createStartSnake();

    console.log(actualSnake);

   assert.deepEqual(expectedSnake, actualSnake);
});