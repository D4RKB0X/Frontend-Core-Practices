let gold = 500;

const shopItems = [
    { id: 1, name: "Sword", type: "Weapon", price: 150 },
    { id: 2, name: "Shield", type: "Armor", price: 100 },
    { id: 3, name: "Health Potion", type: "Potion", price: 50 },
    { id: 4, name: "Axe", type: "Weapon", price: 200 },
    { id: 5, name: "Chainmail", type: "Armor", price: 300 },
    { id: 6, name: "Mana Potion", type: "Potion", price: 75 },
];

let inventory = [];

function updateGold() {
    document.getElementById('gold-display').textContent = `Current Gold: ${gold}`;
}

function displayShopItems() {
    const shopContainer = document.getElementById('shop-items');
    shopContainer.innerHTML = '';

    shopItems.forEach(inputItem => {
        const itemCard = document.createElement('div');
        itemCard.className = 'shop-card';
        itemCard.innerHTML = `
            <h3>${inputItem.name}<h3>
            <p class="item-type">${inputItem.type}</p>
            <p class="item-price">${inputItem.price}</p>
            <button class="buy-btn" onclick="buyItem(${inputItem.id})">Buy</button>
        `;

        shopContainer.appendChild(itemCard);
    });
}

function buyItem(id) {
    const inputItem = shopItems.find(inputItem => inputItem.id === id);

    if(gold < inputItem.price) {
        alert('Not enough gold!');
        return;
    }

    gold -= inputItem.price;
    updateGold();

    const existingItem = inventory.find(inventoryItem => inventoryItem.id === id);
    if(existingItem) {
        existingItem.quantity++;
    }
    else {
        inventory.push({... inputItem, quantity: 1});
    }

    displayBag();
}

function displayBag() {
    const inventoryContainer = document.getElementById('inventory-items');
    inventoryContainer.innerHTML = '';

    if(inventory.length === 0) {
        inventoryContainer.innerHTML = '<p>Your Inventory is Empty!</p>';
        updateInventorySummary();
        return;
    }

    inventory.forEach(inputItem => {
        const itemCard = document.createElement('div');
        itemCard.className = 'inventory-card';
        itemCard.innerHTML = `
            <h3>${inputItem.name}</h3>
            <p>Type: ${inputItem.type}</p>
            <p>Price: ${inputItem.price} each</p>
            <p>Quantity: ${inputItem.quantity}</p>
            <button class="remove-btn" onclick="removeItem(${inputItem.id})">Remove</button>
        `;
        inventoryContainer.appendChild(itemCard);
    });

    updateInventorySummary();
}

function removeItem(id) {
    const inputItem = inventory.find(inputItem => inputItem.id === id);

    gold += inputItem.price;
    updateGold();

    if(inputItem.quantity > 1) {
        inputItem.quantity--;
    }
    else {
        inventory = inventory.filter(inputItem => inputItem.id !== id);
    }

    displayBag();
}

function updateInventorySummary() {
    const totalSpent = inventory.reduce((total, inputItem) =>
        total + (inputItem.price * inputItem.quantity), 0);

    const totalItems = inventory.reduce((total, inputItem) =>
        total + inputItem.quantity, 0);
    
    document.getElementById('total-spent').textContent = `${totalSpent}`;
    document.getElementById('item-count').textContent = totalItems;
}

document.getElementById('burger-btn').addEventListener('click', function() {
    document.getElementById('burger-menu').classList.toggle('active');
});

document.getElementById('search-bar').addEventListener('input', function() {
    const inputSearch = this.value.toLowerCase();
    const inputFiltered = shopItems.filter(
        inputItem => inputItem.name.toLowerCase().includes(inputSearch)
    );

    displayFilteredShopItems(inputFiltered);
});

function displayFilteredShopItems(filteredItems) {
    const shopContainer = document.getElementById('shop-items');
    shopContainer.innerHTML = '';

    if(filteredItems.length === 0) {
        shopContainer.innerHTML = '<p>No items found!</p>';
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'shop-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p class="item-type">${item.type}</p>
            <p class="item-price">${item.price}</p>
            <button class="buy-btn" onclick="buyItem(${item.id})">Buy</button>
        `;
        shopContainer.appendChild(card);
    });
}

displayShopItems();
displayBag();
updateGold();