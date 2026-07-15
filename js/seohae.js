let score = 0, time = 30;
const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

// 서해 아치 망치 커서 생성
const hammer = document.createElement('div');
hammer.id = 'hammer';
document.body.appendChild(hammer);

board.addEventListener('mousemove', (e) => {
    hammer.style.display = 'block';
    hammer.style.left = `${e.pageX}px`;
    hammer.style.top = `${e.pageY}px`;
});

// 망치 내려찍는 모션 및 터치 판정
board.addEventListener('mousedown', (e) => {
    hammer.classList.remove('hit-animation');
    void hammer.offsetWidth; // 리플로우 강제 트리거로 애니메이션 재시작
    hammer.classList.add('hit-animation');
    
    if (e.target.classList.contains('mole') && e.target.classList.contains('up')) {
        if (e.target.dataset.type === 'bread') score++;
        else score--;
        scoreEl.innerText = score;
        e.target.classList.remove('up');
        if (score >= 8) { score = 0; clearInterval(timer); clearInterval(gameInterval); winGame('seohae'); }
    }
});

for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    board.appendChild(hole);
}

const holes = document.querySelectorAll('.hole .mole');
const gameInterval = setInterval(() => {
    if (time <= 0) return;
    const idx = Math.floor(Math.random() * 9);
    const type = Math.random() > 0.3 ? 'bread' : 'trash';
    holes[idx].dataset.type = type;
    // 소금빵 이미지 또는 해양 쓰레기 이모지 할당
    if(type === 'bread') {
        holes[idx].style.backgroundImage = "url('assets/salt_bread.png')";
        holes[idx].textContent = "";
        holes[idx].style.backgroundColor = "transparent";
    } else {
        holes[idx].style.backgroundImage = "none";
        holes[idx].textContent = "🗑️";
        holes[idx].style.fontSize = "50px";
        holes[idx].style.textAlign = "center";
        holes[idx].style.lineHeight = "100px";
        holes[idx].style.backgroundColor = "#555";
    }
    holes[idx].classList.add('up');
    setTimeout(() => holes[idx].classList.remove('up'), 800);
}, 600);

const timer = setInterval(() => {
    time--; timeEl.innerText = time;
    if (time <= 0) { clearInterval(timer); clearInterval(gameInterval); alert('시간 초과! 다시 도전하세요.'); location.reload(); }
}, 1000);
