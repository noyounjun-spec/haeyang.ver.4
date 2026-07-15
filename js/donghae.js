const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
// 정답 좌표 (x%, y%)
const hotspots = [ {x: 20, y: 30}, {x: 75, y: 25}, {x: 45, y: 60}, {x: 15, y: 80}, {x: 85, y: 85} ];
let found = 0;
const radius = 10; // 클릭 인정 범위(%)

board.addEventListener('mousedown', (e) => {
    const rect = board.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    hotspots.forEach((spot, idx) => {
        if (spot.found) return;
        const dist = Math.sqrt((clickX - spot.x)**2 + (clickY - spot.y)**2);
        if (dist <= radius) {
            spot.found = true; found++;
            scoreEl.innerText = found;
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.style.left = `${spot.x}%`;
            marker.style.top = `${spot.y}%`;
            board.appendChild(marker);
            
            if (found >= 5) setTimeout(() => winGame('donghae'), 300);
        }
    });
});
