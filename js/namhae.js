const board = document.getElementById('board');
let positions = [0,1,2,3,4,5,6,7,8].sort(() => Math.random() - 0.5);
let firstPiece = null;

positions.forEach((pos, i) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.correct = i;
    const x = (pos % 3) * -100;
    const y = Math.floor(pos / 3) * -100;
    piece.style.backgroundPosition = `${x}px ${y}px`;
    piece.dataset.current = pos;
    board.appendChild(piece);

    piece.addEventListener('click', () => {
        if (!firstPiece) {
            firstPiece = piece;
            piece.classList.add('selected');
        } else {
            const tempPos = firstPiece.dataset.current;
            const tempBg = firstPiece.style.backgroundPosition;
            firstPiece.dataset.current = piece.dataset.current;
            firstPiece.style.backgroundPosition = piece.style.backgroundPosition;
            piece.dataset.current = tempPos;
            piece.style.backgroundPosition = tempBg;
            firstPiece.classList.remove('selected');
            firstPiece = null;
            checkWin();
        }
    });
});

function checkWin() {
    let isWin = true;
    document.querySelectorAll('.puzzle-piece').forEach(p => {
        if (p.dataset.correct !== p.dataset.current) isWin = false;
    });
    if (isWin) setTimeout(() => winGame('namhae'), 300);
}
