export function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

export function movePiece(piece, steps) {
    piece.position.x += steps;
}

export function aiMove(pieces) {
    let bestPiece = pieces[Math.floor(Math.random() * pieces.length)];
    let diceRoll = rollDice();
    movePiece(bestPiece, diceRoll);
}
