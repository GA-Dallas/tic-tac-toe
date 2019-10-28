// IPO - Input Process Output

// Define Constants and Application State

// Constants

// What is it about my program that won't change?

const KEY = {
    '1': 'X',
    '-1': 'O',
    'null': ''
};

const COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turn, winner, gameboard;

// Cache Element References

const squares = document.querySelectorAll('.square'); // this is the array of div squares
const message = document.getElementById('message');

// Set up event listeners
document.getElementById('gameboard').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', init);
// Add Functions

init();

function init() {
    turn = 1
    gameboard = [null, null, null, 
                null, null, null, 
                null, null, null
                ];
    winner = false;
    render();
}

function handleClick(event) {
    const selected = parseInt(event.target.dataset.index);
    if(winner || gameboard[selected]) return;
    gameboard[selected] = turn;
    turn *= -1
    winner = checkWinner(); // 1 or -1
    render();
}

// The Win Logic
function checkWinner() {
    for(let i = 0; i < COMBOS.length; i++) {
        if(Math.abs(gameboard[COMBOS[i][0]] + 
                    gameboard[COMBOS[i][1]] + 
                    gameboard[COMBOS[i][2]]) === 3) return gameboard[COMBOS[i][0]];
    } if(gameboard.includes(null)) return false;
    return 'T';
}


function render() {
    gameboard.forEach(function(square, idx) {
        squares[idx].textContent = KEY[square]
    });
    if(!winner) {
        message.textContent = `Player ${KEY[turn]}'s turn`;
    } else if(winner === 'T') {
        message.textContent = 'Tie Game';
    } else {
        message.textContent = `Player ${KEY[winner]} wins!`
    }
}