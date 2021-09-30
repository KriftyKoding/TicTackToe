let player1 = 'Player 1';
let player2 = 'Player 2';
let playerTurn = player1;
let validTurn = false;
let gameStart = false;

// let square = document.getElementById("square1")
// let square = document.getElementsByClassName("game-square")
let square = document.querySelectorAll(".game-square")
let playerIndicator = document.getElementById("player-indicator")

let squareLetter = square.innerHTML

function hover () {
    console.log('hover');
    }

function unhover () {
    console.log('unhover');
}

function click() {
    console.log('click');
    validTurnCheck();

}

function clearSquare(squareElement) {
    squareElement.innerHTML = ""
}


function playerToggle() {
    console.log("playerToggle");
    if (playerTurn == player1) {
        playerTurn = player2
    }else if (playerTurn == player2) {
        playerTurn = player1
    }else {
        console.error("player not expected")
        return;
    }
    changePlayerIndicator();
}

function changePlayerIndicator() {
    playerIndicator.innerHTML = playerTurn
}

square.forEach((square) => {
    square.addEventListener("mouseover", hover);
    square.addEventListener("click", click);
    square.addEventListener("mouseout", unhover);

});

function starGame() {
    console.log("start game");
    playerTurn = player1;
    gameStart = true;
    changePlayerIndicator();

    square.forEach((square) => {
        clearSquare(square)
    });

}


function validTurnCheck(){
    if (gameStart == false){
        console.log("game not yet started");
    }else if (gameStart == true){
        validTurnToggle ();
    }else {
        console.error("validTurnCheck not expected")
    }
}


function validTurnToggle () {
    console.log("validTurnToggle");
    if (validTurn == false) {
        validTurn = false
    }else if (validTurn == true) {
        validTurn = false
    }else {
        console.error("validTurn not expected")
        return;
    }
    playerToggle();
}







