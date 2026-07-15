let score = 0, time = 30;
const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

// 서해 아치 먹는 커서 생성 (누끼 딴 _1.png)
const eater = document.createElement('div');
eater.id = 'eater-cursor';
document.body.appendChild(eater);

board.addEventListener('mousemove', (e) => {
    eater.style.display = 'block';
    eater.style.left = `${e.pageX}px`;
    eater.style.top = `${e.pageY}px`;
});

// 먹는 모션(확대 후 덮치기)
board.addEventListener('mousedown', (e) => {
    eater.classList.remove('eat-animation');
    void eater.offsetWidth; 
    eater.classList.add('eat-animation');
    
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
