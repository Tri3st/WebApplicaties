// Hier komt de code voor de pagina te staan

const myButtons = [
    {
        id: 1,
        name: 'Welkom',
        ref: './welkom.html'
    },
    {
        id: 2,
        name: 'Inloggen',
        ref: './inloggen.html'
    },
    {
        id: 3,
        name: 'Snake',
        ref: './snake.html'
    },
    {
        id: 4,
        name: 'Sudoku',
        ref: './sudoku.html'
    },
    {
        id: 5,
        name: 'Boter-Kaas-Eieren',
        ref: './bke.html'
    },
    {
        id: 6,
        name: 'Galgje',
        ref: './galgje.html'
    },

]

$( document ).ready(() => {
    console.log('READY!');
});


const buttons = $('.nav');
const iframe = $('#iframe1');
const breadcrumbs = $('.crumb');
buttons.click((button) => {
    // zet de iframe op de juiste html pagina
    const index = myButtons.findIndex((el) => el.name === button.target.text);
    console.log(index);
    iframe.attr('src', myButtons[index].ref);

    // pas de breadcrumbs aan
    breadcrumbs.removeClass("active-crumb");
    const activeCrumb = breadcrumbs[index];


    activeCrumb.addClass("active-crumb");
    console.log(activeCrumb);

    // Pas de header aan van de content frame
    $('.content-header').text(myButtons[index].name);
})
