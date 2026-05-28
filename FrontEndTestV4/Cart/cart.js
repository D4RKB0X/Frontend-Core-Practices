let gold = parseInt(localStorage.getItem('gold')) || 500;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateGoldDisplay() {
    document.getElementById('gold-display').textContent = 
        `💰 Gold: ${gold}g`;
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => 
        total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSection = document.getElementById('cart-section');

    if(cart.length === 0) {
        cartSection.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }

    cartSection.style.display = 'flex';
    emptyCart.style.display = 'none';
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.category}</p>
                <p>${item.price}g each</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="decreaseItem(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseItem(${item.id})">+</button>
                <button class="remove-btn" 
                    onclick="removeItem(${item.id})">x</button>
            </div>
            <div class="cart-item-price">
                ${item.price * item.quantity}g
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    updateSummary();
}

function updateSummary() {
    const total = cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => 
        sum + item.quantity, 0);

    document.getElementById('summary-count').textContent = count;
    document.getElementById('summary-total').textContent = `${total}g`;
    document.getElementById('summary-gold').textContent = `${gold}g`;
}

function increaseItem(id) {
    const item = cart.find(item => item.id === id);
    item.quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function decreaseItem(id) {
    const item = cart.find(item => item.id === id);
    if(item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function checkout() {
    const total = cart.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0);

    if(gold < total) {
        alert('Not enough gold!');
        return;
    }

    gold -= total;
    cart = [];
    localStorage.setItem('gold', gold);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Purchase successful! Thank you for shopping!');
    updateGoldDisplay();
    updateCartCount();
    displayCart();
}

updateGoldDisplay();
updateCartCount();
displayCart();