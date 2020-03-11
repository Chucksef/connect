var mainGame;

const DOM = {
    board: "#game-board",
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
    output_p1Name: "#player1-name",
    output_p2Name: "#player2-name",
}

class Game {
    constructor() {
        this.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,2,2,1,0],[0,0,1,2,1,2,0]];
        this.players = [];
        UI.renderBoard(this);
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
        } else {
            document.querySelector(DOM.output_p1Name).innerHTML = this.players[0].name;
            document.querySelector(DOM.output_p2Name).innerHTML = this.players[1].name;
        }
    }

    takeTurn(space) {

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
    }
    
    getName() {
        this.name = document.querySelector(DOM.input_PlayerName).value;
        UI.hide(DOM.menu_Player);
        UI.hide(DOM.menu_Overlay);
        mainGame.addPlayer(this);
    }
}

class UI {
    

    static renderBoard(game) {
        let gameBoard = document.querySelector(DOM.board);
        game.board.forEach(function(row, index_row) {
            row.forEach(function(owner, index_col) {
                let space = document.createElement("div");
                
                space.style.gridColumnStart = index_col+1;
                space.style.gridRowStart = index_row+1;
                space.classList = "piece";
                space.id = `${index_col}${index_row}`
                // space.addEventListener('click', function(e){
                //     alert(e.target.id);
                // })
                
                if (owner == 1) {
                    space.style.backgroundColor = "blue";
                } else if (owner == 2) {
                    space.style.backgroundColor = "red";
                }

                gameBoard.appendChild(space);
            })
        });
    }

    static clearBoard() {
        let gameBoard = document.querySelector(DOM.board);
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

    static toggleVis(selector) {
        let element = document.querySelector(selector);
        if (!element) {
            console.error(`Cannot find element with selector: ${selector}`)
            return;
        }
        
        let displayStyle = getComputedStyle(element).display;
        if(displayStyle != "none"){
            element.style.display = "none";
        } else {
            element.style.display = "";
        }
    }
}

// Add Event Listeners
document.querySelector(DOM.btn_HumanOpponent)

document.querySelector(DOM.btn_PlayGame).addEventListener('click', function() {
    mainGame = new Game;
})
