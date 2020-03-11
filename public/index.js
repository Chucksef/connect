var mainGame;

const DOM = {
    // menus
    menu_Game: "#game-form",
    menu_Main: "#main-menu",
    menu_Opponent: "#opponent-options",
    menu_Overlay: "#menu-overlay",
    menu_Player: "#player-form",
    // buttons
    btn_PlayGame: "#play-game-button",
    btn_SaveGameOptions: "#save-game-button",
    btn_SavePlayerOptions: "#save-player-button",
    btn_HumanOpponent: "#human-opponent-button",
    btn_CPUOpponent: "#cpu-opponent-button",
    // inputs
    input_PlayerName: "#player-name",
    input_PlayerColor: "#player-color",
    // outputs
    output_board: "#game-board",
    output_p1Name: "#player1-name",
    output_p2Name: "#player2-name",
}

class Game {
    constructor() {
        this.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
        this.players = [];
        this.currentPlayer = 1;
        UI.hide(DOM.menu_Main);
        new Player;
    }

    addPlayer(player) {
        this.players.push(player);
        if(this.players.length < 2) {
            UI.show(DOM.menu_Overlay);
            UI.show(DOM.menu_Opponent);
            document.querySelector(DOM.btn_HumanOpponent).addEventListener('click', function(){
                UI.hide(DOM.menu_Opponent)
                new Player;
            })
            document.querySelector(DOM.btn_CPUOpponent).addEventListener('click', function(){
                alert('CPU Play current disabled');
            })
            document.querySelector(DOM.btn_HumanOpponent).focus();
        } else {
            UI.renderBoard(this);
        }
    }

    takeTurn(coords) {
        this.board[coords.y][coords.x] = this.currentPlayer;
        this.toggleTurn();
        UI.renderBoard(this);
    }

    toggleTurn() {
        if (this.currentPlayer == 1){
            this.currentPlayer = 2;
        } else {
            this.currentPlayer = 1;
        }
    }

    validMove(coords) {
        // return true if all spaces with identical x and lower y value are 0 AND all higher y values > 0
        
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);

        if ((y < 5 && this.board[y+1][x] != 0) || y == 5) {
            return true;
        }
        return false;
    }

    checkForWinner() {

    }

    end() {

    }

}

class Player {
    constructor() {
        UI.show(DOM.menu_Overlay);
        UI.show(DOM.menu_Player);
        let submitBtn = document.querySelector(DOM.btn_SavePlayerOptions)
        let newSubmitBtn = submitBtn.cloneNode(true);
        submitBtn = document.querySelector(DOM.btn_SavePlayerOptions)
        submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
        document.querySelector(DOM.btn_SavePlayerOptions).addEventListener('click', this.getName);
        document.querySelector(DOM.input_PlayerName).focus();
        
    }
    
    getName() {
        this.name = document.querySelector(DOM.input_PlayerName).value;
        UI.hide(DOM.menu_Player);
        UI.hide(DOM.menu_Overlay);
        UI.clearInput(DOM.input_PlayerName);
        mainGame.addPlayer(this);
    }
}

class UI {

    static clearInput(selector) {
        let element = document.querySelector(selector);
        if (!element) {
            console.error(`Cannot clear the value of element with selector: ${selector}`)
            return;
        } else {
            element.value = "";
        }
    }

    static renderBoard(game) {

        // set up non-board related elements
        document.querySelector(DOM.output_p1Name).innerHTML = game.players[0].name;
        document.querySelector(DOM.output_p2Name).innerHTML = game.players[1].name;

        // actually render the game board
        let gameBoard = document.querySelector(DOM.output_board);
        game.board.forEach(function(row, index_row) {
            row.forEach(function(owner, index_col) {
                let space = document.createElement("div");
                
                // set properties of new 'space' element
                space.style.gridColumnStart = index_col+1;
                space.style.gridRowStart = index_row+1;
                space.classList = "piece";
                space.id = `${index_col}${index_row}`

                
                // store x and y coords as properties of the space
                space.x = space.id[0];
                space.y = space.id[1];
            
                // check if player 1 owns this space
                if (owner == 1) {
                    space.style.backgroundColor = "blue";
                
                // check if player 2 owns this space
                } else if (owner == 2) {
                    space.style.backgroundColor = "red";

                // check if space is considered a valid move
                } else if (game.validMove([space.x, space.y])) {
                    space.style.backgroundColor = "green";

                    // add an on-click event
                    space.addEventListener('click', function(e){
                        game.takeTurn({x: space.x, y: space.y});
                    });
                }

                gameBoard.appendChild(space);
            })
        });
    }

    static clearBoard() {
        let gameBoard = document.querySelector(DOM.output_board);
        gameBoard.innerHTML = '';
    }

    static show(selector) {
        let element = document.querySelector(selector);
        if (!element) {
            console.error(`Cannot find element with selector: ${selector}`)
            return;
        }

        element.style.display = "";
    }

    static hide(selector) {
        let element = document.querySelector(selector);
        if (!element) {
            console.error(`Cannot find element with selector: ${selector}`)
            return;
        }

        element.style.display = "none";
    }
}

// Add Event Listeners
document.querySelector(DOM.btn_HumanOpponent)
document.querySelector(DOM.btn_PlayGame).addEventListener('click', function() {
    mainGame = new Game;
})
