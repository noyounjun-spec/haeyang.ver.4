// 미션 완료 처리 및 허브 복귀 함수
function winGame(missionName) {
    localStorage.setItem(`mission_${missionName}`, 'true');
    alert('미션 성공! 다음 지역으로 이동합니다.');
    window.location.href = 'index.html';
}

// 허브 페이지에서 진행 상황 렌더링
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', () => {
        const missions = ['seohae', 'donghae', 'jungbu', 'namhae', 'jeju'];
        let clearCount = 0;
        
        missions.forEach(m => {
            if (localStorage.getItem(`mission_${m}`) === 'true') {
                document.getElementById(`pin-${m}`).classList.add('done');
                clearCount++;
            }
        });

        if (clearCount === 5) {
            setTimeout(() => alert('🎉 모든 해양경찰청 미션을 완료했습니다! 아치와 함께 바다를 지켜주셔서 감사합니다!'), 500);
        }
    });
}
