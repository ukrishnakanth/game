$(document).ready(function () {
    constructGame();

    $("#reset").click(function () {
        location.reload();
    });
});


var players = {
    PLAYER_A: "X",
    PLAYER_B: "O"
}



var currentPlayer = players.PLAYER_A;

function constructGame() {
    var board = generateCells();
    var clock;
    var dashborad = document.getElementById('dashboard').addEventListener('click', function (evt) {
        var selectedCell = board.find(function (item) {
            return item.id == evt.target.id;
        });
        if (!selectedCell.value) {
            selectedCell.updateCell(evt.target.id, currentPlayer);
            if (clock)
                clearInterval(clock);
            clock = timer();
            if (isGameOver(board)) {
                clearInterval(clock);
            }
            togglePlayer();
        }



    });
}

function Cell(id) {
    this.id = id;
    this.value = "";
    this.select = function (symbol) {

    }
    this.updateCell = function (id, value) {
        this.value = value;
        document.getElementById(id).innerText = value;
    }
}

function generateCells() {
    var cells = [];
    for (let index = 0; index < 9; index++) {
        cells.push(new Cell(index));
    }
    return cells;
}

function togglePlayer() {
    return currentPlayer = currentPlayer === players.PLAYER_A ? 'O' : 'X';
}

function isGameOver(b) {
    if (checkHorizontal(b))
        return true;
    if (checkVertical(b))
        return true;
    if (checkDiagonal(b))
        return true;
    if (countMoves())
        return true;

}


function checkHorizontal(b) {
    for (let index = 0; index < b.length; index = index + 3) {
        if (b[index].value === b[index + 1].value && b[index + 1].value === b[index + 2].value && b[index].value != "") {
            $("#" + b[index].id + "," + "#" + b[index + 1].id + "," + "#" + b[index + 2].id).addClass("win");
            setTimeout(function () {
                alert(b[index].value + ' Won');
            }, 10);
            return true;
        }
    }
}

function checkVertical(b) {
    for (let index = 0; index <= 2; index++) {
        if (b[index].value === b[index + 3].value && b[index + 3].value === b[index + 6].value && b[index].value != "") {
            $("#" + b[index].id + "," + "#" + b[index + 3].id + "," + "#" + b[index + 6].id).addClass("win");
            setTimeout(function () {
                alert(b[index].value + ' Won');
            }, 10);
            return true;
        }
    }
}

function checkDiagonal(b) {
    for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
        if (b[i].value !== "" && b[i].value == b[i + j].value && b[i + j].value === b[i + 2 * j].value) {
            $("#" + b[i].id + "," + "#" + b[i + j].id + "," + "#" + b[i + 2 * j].id).addClass("win");
            setTimeout(function () {
                alert(b[i].value + ' Won');
            }, 10);
            return true;
        }
    }
}

var countMoves = (function checkEmptyCell() {
    let moves = 0;
    return function () {
        moves = moves + 1;
        if (moves == 9) {
            setTimeout(function () {
                alert('DRAW');
            }, 10);
            return true;
        }

    }
})();

function timer() {
    let duration = 10;
    let now = 0;
    var x = setInterval(function () {
        var timeLeft = duration - now;
        now = now + 1;
        document.getElementById("timer").innerText = currentPlayer + "=" + timeLeft;
        if (timeLeft < 0) {
            clearInterval(x);
            document.getElementById("timeHeader").innerText = "Time Up";
            setTimeout(function () {
                alert(currentPlayer == "X" ? "O" + ' Won' : "X" + ' Won')
            }, 10)
        }
    }, 1000);
    return x;
}