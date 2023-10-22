/**
 * @module element
 * @description KLasse Element
 */

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
    /** Straal van het Element */
    this.radius = radius;
    /** de x coordinaat */
    this.x = x;
    /** de y coordinaat */
    this.y = y;
    /** De kleur die het element krijgt */
    this.color = color;
    /**
     * Check of een dit element met andere elementen botst
     * @param {Element[]} elements om op te checken of dit element botst
     * @return {boolean} true als dit element botst, anders false
     */
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
    /** String representatie */
    this.toString = function () {
        return `(${this.x},${this.y})`;
    }
}

export {Element};