let gold = 500;
let cart = [];
let currentSlide = 0;

const products = [
    { id: 1, name: "Lumber Package", image: "images/lumber.png", color: "Brown", price: 500, rare: false },
    { id: 2, name: "Stone Bundle", image: "images/stone.png", color: "Grey", price: 750, rare: false },
    { id: 3, name: "Metal Crate", image: "images/metal.png", color: "Silver", price: 1200, rare: false },
    { id: 4, name: "Water", image: "images/water.png", color: "Blue", price: 5, rare: false },
    { id: 5, name: "Bricks", image: "images/bricks.png", color: "Brown", price: 15, rare: false },

    { id: 6, name: "Diamond", image: "images/diamond.png", color: "Blue", price: 2500, rare: true, stock: Math.floor(Math.random() * 3) },
    { id: 7, name: "Sword", image: "images/sword.png", color: "Steel", price: 150, rare: true, stock: Math.floor(Math.random() * 3) },
    { id: 8, name: "Shield", image: "images/shield.png", color: "Iron", price: 120, rare: true, stock: Math.floor(Math.random() * 3) },
    { id: 9, name: "Axe", image: "images/axe.png", color: "Steel", price: 200, rare: true, stock: Math.floor(Math.random() * 3) },
    { id: 10, name: "Explosives", image: "images/explosives.png", color: "Black", price: 300, rare: true, stock: Math.floor(Math.random() * 3) },

    { id: 11, name: "Gold Bars", image: "images/gold.png", color: "Gold", price: 2000, rare: false },
    { id: 12, name: "Plants", image: "images/plant.png", color: "Green", price: 10, rare: false },
    { id: 13, name: "Torch", image: "images/torch.png", color: "Red", price: 25, rare: false },
    { id: 14, name: "Crystals", image: "images/crystals.png", color: "Purple", price: 400, rare: false },
    { id: 15, name: "Potion", image: "images/potion.png", color: "White", price: 50, rare: false },
];

function updateGold() {
    document.getElementById('gold-display').textContent = `💰 ${gold}g`;
}

function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = total;
}

function displayProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const outOfStock = product.rare && product.stock === 0;

        card.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">

            ${product.rare ? '<span class="rare-badge">🌟 RARE</span>' : ''}
            <h3>${product.name}</h3>

            <p class="product-color">Color: ${product.color}</p>
            <p class="product-price">${product.price}g</p>

            <button class="order-btn"
                onclick="addToCart(${product.id})"
                ${outOfStock ? 'disabled' : ''}>
                ${outOfStock ? 'Out of Stock' : 'Order'}
            </button>
        `;
        
        list.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(product.rare && product.stock === 0) {
        alert('Out of stock!');
        return;
    }

    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.quantity++;
    }
    else {
        cart.push({ ...product, quantity: 1 });
    }

    if(product.rare) {
        product.stock--;
    }

    updateCartCount();
    displayProducts();

    alert(`${product.name} added to cart!`);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('overlay');

    if(modal.style.display === 'none') {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        displayCartModal();
    }
    else {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    }
}

function displayCartModal() {
    const modalItems = document.getElementById('modal-items');
    const modalCount = document.getElementById('modal-count');
    const modalTotal = document.getElementById('modal-total');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    modalCount.textContent = totalItems;

    if(cart.length === 0) {
        modalItems.innerHTML = `
            <p id="empty-cart-msg">Your bag is empty!</p>`;
        modalTotal.textContent = '0g';
        return;
    }

    modalItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-icon">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.price}g each</p>
            </div>

            <div class="qty-controls">
                <button onclick="decreaseQty(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${item.id})">+</button>
            </div>

            <div class="cart-item-price">
                ${item.price * item.quantity}g
            </div>
        `;
        modalItems.appendChild(cartItem);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    modalTotal.textContent = `${total}g`;
}

function increaseQty(id) {
    const item = cart.find(item => item.id === id);
    item.quantity++;
    updateCartCount();
    displayCartModal();
}

function decreaseQty(id) {
    const item = cart.find(item => item.id === id);
    if(item.quantity > 1) {
        item.quantity--;
    }
    else {
        cart = cart.filter(item => item.id !== id);
    }

    updateCartCount();
    displayCartModal();
}

function checkout() {
    if(cart.length === 0) {
        alert('Your bag is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if(gold < total) {
        alert('Not enough gold!');
        return;
    }

    gold -= total;
    cart = [];

    updateGold();
    updateCartCount();
    displayCartModal();

    alert('Purchase successful! May your army be strong! ⚔️');
}

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    showSlide(n);
}

setInterval(nextSlide, 3000);

updateGold();
updateCartCount();
displayProducts();