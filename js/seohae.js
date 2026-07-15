let score = 0, time = 30;
const board = document.getElementById('board');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.className = 'hole';
    const mole = document.createElement('div');
    mole.className = 'mole';
    hole.appendChild(mole);
    board.appendChild(hole);

    mole.addEventListener('mousedown', (e) => {
        if (e.target.dataset.type === 'bread') score++;
        else score--;
        scoreEl.innerText = score;
        e.target.classList.remove('up');
        if (score >= 8) { score = 0; winGame('seohae'); }
    });
}

const holes = document.querySelectorAll('.hole .mole');
setInterval(() => {
    if (time <= 0) return;
    const idx = Math.floor(Math.random() * 9);
    const type = Math.random() > 0.3 ? 'bread' : 'trash';
    holes[idx].dataset.type = type;
    holes[idx].style.backgroundImage = type === 'bread' ? "url('assets/archi.png')" : "none";
    holes[idx].style.backgroundColor = type === 'trash' ? "black" : "transparent"; // 임시 텍스처
    holes[idx].textContent = type === 'trash' ? "🗑️" : "";
    holes[idx].classList.add('up');
    setTimeout(() => holes[idx].classList.remove('up'), 800);
}, 600);

const timer = setInterval(() => {
    time--; timeEl.innerText = time;
    if (time <= 0) { clearInterval(timer); alert('시간 초과! 다시 도전하세요.'); location.reload(); }
}, 1000);
