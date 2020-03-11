const DOM = {
    board: "#game-board",
    menu: "#menu-overlay",
    pForm: "#player-form",
    pName: "#player-name",
    pColor: "#player-color",
    gForm: "#game-form"
}

class Game {
    constructor() {
        this.current_player = 1;
        this.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,2,2,1,0],[0,0,1,2,1,2,0]];
        UI.renderBoard(this);
        Game.getPlayers();
    }

    static play() {

    }

    static getPlayers(){
        this.p1 = new Player;
        // this.p2 = new Player;  <-- Uncomment when getting one player's info works!
    }
}

class Player {
    constructor() {
        UI.toggleVisibility(DOM.menu);
        UI.toggleVisibility(DOM.pForm);
        this.name = "John F";
        this.color = {r:0,g:0,b:0};
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

    static toggleVisibility(selector) {
        let element = document.querySelector(selector);
        if (!element) {
            console.error(`Cannot find element with selector: ${selector}`)
            return;
        }
        
        let displayStyle = getComputedStyle(element).display;
        let test = element.style;
        alert(test);
        if(displayStyle != "none"){
            element.style.display = "none";
        } else {
            element.style.display = "";
        }
    }
}

let connectFour = new Game;

