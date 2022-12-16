// Hier komt de code voor de pagina te staan

const myButtons = [
    {
        id: 1,
        buttonId: 'button1',
        name: 'Welkom',
        ref: './welkom.html'
    },
    {
        id: 2,
        buttonId: 'button2',
        name: 'Inloggen',
        ref: './inloggen.html'
    },
    {
        id: 3,
        buttonId: 'button3',
        name: 'Snake',
        ref: './snake.html'
    },
    {
        id: 4,
        buttonId: 'button4',
        name: 'Boter, Kaas en Eieren',
        ref: './bke.html'
    },
    {
        id: 5,
        buttonId: 'button5',
        name: 'Sudoku',
        ref: './sudoku.html'
    },
    {
        id: 6,
        buttonId: 'button6',
        name: 'Mastermind',
        ref: './mastermind.html'
    },
    {
        id: 7,
        buttonId: 'button7',
        name: 'Galgje',
        ref: './galgje.html'
    },
    {
        id: 8,
        buttonId: 'button8',
        name: 'Cryptogram',
        ref: './crypto.html'
    },

]

$( document ).ready(() => {
    console.log('READY!');


    const buttons = $('.nav');
    const iframe = $('#iframe1');
    const breadcrumbs = $('.crumb');

    console.log(breadcrumbs)

    buttons.click((button) => {
        // zet de iframe op de juiste html-pagina
        console.log(button);
        console.log(button.target.id);

        const index = myButtons.findIndex((el) => el.buttonId === button.target.id);
        console.log(index);
        iframe.attr('src', myButtons[index].ref);

        // pas de breadcrumbs aan
        breadcrumbs.removeClass("active-crumb");

        const activeCrumb = breadcrumbs[index];
        console.log(activeCrumb)

        // activeCrumb.addClass("active-crumb");


        // Pas de header aan van de content frame
        $('.content-header').text(myButtons[index].name);
    })
});