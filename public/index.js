const DOM = {
    board: "#game-board"
}

class Game {
    constructor() {
        this.current_player = 1;
        this.board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,1,2,2,1,0],[0,0,1,2,1,2,0]];

    }
}

class Player {
    constructor() {
        this.name = ""
        this.color = {r:0,g:0,b:0}
    }
}

class UI {
    static showBoard(game) {
        let gameBoard = document.querySelector(DOM.board);
        game.board.forEach(row => {
            row.forEach(owner => {
                let space = document.createElement("div");
                
                space.classList = "piece";
                
                if (owner == 1) {
                    space.style.backgroundColor = "blue";
                } else if (owner == 2) {
                    space.style.backgroundColor = "red";
                }

                gameBoard.appendChild(space);
            })
        });
    }
}

let firstGame = new Game;
UI.showBoard(firstGame);

