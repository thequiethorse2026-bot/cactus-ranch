/* --------------------------------------------------
   SIMPLE STORE SYSTEM — THE QUIET HORSE
   Clean, stable, and easy to maintain
-------------------------------------------------- */

/* --------------------------------------------------
   PRODUCT DATA
   (You can add more products here later)
-------------------------------------------------- */

const PRODUCTS = [
    {
        id: "sundown-companion",
        name: "Sundown Companion",
        price: 40,
        image: "images/Sundown Companion.jpg",
        description: "A quiet moment at the edge of the day — charcoal and pencil capturing the warmth of a loyal companion under a fading sky."
    },
    {
        id: "edge-of-the-quiet-valley",
        name: "Edge of the Quiet Valley",
        price: 40,
        image: "images/Edge of the Quiet Valley.jpg",
        description: "A peaceful stretch of land where the day settles into silence."
    },
    {
        id: "stormborn-spirit",
        name: "Stormborn Spirit",
        price: 40,
        image: "images/Stormborn Sprit.jpg",
        description: "A fierce presence rising from the storm — strength in motion."
    }
];

/* --------------------------------------------------
   CART SYSTEM
-------------------------------------------------- */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Save cart */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Update cart count in navbar */
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartLinks = document.querySelectorAll(".cart-count");

    cartLinks.forEach(link => {
        link.textContent = count;
    });
}

/* Add item to cart */
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    alert("Added to cart!");
}

/* Remove item from cart */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

/* --------------------------------------------------
   PRODUCT PAGE LOADER
-------------------------------------------------- */

function loadProductPage() {
    const container = document.querySelector(".product-page");
    if (!container) return;

    // Default product for now
    const product = PRODUCTS[0];

    container.querySelector(".product-image img").src = product.image;
    container.querySelector(".product-details h2").textContent = product.name;
    container.querySelector(".price").textContent = `$${product.price}.00`;
    container.querySelector(".description").textContent = product.description;

    const addBtn = container.querySelector(".add-to-cart");
    addBtn.onclick = () => addToCart(product.id);
}

/* --------------------------------------------------
   CART PAGE RENDER
-------------------------------------------------- */

function renderCart() {
    const cartContainer = document.querySelector(".cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${item.price}.00</p>
                <button class="btn remove-btn" data-id="${item.id}">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.onclick = () => removeFromCart(btn.dataset.id);
    });
}

/* --------------------------------------------------
   CHECKOUT
-------------------------------------------------- */

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Replace this with your real Stripe link
    const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/your-real-link-here";

    window.location.href = STRIPE_PAYMENT_LINK;
}

/* --------------------------------------------------
   INITIALIZE
-------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    loadProductPage();
    renderCart();

    const checkoutBtn = document.querySelector(".checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.onclick = checkout;
    }
});
