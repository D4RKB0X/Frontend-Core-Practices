let gold = parseInt(localStorage.getItem('gold')) || 500;
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
    { id: 1, name: "Wood", category: "Material", 
        price: 10, stock: 50, icon: "🪵",
        description: "Basic building material. Used for construction and crafting.",
        rare: false },
    { id: 2, name: "Stone", category: "Material", 
        price: 15, stock: 40, icon: "🪨",
        description: "Durable stone blocks. Essential for fortifications.",
        rare: false },
    { id: 3, name: "Metal", category: "Material", 
        price: 30, stock: 20, icon: "⚙️",
        description: "Refined metal ore. Required for advanced crafting.",
        rare: false },
    { id: 4, name: "Sword", category: "Weapon", 
        price: 150, stock: Math.floor(Math.random() * 3), icon: "⚔️",
        description: "A sharp blade forged by master blacksmiths. Rare find!",
        rare: true },
    { id: 5, name: "Axe", category: "Weapon", 
        price: 200, stock: Math.floor(Math.random() * 3), icon: "🪓",
        description: "Heavy battle axe. Devastating in combat. Rare find!",
        rare: true },
    { id: 6, name: "Shield", category: "Armor", 
        price: 120, stock: Math.floor(Math.random() * 3), icon: "🛡️",
        description: "Sturdy shield for protection. Rare find!",
        rare: true },
    { id: 7, name: "Chainmail", category: "Armor", 
        price: 180, stock: Math.floor(Math.random() * 3), icon: "🔗",
        description: "Interlocked metal rings for body protection. Rare find!",
        rare: true },
];

// Update gold display
function updateGoldDisplay() {
    document.getElementById('gold-display').textContent = 
        `💰 Gold: ${gold}g`;
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => 
        total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// Display products
function displayProducts(productsToShow) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if(productsToShow.length === 0) {
        grid.innerHTML = '<p id="empty-message">No items found!</p>';
        return;
    }

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="card-icon">${product.icon}</div>
            ${product.rare ? '<span class="rare-badge">⭐ RARE</span>' : ''}
            <h3>${product.name}</h3>
            <p class="card-category">${product.category}</p>
            <p class="card-price">${product.price}g</p>
            <p class="card-stock ${product.stock === 0 ? 'out-of-stock' : ''}">
                ${product.stock === 0 ? 'Out of Stock!' : `Stock: ${product.stock}`}
            </p>
            <button class="add-btn" 
                onclick="addToCart(${product.id})"
                ${product.stock === 0 ? 'disabled' : ''}>
                🎒 Add to Bag
            </button>
        `;
        card.addEventListener('click', function(e) {
            if(e.target.classList.contains('add-btn')) return;
            localStorage.setItem('selectedProduct', 
                JSON.stringify(product));
            window.location.href = 'product.html';
        });
        grid.appendChild(card);
    });
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if(product.stock === 0) return;

    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    product.stock--;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayProducts(currentFilter === 'All' ? 
        products : products.filter(p => p.category === currentFilter));
    
    alert(`${product.name} added to bag!`);
}

// Filter
let currentFilter = 'All';

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn')
            .forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.dataset.category;

        if(currentFilter === 'All') {
            displayProducts(products);
        } else {
            displayProducts(products.filter(
                p => p.category === currentFilter));
        }
    });
});

// Search
document.getElementById('search-bar').addEventListener('input', function() {
    const search = this.value.toLowerCase();
    const filtered = products.filter(
        p => p.name.toLowerCase().includes(search));
    displayProducts(filtered);
});

// Initialize
updateGoldDisplay();
updateCartCount();
displayProducts(products);