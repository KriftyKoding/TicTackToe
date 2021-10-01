let gameStatus = (function () {
    let player1 = 'Player 1';
    let player2 = 'Player 2';
    let playerTurn = player1;

    //Dom Elements
    let playerIndicator = document.getElementById("player-indicator").children[1]
    let startBTTN = document.getElementById("player-indicator").children[0]

    //bind
    pubsubs.on('validTurn', playerToggle)
    pubsubs.on('startBTTNClick', startGame)


    function playerToggle() {
        if (playerTurn == player1) {
            playerTurn = player2;
        } else if (playerTurn == player2) {
            playerTurn = player1;
        } else {
            console.error("player not expected");
            return;
        }
        changePlayerIndicator(playerTurn);
    }

    function changePlayerIndicator(indicator) {
        playerIndicator.innerHTML = indicator;
        pubsubs.emit("playerChange", [playerTurn, player1, player2]);
    }

    function startGame() {
        console.log("start game");
        playerTurn = player1;
        pubsubs.emit('gameStart', true)
        changePlayerIndicator(playerTurn);
        hideToggle();
    }

    function hideToggle() {
        playerIndicator.classList.toggle("hide");
        startBTTN.classList.toggle("hide");

    }
})();




let gameBoard = (function () {
    let validTurn = false;
    let player

    //Dom Element
    let square = document.querySelectorAll(".game-square");

    //Bind pudsub
    pubsubs.on('gameStart', forEachSquare)
    pubsubs.on("playerChange", changePlayer)

    function changePlayer(newPlayer) {
        if (newPlayer[0] == newPlayer[1]) {
            player = "X"

        } else if (newPlayer[0] == newPlayer[2]) {
            player = "O"
        } else {
            console.error("gameBoard.changePlayer unexpected results");
        }

        console.log(player);
    }

    function hover() {
        // console.log('hover');
        changeSquare(this, player);
        hoverToggle(this);
    }

    function unhover() {
        hoverToggle(this);
    }

    function hoverToggle(element) {
        element.classList.toggle("unhover")
        element.classList.toggle("hover")
    }

    function click() {
        let eClassList = this.classList

        if (eClassList.contains("validTurn")) {
            eClassList.add('played');
            eClassList.remove("validTurn");
            pubsubs.emit('validTurn', true)
        }
    }

    function changeSquare(squareElement, display) {
        squareElement.innerHTML = display;
    }

    function forEachSquare() {
        square.forEach((square) => {
            // clearSquare(square)
            square.classList.add("unhover", "validTurn")
            eventListener();
        });
    }

    function eventListener() {
        square.forEach((square) => {
            square.addEventListener("mouseover", hover);
            square.addEventListener("click", click);
            square.addEventListener("mouseout", unhover);
        });
    }
})();