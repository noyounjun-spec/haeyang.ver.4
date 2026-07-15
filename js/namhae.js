document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    if (!board) return;

    // 0~8 배열 (8은 빈칸)
    let tiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // 퍼즐을 섞을 때 풀 수 있는 상태로 만들기 위해 150번 무작위 이동
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
                // 빈 칸은 투명하게 처리
                piece.classList.add('empty-piece');
                piece.style.backgroundImage = 'none';
            } else {
                // 🌟 핵심 해결: CSS가 아니라 JS에서 직접 이미지를 불러옵니다!
                piece.style.backgroundImage = "url('assets/namhae_archi_1.png')";
                piece.style.backgroundSize = "300px 300px";

                // 원본 이미지에서 보여줄 조각의 위치 계산
                const x = (tileNum % 3) * -100;
                const y = Math.floor(tileNum / 3) * -100;
                piece.style.backgroundPosition = `${x}px ${y}px`;
                
                // 클릭해서 조각 이동하는 로직
                piece.addEventListener('click', () => {
                    let r1 = Math.floor(index / 3), c1 = index % 3;
                    let emptyPos = tiles.indexOf(8);
                    let r2 = Math.floor(emptyPos / 3), c2 = emptyPos % 3;
                    
                    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
                        // 위치 교환 후 다시 그리기
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
        if (isWin) {
            setTimeout(() => {
                if (typeof winGame === 'function') {
                    winGame('namhae');
                } else {
                    alert('남해 미션 완료!');
                }
            }, 300);
        }
    }

    renderBoard();
});
