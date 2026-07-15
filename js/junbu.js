const board = document.getElementById('board');
const filters = ['hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', 'grayscale(1)', 'invert(1)', 'sepia(1)'];
let cards = [...filters, ...filters].sort(() => Math.random() - 0.5);
let first = null, matched = 0, lock = false;

cards.forEach(filter => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.filter = filter;
    
    const img = document.createElement('img');
    img.src = 'assets/archi.png';
    img.style.filter = filter;
    card.appendChild(img);
    board.appendChild(card);

    card.addEventListener('click', () => {
        if (lock || card === first || card.classList.contains('flipped')) return;
        card.classList.add('flipped');

        if (!first) { first = card; return; }
        
        if (first.dataset.filter === card.dataset.filter) {
            matched++;
            document.getElementById('score').innerText = matched;
            first = null;
            if (matched === 6) setTimeout(() => winGame('jungbu'), 500);
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
