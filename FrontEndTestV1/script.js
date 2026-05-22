let items = [
    { id: 1, name: "Sword", type: "Weapon", quantity: 5, price: 150 },
    { id: 2, name: "Shield", type: "Armor", quantity: 3, price: 100 },
    { id: 3, name: "Health Potion", type: "Potion", quantity: 10, price: 50 },
    { id: 4, name: "Axe", type: "Weapon", quantity: 2, price: 200 },
    { id: 5, name: "Chainmail", type: "Armor", quantity: 1, price: 300 },
];

function displayItems(itemsToShow) {
    const itemList = document.getElementById('item-list');

    itemList.innerHTML = '';
    document.getElementById('item-count').textContent = itemsToShow.length;

    if(itemsToShow.length === 0) {
        itemList.innerHTML = `<p id="empty-message">No items found!</p>`;
        return;
    }

    itemsToShow.forEach(item => createItemCard(item));
}

function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <h3>${item.name}</h3>
        <p>Type: ${item.type}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="buy-btn" onclick="buyItem(${item.id})">Buy</button>
        <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
    `;
    document.getElementById('item-list').appendChild(card);
}

function buyItem(id) {
    const item = items.find(item => item.id === id);

    if(item.quantity > 0) {
        item.quantity--;
        displayItems(items);
    }
    else {
        alert('Out of Stock!');
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    displayItems(items);
}

document.getElementById('search-bar').addEventListener('input', function() {
    const search = this.value.toLowerCase();
    const filtered = items.filter(
        item => item.name.toLowerCase().includes(search)
    );

    displayItems(filtered);
});

document.getElementById('add-item-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('item-name').value;
    const type = document.getElementById('item-type').value;
    const quantity = document.getElementById('item-quantity').value;

    items.push ({
        id: items.length + 1,
        name: name,
        type: type,
        quantity: Number(quantity)
    });

    displayItems(items);

    document.getElementById('item-name').value = '';
    document.getElementById('item-quantity').value = '';
});

document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.dataset.type;

        if(type === 'All') {
            displayItems(items);
        }

        else {
            const filtered = items.filter(item => item.type === type)
            displayItems(filtered);
        }
    });
});

displayItems(items);