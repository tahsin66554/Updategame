// গেমের স্টেট
const board = document.getElementById('board');
const diceResult = document.getElementById('diceResult');
const status = document.getElementById('status');
const rollDiceBtn = document.getElementById('rollDiceBtn');

// প্লেয়ারদের স্টেট
const players = [
    { name: "Red", color: "red", position: 0, piece: null },
    { name: "Blue", color: "blue", position: 0, piece: null },
    { name: "Green", color: "green", position: 0, piece: null },
    { name: "Yellow", color: "yellow", position: 0, piece: null }
];

let currentPlayer = 0; // প্রথম প্লেয়ার

// বোর্ড তৈরি করা
function createBoard() {
    for (let i = 0; i < 225; i++) {
        const square = document.createElement('div');
        square.setAttribute('id', 'square' + i);
        board.appendChild(square);
    }

    // গেম পিসের জন্য এলিমেন্ট তৈরি
    players.forEach(player => {
        const piece = document.createElement('div');
        piece.classList.add('player-piece');
        piece.style.backgroundColor = player.color;
        player.piece = piece;
        document.getElementById('square' + player.position).appendChild(piece);
    });
}

// ডাইস রোল ফাংশন
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// গেমের নিয়ম অনুযায়ী প্লেয়ার পজিশন আপডেট
function movePlayer() {
    const dice = rollDice();
    diceResult.textContent = `Dice Result: ${dice}`;
    const player = players[currentPlayer];

    player.position += dice;

    // যদি গেম শেষ না হয়
    if (player.position >= 224) {
        player.position = 224; // শেষ স্কয়ারে পৌছানো
        status.textContent = `${player.name} Wins!`;
    }

    // নতুন পজিশনে প্লেয়ার পিস আপডেট
    updateBoard();
}

// বোর্ডে পজিশন আপডেট করা
function updateBoard() {
    players.forEach(player => {
        // প্রতিটি প্লেয়ারের পিসের বর্তমান পজিশন অনুযায়ী আপডেট
        const square = document.getElementById('square' + player.position);
        square.appendChild(player.piece);
    });
}

// পরবর্তী প্লেয়ারে স্যুইচ করা
function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    status.textContent = `${players[currentPlayer].name}'s Turn`;
}

// ডাইস রোল বোতাম ক্লিক করা হলে
rollDiceBtn.addEventListener('click', function () {
    movePlayer();
    if (status.textContent.indexOf("Wins") === -1) {
        nextPlayer();
    }
});

// গেম শুরু
createBoard();
status.textContent = `${players[currentPlayer].name}'s Turn`;
