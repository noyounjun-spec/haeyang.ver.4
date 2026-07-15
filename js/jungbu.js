const board = document.getElementById('board');

// 5지역 배경이 포함된 사진 목록 (_2.png 및 중부 원본)
const archiImages = [
    'assets/seohae_archi_2.png',
    'assets/namhae_archi_2.png',
    'assets/donghae_archi_2.png',
    'assets/jeju_archi_2.png',
    'assets/jungbu_archi.png'
];

// 각 2장씩 총 10장 생성 후 셔플
let cards = [...archiImages, ...archiImages].sort(() => Math.random() - 0.5);
let first = null, matched = 0, lock = false;

cards.forEach(imageSrc => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.src = imageSrc;
    
    const face = document.createElement('div');
    face.className = 'card-face';
    face.style.backgroundImage = `url('${imageSrc}')`;
    
    card.appendChild(face);
    board.appendChild(card);

    card.addEventListener('click', () => {
        if (lock || card === first || card.classList.contains('flipped')) return;
        card.classList.add('flipped');

        if (!first) { first = card; return; }
        
        if (first.dataset.src === card.dataset.src) {
            matched++;
            document.getElementById('score').innerText = matched;
            first = null;
            if (matched === 5) setTimeout(() => winGame('jungbu'), 500);
        } else {
            lock = true;
            setTimeout(() => {
                first.classList.remove('flipped');
                card.classList.remove('flipped');
                first = null; lock = false;
            }, 800);
        }
    });
});
