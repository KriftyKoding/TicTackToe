function restart() {
    location.reload();
}

let gameStatus = (function () {

    //player objects
    let player = {
        create: function (name, symbol, score) {
            let instance = Object.create(this);
            instance.name = name;
            instance.symbol = symbol;
            instance.score = score;
            return instance;
        }
    }
    let player1 = player.create("Player", "X", 0)
    let player2 = player.create("Player", "O", 0)
    let playerTurn = (player1.name);


    //Dom Elements
    let playerIndicatorContainer = document.getElementById("player-indicator");
    let playerIndicator = playerIndicatorContainer.children[1]
    let useInputForm = playerIndicatorContainer.children[2]
    let playGameBTTN = playerIndicatorContainer.children[0]
    let restart = playerIndicatorContainer.children[3]


    //pubsubs.on
    pubsubs.on('validTurn', playerToggle);
    pubsubs.on('startBTTNClick', startGame);
    pubsubs.on("playGame", playGame);
    pubsubs.on("victory", winCalculator);

    function playGame() {
        addHideClass(playGameBTTN);
        removeHideClass(useInputForm);
    }

    function startGame() {
        player1.name = useInputForm.children[0].value;
        player2.name = useInputForm.children[1].value;
        playerTurnCalc();
        changePlayerIndicator(playerTurn);
        addHideClass(useInputForm);
        removeHideClass(playerIndicator);
        removeHideClass(restart);
        pubsubs.emit('gameStart', true);
        pubsubs.emit("playerChange", playerTurn);
    }

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
        playerIndicator.innerHTML = indicator.name + ` (${indicator.symbol})`;
    }


    function playerTurnCalc() {
        let indicator = Math.ceil(Math.random() * 2);

        if (indicator == 1) {
            playerTurn = player1
        } else if (indicator == 2) {
            playerTurn = player2
        } else {
            console.error("gameStatus.playerTurnCalc");
        }
    }

    function addHideClass(element) {
        element.classList.add("hide");
    }

    function removeHideClass(element) {
        element.classList.remove("hide");
    }

    function winCalculator(playerSymbol) {

        if (playerSymbol == player1.symbol) {
            player1.score++
            console.log(player1.score);
        } else if (playerSymbol == player2.symbol) {
            player2.score++
            console.log(player2.score);
        } else {

            console.error("#gameStatus.winCalculator");
        }

        let playerArray = {
            player1: player1,
            player2: player2,
        }
        pubsubs.emit("winUpdate", playerArray)
    }
})();




let gameBoard = (function () {
    let player
    let player1
    let player2

    //Dom Element
    let square = document.querySelectorAll(".game-square");

    //Bind pudsub
    pubsubs.on('gameStart', startGame)
    pubsubs.on("playerChange", changePlayer)
    pubsubs.on("winUpdate", winUpdate)

    function winUpdate(playerArray) {
        console.log(playerArray.player1);
        player1 = playerArray.player1;
        player2 = playerArray.player2;
    }

    function changePlayer(newPlayer) {
        player = newPlayer.symbol;
    }
    
    function startGame() {
        square.forEach((square) => {
            square.classList.add("validTurn")
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
    
    function hover() {
        this.innerHTML = player;
        this.classList.add("hover");
    }

    function unhover() {
        this.classList.remove("hover")
    }

    function click() {
        let eClassList = this.classList

        if (eClassList.contains("validTurn")) {
            this.removeEventListener("mouseover", hover);
            eClassList.remove("validTurn", "hover");
            winCheck();
            pubsubs.emit('validTurn', true);
        }
    }
    
    function winCheck() {
        let cubeContainer = []
        let cube = {
            create: function (validIndicator, playerMark) {
                var instance = Object.create(this);
                instance.validIndicator = validIndicator;
                instance.playerMark = playerMark;
                return instance;
            }
        }

        for (let i = 0; i < square.length; i++) {
            let cubeObject = cube.create(!(square[i].classList.contains("validTurn")), (square[i].innerHTML));
            cubeContainer.push(cubeObject);
        }
        //if square had been played and it matches current player
        function squareToCheck(num) {
            return (cubeContainer[num].validIndicator && cubeContainer[num].playerMark == player);
        }
        //three in a row check
        //1st square/1row 
        if (squareToCheck(0)) {
            //straight across
            if (squareToCheck(1)) {
                if (squareToCheck(2)) {
                    gameOver("victory");
                    return;
                }
            }
            // down
            if (squareToCheck(3)) {
                if (squareToCheck(6)) {
                    gameOver("victory");
                    return;
                }
            }
            // diagonal
            if (squareToCheck(4)) {
                if (squareToCheck(8)) {
                    gameOver("victory");
                    return;
                }
            }
        }
        //2nd square, 1st Row down
        if (squareToCheck(1)) {
            if (squareToCheck(4)) {
                if (squareToCheck(7)) {
                    gameOver("victory");
                    return;
                }
            }
        }
        //3rd square/1st 
        if (squareToCheck(2)) {
            // down
            if (squareToCheck(5)) {
                if (squareToCheck(8)) {
                    gameOver("victory");
                    return;
                }
            }
            // diagonal
            if (squareToCheck(4)) {
                if (squareToCheck(6)) {
                    gameOver("victory");
                    return;
                }
            }
        }
        //2nd row across 
        if (squareToCheck(3)) {
            if (squareToCheck(4)) {
                if (squareToCheck(5)) {
                    gameOver("victory");
                    return;
                }
            }
        }
        //third row across
        if (squareToCheck(6)) {
            if (squareToCheck(7)) {
                if (squareToCheck(8)) {
                    gameOver("victory");
                    return;
                }
            }
        }
        //tie
        if (cubeContainer.every((eachItem) => eachItem.validIndicator)) {
            gameOver("TIE!!!!");
        }
    }


    function gameOver(result) {
        if (result == "TIE!!!!") {
            alert(`Tie!!!`);
        } else if (result == "victory") {

            pubsubs.emit("victory", player)

            if (player == player1.symbol) {
                alert(`Congrats, ${player1.name}, You where Victorious. Your victory count is ${player1.score} times. ${player2.name} has defeated you ${player2.score} times.`);
            } else if (player == player2.symbol) {
                alert(`Congrats, ${player2.name}, You where Victorious.Your victory count is ${player2.score} times. ${player1.name} has defeated you ${player1.score} times.`);
            } else {
                console.error("winCheck.gameOver.victory");
            }
        } else {
            console.error("ERROR gameBoard.winCheck.gameOver ERROR");
        }

        pubsubs.emit("startBTTNClick", player)
    }
})();