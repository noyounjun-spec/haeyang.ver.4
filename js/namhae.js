const board = document.getElementById('board');
// 0~8 배열 (8은 빈칸)
let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// 퍼즐을 섞을 때 풀 수 있는 상태로 만들기 위해 유효한 이동만 150번 시뮬레이션
let emptyIdx = 8;
for (let i = 0; i < 150; i++) {
    let validMoves = [];
    let r = Math.floor(emptyIdx / 3);
    let c = emptyIdx % 3;
    if (r > 0) validMoves.push(emptyIdx - 3);
    if (r < 2) validMoves.push(emptyIdx + 3);
    if (c > 0) validMoves.push(emptyIdx - 1);
    if (c < 2) validMoves.push(emptyIdx + 1);
    
    let move = validMoves[Math.floor(Math.random() * validMoves.length)];
    tiles[emptyIdx] = tiles[move];
    tiles[move] = 8;
    emptyIdx = move;
}

function renderBoard() {
    board.innerHTML = '';
    tiles.forEach((tileNum, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        
        if (tileNum === 8) {
            piece.classList.add('empty-piece');
        } else {
            // 원본 이미지에서 보여줄 위치 계산 (3x3 등분)
            const x = (tileNum % 3) * -100;
            const y = Math.floor(tileNum / 3) * -100;
            piece.style.backgroundPosition = `${x}px ${y}px`;
            
            piece.addEventListener('click', () => {
                // 클릭한 조각이 빈칸(8)과 상하좌우로 인접해 있는지 확인
                let r1 = Math.floor(index / 3), c1 = index % 3;
                let emptyPos = tiles.indexOf(8);
                let r2 = Math.floor(emptyPos / 3), c2 = emptyPos % 3;
                
                if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
                    // 위치 교환
                    tiles[emptyPos] = tiles[index];
                    tiles[index] = 8;
                    renderBoard();
                    checkWin();
                }
            });
        }
        board.appendChild(piece);
    });
}

function checkWin() {
    let isWin = true;
    for (let i = 0; i < 9; i++) {
        if (tiles[i] !== i) isWin = false;
    }
    if (isWin) setTimeout(() => winGame('namhae'), 300);
}

renderBoard();const board = document.getElementById('board');
// 0~8 배열 (8은 빈칸)
let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// 퍼즐을 섞을 때 풀 수 있는 상태로 만들기 위해 유효한 이동만 150번 시뮬레이션
let emptyIdx = 8;
for (let i = 0; i < 150; i++) {
    let validMoves = [];
    let r = Math.floor(emptyIdx / 3);
    let c = emptyIdx % 3;
    if (r > 0) validMoves.push(emptyIdx - 3);
    if (r < 2) validMoves.push(emptyIdx + 3);
    if (c > 0) validMoves.push(emptyIdx - 1);
    if (c < 2) validMoves.push(emptyIdx + 1);
    
    let move = validMoves[Math.floor(Math.random() * validMoves.length)];
    tiles[emptyIdx] = tiles[move];
    tiles[move] = 8;
    emptyIdx = move;
}

function renderBoard() {
    board.innerHTML = '';
    tiles.forEach((tileNum, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        
        if (tileNum === 8) {
            piece.classList.add('empty-piece');
        } else {
            // 원본 이미지에서 보여줄 위치 계산 (3x3 등분)
            const x = (tileNum % 3) * -100;
            const y = Math.floor(tileNum / 3) * -100;
            piece.style.backgroundPosition = `${x}px ${y}px`;
            
            piece.addEventListener('click', () => {
                // 클릭한 조각이 빈칸(8)과 상하좌우로 인접해 있는지 확인
                let r1 = Math.floor(index / 3), c1 = index % 3;
                let emptyPos = tiles.indexOf(8);
                let r2 = Math.floor(emptyPos / 3), c2 = emptyPos % 3;
                
                if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
                    // 위치 교환
                    tiles[emptyPos] = tiles[index];
                    tiles[index] = 8;
                    renderBoard();
                    checkWin();
                }
            });
        }
        board.appendChild(piece);
    });
}

function checkWin() {
    let isWin = true;
    for (let i = 0; i < 9; i++) {
        if (tiles[i] !== i) isWin = false;
    }
    if (isWin) setTimeout(() => winGame('namhae'), 300);
}

renderBoard();
