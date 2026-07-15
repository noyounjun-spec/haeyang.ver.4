const board = document.getElementById('board');
const basket = document.getElementById('basket');
let score = 0, time = 30;
let basketX = 110;

board.addEventListener('mousemove', (e) => {
    const rect = board.getBoundingClientRect();
    basketX = e.clientX - rect.left - 40; // 바구니(80px) 중앙 정렬을 위해 40을 뺌
    if (basketX < 0) basketX = 0;
    if (basketX > 220) basketX = 220;
    basket.style.left = `${basketX}px`;
});

const gameInterval = setInterval(() => {
    const item = document.createElement('div');
    item.className = 'falling-item';
    const isClean = Math.random() > 0.4;
    item.innerText = isClean ? '♻️' : '🗑️';
    item.dataset.type = isClean ? 'clean' : 'dirty';
    
    item.style.left = `${Math.random() * 270}px`;
    item.style.top = '0px';
    board.appendChild(item);

    let top = 0;
    const fall = setInterval(() => {
        top += 5;
        item.style.top = `${top}px`;
        
        if (top >= 350 && top <= 390) {
            const itemLeft = parseInt(item.style.left);
            if (itemLeft > basketX - 20 && itemLeft < basketX + 80) {
                score += (item.dataset.type === 'clean' ? 1 : -1);
                document.getElementById('score').innerText = score;
                item.remove();
                clearInterval(fall);
                if (score >= 15) { clearInterval(gameInterval); clearInterval(timer); winGame('jeju'); }
            }
        }
        if (top > 400) { item.remove(); clearInterval(fall); }
    }, 50);
}, 800);

const timer = setInterval(() => {
    time--; document.getElementById('time').innerText = time;
    if (time <= 0) { clearInterval(timer); clearInterval(gameInterval); alert('시간 초과! 다시 도전하세요.'); location.reload(); }
}, 1000);
