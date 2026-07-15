const board = document.getElementById('board');
// 전체 5지역 아치 리스트
const archiImages = [
    'assets/namhae_archi.png',
    'assets/donghae_archi_1.png',
    'assets/seohae_archi.png',
    'assets/jeju_archi.png',
    'assets/jungbu_archi.png'
];

// 2장씩 복제하여 10장 생성 및 섞기
let cards = [...archiImages, ...archiImages].sort(() => Math.random() - 0.5);
let first = null, matched = 0, lock = false;

cards.forEach(imageSrc => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.src = imageSrc;
    
    // 카드 앞면 (캐릭터 얼굴)
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
            // 5쌍을 모두 맞추면 승리
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
