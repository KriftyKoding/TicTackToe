let gameStatus = (function () {
    let player1 = 'Player 1';
    let player2 = 'Player 2';
    let playerTurn = player1;

    let playerIndicator = document.getElementById("player-indicator")
    //  ///////////////////////// MATT //////////////////////////////////////
    function startBTTN() {
        playerIndicator.children[0].addEventListener("click", () => {
        startGame();
        console.log("blah");
    });}

    function playerToggle() {
        console.log("playerToggle");
        if (playerTurn == player1) {
            playerTurn = player2;
        } else if (playerTurn == player2) {
            playerTurn = player1;
        } else {
            console.error("player not expected");
            return;
        }
        changePlayerIndicator();
    }

    function changePlayerIndicator() {
        playerIndicator.innerHTML = playerTurn
    }

    function startGame() {
        console.log("start game");
        playerTurn = player1;
        gameBoard.gameStartToggle(true);
        changePlayerIndicator();

        gameBoard.clearAllSquare();
    }

    return {
        startBTTN: startBTTN,
        // startGame: startGame,
        playerToggle: playerToggle,
    }
})();
gameStatus.startBTTN();


let gameBoard = (function () {
    let validTurn = false;
    let square = document.querySelectorAll(".game-square");
    let gameStart = false;

    function hover() {
        console.log('hover');
    }

    function unhover() {
        console.log('unhover');
    }

    function click() {
        console.log('click');
        validTurnCheck();
    }

    function gameStartToggle(indicator){
        if (indicator == true) {
            gameStart = true;
        }else if(indicator == false) {
            gameStart = false;
        }else {
            console.error("game stat indicator unexpected");
            return;
        }
    }

    function clearSquare(squareElement) {
        squareElement.innerHTML = ""
    }

    function clearAllSquare(squareElement) {
        square.forEach((square) => {
            clearSquare(square)
        });
    }

    square.forEach((square) => {
        square.addEventListener("mouseover", hover);
        square.addEventListener("click", click);
        square.addEventListener("mouseout", unhover);

    });

    function validTurnCheck() {
        if (gameStart == false) {
            console.log("game not yet started");
        } else if (gameStart == true) {
            validTurnToggle();
        } else {
            console.error("validTurnCheck not expected")
        }
    }


    function validTurnToggle() {
        console.log("validTurnToggle");
        if (validTurn == false) {
            validTurn = false
        } else if (validTurn == true) {
            validTurn = false
        } else {
            console.error("validTurn not expected")
            return;
        }
        gameStatus.playerToggle();
    }

    return {
        clearAllSquare: clearAllSquare,
        gameStartToggle: gameStartToggle,

    }
})();