document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const basket = document.getElementById('basket');
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');

    if (!board || !basket || !scoreEl || !timeEl) return;

    let score = 0;
    let time = 30;
    let basketX = 110;

    function moveBasket(clientX) {
        const rect = board.getBoundingClientRect();
        basketX = clientX - rect.left - 40; 
        if (basketX < 0) basketX = 0;
        if (basketX > 220) basketX = 220; 
        basket.style.left = `${basketX}px`;
    }

    board.addEventListener('mousemove', (e) => {
        moveBasket(e.clientX);
    });

    board.addEventListener('touchmove', (e) => {
        e.preventDefault(); 
        moveBasket(e.touches[0].clientX);
    }, { passive: false });

    // 속도 업: 아이템 출몰 빈도 (500ms 마다)
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
        // 속도 업: 떨어지는 프레임 속도 (30ms 마다)
        const fall = setInterval(() => {
            // 속도 업: 한 번에 떨어지는 픽셀 양 (8px씩)
            top += 8;
            item.style.top = `${top}px`;
            
            if (top >= 350 && top <= 390) {
                const itemLeft = parseInt(item.style.left);
                if (itemLeft > basketX - 20 && itemLeft < basketX + 80) {
                    score += (item.dataset.type === 'clean' ? 1 : -1);
                    scoreEl.innerText = score;
                    item.remove();
                    clearInterval(fall);
                    
                    if (score >= 15) { 
                        clearInterval(gameInterval); 
                        clearInterval(timer); 
                        if (typeof winGame === 'function') {
                            winGame('jeju');
                        } else {
                            alert('제주 미션 완료!');
                        }
                    }
                }
            }
            
            if (top > 400) { 
                item.remove(); 
                clearInterval(fall); 
            }
        }, 30);
    }, 500);

    const timer = setInterval(() => {
        time--; 
        timeEl.innerText = time;
        if (time <= 0) { 
            clearInterval(timer); 
            clearInterval(gameInterval); 
            alert('시간 초과! 다시 도전하세요.'); 
            location.reload(); 
        }
    }, 1000);
});
