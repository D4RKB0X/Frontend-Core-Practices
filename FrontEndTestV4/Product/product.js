let gold = parseInt(localStorage.getItem('gold')) || 500;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let quantity = 1;

const product = JSON.parse(localStorage.getItem('selectedProduct'));

function updateGoldDisplay() {
    document.getElementById('gold-display').textContent = 
        `💰 Gold: ${gold}g`;
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => 
        total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

function loadProduct() {
    if(!product) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('detail-icon').textContent = product.icon;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-category').textContent = 
        `Category: ${product.category}`;
    document.getElementById('detail-price').textContent = 
        `💰 Price: ${product.price}g`;
    document.getElementById('detail-stock').textContent = 
        `📦 Stock: ${product.stock}`;
    document.getElementById('detail-description').textContent = 
        product.description;
    document.getElementById('qty-display').textContent = quantity;

    if(product.stock === 0) {
        document.getElementById('add-to-bag-btn').disabled = true;
        document.getElementById('add-to-bag-btn').textContent = 
            'Out of Stock!';
    }
}

function increaseQty() {
    if(quantity < product.stock) {
        quantity++;
        document.getElementById('qty-display').textContent = quantity;
    }
}

function decreaseQty() {
    if(quantity > 1) {
        quantity--;
        document.getElementById('qty-display').textContent = quantity;
    }
}

function addToBag() {
    if(product.stock === 0) return;

    const existing = cart.find(item => item.id === product.id);
    if(existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity}x ${product.name} added to bag!`);
    window.location.href = 'index.html';
}

updateGoldDisplay();
updateCartCount();
loadProduct();