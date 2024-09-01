// script.js

// Sample cart array to store cart items
let cart = [];

// Function to add item to cart
function addToCart(productName, price) {
    // Find if the item already exists in the cart
    const existingItem = cart.find(item => item.productName === productName);
    
    if (existingItem) {
        // If the item already exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If the item is new, add it to the cart with a quantity of 1
        cart.push({ productName, price, quantity: 1 });
    }

    console.log(`${productName} added to cart!`);
    updateCartDisplay();
}

// Function to handle Buy Now
function buyNow(productName, price) {
    // Clear the cart and add only the selected item
    cart = [{ productName, price, quantity: 1 }];
    
    console.log(`Proceed to checkout with ${productName}`);
    proceedToCheckout();
}

// Function to display cart items (you can update the UI here)
function updateCartDisplay() {
    // Example: Log the cart contents to the console
    console.log("Cart contents:", cart);
    alert(`Cart updated. Items in cart: ${cart.length}`);
}

// Function to proceed to checkout
function proceedToCheckout() {
    // Redirect to checkout page or handle checkout logic
    window.location.href = "checkout.html";
}

// Example: Assigning the functions to the buttons
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".btn").forEach(function(button) {
        button.addEventListener("click", function(event) {
            const productName = event.target.closest(".col-4").querySelector("h4").textContent;
            const price = event.target.closest(".col-4").querySelector("p").textContent;

            if (event.target.textContent.includes("Add to Cart")) {
                addToCart(productName, price);
            } else if (event.target.textContent.includes("Buy Now")) {
                buyNow(productName, price);
            }
        });
    });
});



// script.js

// Example products for testing; in a real app, you would fetch this from the server
const products = [
    {
        id: 1,
        name: "Red Printed T-shirt",
        price: 300,
        image: "images/product-1.jpg"
    },
    {
        id: 2,
        name: "HRX Black Shoes",
        price: 300,
        image: "images/product-2.jpg"
    },
    {
        id: 3,
        name: "Shoes",
        price: 500,
        image: "images/product-3.jpg"
    }
];

// Function to add item to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find product by ID
    let product = products.find(p => p.id === productId);

    // Check if product already exists in cart
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}

// Function to display cart items
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById('cartTable');
    let subtotalElement = document.getElementById('subtotal');
    let taxElement = document.getElementById('tax');
    let totalElement = document.getElementById('total');

    let subtotal = 0;

    cart.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: ${item.price} RS</small>
                        <br>
                        <a href="#" onclick="removeFromCart(${item.id})">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)"></td>
            <td>${item.price * item.quantity} RS</td>
        `;
        cartTable.appendChild(row);

        subtotal += item.price * item.quantity;
    });

    let tax = subtotal * 0.05; // Assuming 5% tax
    let total = subtotal + tax;

    subtotalElement.textContent = `${subtotal} RS`;
    taxElement.textContent = `${tax} RS`;
    totalElement.textContent = `${total} RS`;
}

// Function to update quantity in the cart
function updateQuantity(productId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity = parseInt(quantity, 10);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload the page to update the cart display
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload the page to update the cart display
}

// Call displayCartItems on page load
document.addEventListener('DOMContentLoaded', displayCartItems);


function addToCart(productName, productImage, productPrice) {
    // Get cart from localStorage or initialize it if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in the cart
    let productIndex = cart.findIndex(item => item.name === productName);
    
    if (productIndex > -1) {
        // If the product is already in the cart, increase the quantity
        cart[productIndex].quantity += 1;
    } else {
        // Add new product to the cart
        cart.push({
            name: productName,
            image: productImage,
            price: productPrice,
            quantity: 1
        });
    }
    
    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to the cart page
    window.location.href = 'cart.html';
}


 // Function to display cart items
 function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById('cartTable');

    cart.forEach(item => {
        let row = cartTable.insertRow();
        row.innerHTML = `
            <td><img src="${item.image}" width="50px"> ${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity} RS</td>
        `;
    });

    // Calculate totals
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let tax = subtotal * 0.1; // Assuming 10% tax
    let total = subtotal + tax;

    document.getElementById('subtotal').textContent = `${subtotal} RS`;
    document.getElementById('tax').textContent = `${tax} RS`;
    document.getElementById('total').textContent = `${total} RS`;
}

// Call the function to display cart items when the page loads
window.onload = displayCart;


// Retrieve product from localStorage
const cartItem = JSON.parse(localStorage.getItem("cartItem"));

if (cartItem) {
    // Create HTML to display the cart item
    const cartHtml = `
        <div class="cart-item">
            <img src="${cartItem.image}" alt="${cartItem.name}" width="100px">
            <h2>${cartItem.name}</h2>
            <p>Price: ${cartItem.price}</p>
            <p>Size: ${cartItem.size}</p>
            <p>Quantity: ${cartItem.quantity}</p>
        </div>
    `;

    // Insert cart HTML into the container
    document.getElementById("cartContainer").innerHTML = cartHtml;
} else {
    // Display message if the cart is empty
    document.getElementById("cartContainer").innerHTML = "<p>Your cart is empty.</p>";
}

document.getElementById("addToCartBtn").addEventListener("click", function(event) {
    event.preventDefault();

    // Get product details
    const product = {
        name: "Red Printed T-shirt by HRX",
        price: "300Rs.00",
        size: document.querySelector("select").value,
        quantity: document.querySelector("input[type='number']").value,
        image: "images/gallery-1.jpg"
    };

    // Store product in localStorage
    localStorage.setItem("cartItem", JSON.stringify(product));

    // Redirect to cart page
    window.location.href = "cart.html";
});