document.getElementById('burger-btn').addEventListener('click', function() {
    document.getElementById('burger-menu').classList.toggle('active');
});

function saveAndStart() {
    const unit1 = {
        name: document.getElementById('unit1-name').value,
        hp: Number(document.getElementById('unit1-hp').value),
        maxHp: Number(document.getElementById('unit1-hp').value),
        dmg: Number(document.getElementById('unit1-dmg').value)
    };

    const unit2 = {
        name: document.getElementById('unit2-name').value,
        hp: Number(document.getElementById('unit2-hp').value),
        maxHp: Number(document.getElementById('unit2-hp').value),
        dmg: Number(document.getElementById('unit2-dmg').value)
    };

    localStorage.setItem('unit1', JSON.stringify(unit1));
    localStorage.setItem('unit2', JSON.stringify(unit2));

    window.location.href = '../Battle/battle.html';
}