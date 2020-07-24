const root = document.documentElement;
const grid = document.querySelector('#grid');
const clearButton = document.querySelector('#clear-screen');
const newGridButton = document.querySelector('#new-grid');
const colorButton = document.querySelector('#favcolor');

clearButton.addEventListener('click', clearScreen);
newGridButton.addEventListener('click', makeNewGrid);
colorButton.addEventListener('input', activateScreen);

function makeGrid() {
    let num = parseInt(getComputedStyle(root).getPropertyValue('--number-rows'));
    for (let i=0; i < num*num; i++) {
        let divChild = document.createElement('div');
        divChild.classList.add('box');
        grid.appendChild(divChild);
    }
}

function deleteGrid() {
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }
}

function getDivs() {
    const divList = Array.from(document.querySelectorAll('.box'));
    return divList;
}

function activateScreen() {
    let divList = getDivs();
    divList.forEach(div => div.addEventListener('mouseover', changeColor));
}

function changeColor() {
    let color = getUpdatedColor();
    this.style.backgroundColor = color;
}

function clearScreen() {
    const divList = getDivs();
    divList.forEach(div => div.style.backgroundColor = 'white');
}

function makeNewGrid() {
    let input = getUserInput();
    setUserInput(input);
    deleteGrid();
    makeGrid();
    clearScreen();
    activateScreen();
}

function getUserInput() {
    let input = parseInt(window.prompt('How many squares do you want per side? (Enter between 1 and 100)'));
    while (input < 1 || input > 100 || isNaN(input)) {
        input = parseInt(window.prompt('Please enter a number between 1 and 100'));
    }
    return input;
}

function setUserInput(input) {
    root.style.setProperty('--number-rows', input);
}

function getUpdatedColor() {
    let color = colorButton.value;
    return color;
}

makeGrid();
activateScreen();