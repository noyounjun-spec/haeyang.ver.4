const board = document.getElementById('board');
const scoreEl = document.getElementById('score');

// 오른쪽 보드에 추가할 임의의 5가지 시각적 차이점 (이모지로 구현)
const fakeDiffs = [
    { id: 1, top: '15%', left: '25%', text: '☁️', size: '30px' },
    { id: 2, top: '75%', left: '80%', text: '🐟', size: '25px' },
    { id: 3, top: '35%', left: '75%', text: '✈️', size: '35px' },
    { id: 4, top: '85%', left: '20%', text: '🐚', size: '25px' },
    { id: 5, top: '10%', left: '85%', text: '☀️', size: '40px' }
];

let found = 0;

// 차이점들을 보드에 렌더링
fakeDiffs.forEach(diff => {
    const el = document.createElement('div');
    el.className = 'fake-diff';
    el.style.top = diff.top;
    el.style.left = diff.left;
    el.style.fontSize = diff.size;
    el.innerText = diff.text;
    
    el.addEventListener('mousedown', function(e) {
        if (el.dataset.found) return;
        el.dataset.found = 'true';
        found++;
        scoreEl.innerText = found;
        
        // 정답 마커 표시
        const marker = document.createElement('div');
        marker.className = 'marker';
        marker.style.left = diff.left;
        marker.style.top = diff.top;
        board.appendChild(marker);
        
        if (found >= 5) setTimeout(() => winGame('donghae'), 300);
        
        e.stopPropagation(); // 보드 클릭 이벤트로 번지지 않게 차단
    });
    
    board.appendChild(el);
});
