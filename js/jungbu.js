document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');

    const archiImages = [
        'assets/seohae_archi_2.png',
        'assets/namhae_archi_2.png',
        'assets/donghae_archi_2.png',
        'assets/jeju_archi_2.png',
        'assets/jungbu_archi_2.png'
    ];

    // 브라우저 캐시에 이미지 미리 불러오기 (깜빡임 완벽 제거)
    archiImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

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
                // 정답 다 맞췄을 때 팝업 뜨는 속도 300ms로 빠르게
                if (matched === 5) setTimeout(() => {
                    if(typeof winGame === 'function') winGame('jungbu');
                }, 300); 
            } else {
                lock = true;
                // 틀렸을 때 카드 다시 뒤집히는 속도 400ms로 빠르게
                setTimeout(() => {
                    first.classList.remove('flipped');
                    card.classList.remove('flipped');
                    first = null; lock = false;
                }, 400); 
            }
        });
    });
});
