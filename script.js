let gameStatus = (function () {
    //player objects
    let player = {
        create: function(name, symbol, score) {
            let instance = Object.create(this);
            instance.name = name;
            instance.symbol = symbol;
            instance.score = score;
            return instance;
        }
    }
    

    let player1 = player.create("Player 1", "X", 0)
    let player2 = player.create("Player 2", "O", 0)
    let playerTurn = (player1.name.name);
    // console.log(player1.name);

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
        pubsubs.emit("playerChange", playerTurn);
    }

    function changePlayerIndicator(indicator) {
        playerIndicator.innerHTML = indicator.name;
    }

    function startGame() {
        console.log("start game");
        playerTurn = player1;
        pubsubs.emit('gameStart', true)
        changePlayerIndicator(playerTurn);
        pubsubs.emit("playerChange", playerTurn);
        hideToggle();
    }

    function hideToggle() {
        playerIndicator.classList.toggle("hide");
        startBTTN.classList.toggle("hide");

    }
})();




let gameBoard = (function () {
    let player

    //Dom Element
    let square = document.querySelectorAll(".game-square");

    //Bind pudsub
    pubsubs.on('gameStart', startGame)
    pubsubs.on("playerChange", changePlayer)

    function changePlayer(newPlayer) {
        player = newPlayer.symbol;
    }

    function hover() {
        // console.log('hover');
        changeSquareDisplay(this, player);
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
            pubsubs.emit('validTurn', true);
            this.removeEventListener("mouseover", hover);
        }
    }

    function changeSquareDisplay(squareElement, display) {
        squareElement.innerHTML = display;
    }

    function startGame() {
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