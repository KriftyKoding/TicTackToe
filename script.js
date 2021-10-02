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
            winCheck();
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

    function winCheck() {
        let cubeContainer = []
        let cube = {
            create: function (name, validIndicator, playerMark, beenPlayed) {
                var instance = Object.create(this);
                instance.name = name;
                instance.validIndicator = validIndicator;
                instance.playerMark = playerMark;
                instance.beenPlayed = beenPlayed;
                return instance;
            }
        }

        for (let i = 0; i < square.length; i++) {
            let cubeObject = cube.create(i, !(square[i].classList.contains("validTurn")), (square[i].innerHTML), (square[i].classList.contains("played")));
            cubeContainer.push(cubeObject);
        }

        function squareToCheck(num) {
            return (cubeContainer[num].validIndicator && cubeContainer[num].playerMark == player);
        }

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
            alert("tie");
        }else if (result == "victory") {
            alert("'victory");
        } else {
            console.error("ERROR gameBoard.winCheck.gameOver ERROR");
        }

    }

})();