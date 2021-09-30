let playerTurn = 'player1'

// let square = document.getElementById("square1")
// let square = document.getElementsByClassName("game-square")
let square = document.querySelectorAll(".game-square")

let squareLetter = square.innerHTML

function hover () {
    console.log('hover');
    }

    function unhover () {
        console.log('unhover');
    }

    function click() {
        console.log('click');
    }

square.forEach((square) => {

    square.addEventListener("mouseover", hover);
    square.addEventListener("click", click);
    square.addEventListener("mouseout", unhover);

});







