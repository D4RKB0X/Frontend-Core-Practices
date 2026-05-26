document.getElementById('burger-btn').addEventListener('click', function() {
    document.getElementById('burger-menu').classList.toggle('active');
});

let unit1 = JSON.parse(localStorage.getItem('unit1'));
let unit2 = JSON.parse(localStorage.getItem('unit2'));

function initBattle() {
    if(!unit1 || !unit2) {
        window.location.href = '../Setup/setup.html';
        return;
    }

    document.getElementById('b-unit1-name').textContent = unit1.name;
    document.getElementById('b-unit1-hp').textContent = `${unit1.hp}`;
    document.getElementById('b-unit1-dmg').textContent = `${unit1.dmg}`;

    document.getElementById('b-unit2-name').textContent = unit2.name;
    document.getElementById('b-unit2-hp').textContent = `${unit2.hp}`;
    document.getElementById('b-unit2-dmg').textContent = `${unit2.dmg}`;

    updateHealthBars();
}

function updateHealthBars() {
    const unit1Percent = (unit1.hp / unit1.maxHp) * 100;
    const unit2Percent = (unit2.hp / unit2.maxHp) * 100;

    document.getElementById('b-unit1-bar').style.width = `${unit1Percent}%`;
    document.getElementById('b-unit2-bar').style.width = `${unit2Percent}%`;

    document.getElementById('b-unit1-bar').style.backgroundColor =
        unit1Percent > 50 ? '#4caf50' : unit1Percent > 25 ? '#ff9800' : '#f44336';

    document.getElementById('b-unit2-bar').style.backgroundColor =
        unit2Percent > 50 ? '#4caf50' : unit2Percent > 25 ? '#ff9800' : '#f44336';
}

function addLog(message) {
    const logEntries = document.getElementById('log-entries');
    const entry = document.createElement('p');

    entry.className = 'log-entry';
    entry.textContent = message;
    logEntries.prepend(entry);
}

function attack() {
    unit2.hp -= unit1.dmg;
    if(unit2.hp < 0) {
        unit2.hp = 0;
    }
    addLog(`${unit1.name} hits ${unit2.name} for ${unit1.dmg} damage!`);

    if(unit2.hp > 0) {
        unit1.hp -= unit2.dmg;

        if(unit1.hp < 0) {
            unit1.hp = 0;
        }
        addLog(`${unit2.name} hits ${unit1.name} for ${unit2.dmg} damage!`);
    }

    document.getElementById('b-unit1-hp').textContent = `${unit1.hp}`;
    document.getElementById('b-unit2-hp').textContent = `${unit2.hp}`;
    updateHealthBars();

    checkWinner();
}

function checkWinner() {
    if(unit1.hp <= 0 || unit2.hp <= 0) {
        document.getElementById('attack-btn').disabled = true;

        const winner = unit1.hp > 0 ? unit1.name : unit2.name;

        document.getElementById('winner-text').textContent = `${winner} Wins!`;
        document.getElementById('winner-display').style.display = 'block';

        addLog(`${winner} is victorious!`);
    }
}

initBattle();