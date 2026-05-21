let items = [
    { id: 1, name: "Sword", type: "WEAPON", quantity: 2 },
    { id: 2, name: "Shield", type: "ARMOR", quantity: 1 },
    { id: 3, name: "Health Potion", type: "POTION", quantity: 5 },
    { id: 4, name: "Axe", type: "WEAPON", quantity: 3 }
];

function displayItems(itemsToShow) {
    const itemList = document.getElementById('item-list');
    itemList.innerHTML = '';
    itemsToShow.forEach(item => createItemCard(item));
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h3>${item.name}</h3>
        <p>Type: ${item.type}</p>
        <p>Quantity: ${item.quantity}</p>
    `;
    document.getElementById('item-list').appendChild(card);
}

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault() 

    const name = document.getElementById('item-name').value;
    const type = document.getElementById('item-type').value;

    items.push ({
        id: items.length + 1,
        name: name,
        type: type,
        quantity: 0
    });

    displayItems(items);
    document.getElementById('item-name').value = '';
}); 

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.dataset.type;

        if(type === 'ALL') {
            displayItems(items);
        } else {
            const filtered = items.filter(item => item.type === type);
            displayItems(filtered);
        }
    });
});

displayItems(items);