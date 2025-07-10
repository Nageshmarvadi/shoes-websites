// cart.js

// Cart Array
let cart = [];

// Add to Cart Logic
function addToCart(productName, productPrice) {
  const product = {
    name: productName,
    price: productPrice,
    quantity: 1
  };

  const existingItem = cart.find(item => item.name === product.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(product);
  }

  updateCartUI();
}

// Update Cart UI + Total
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');

    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: ₹${item.price}</p>
      <div style="margin: 8px 0;">
        Quantity: 
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span style="margin: 0 10px;">${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalEl.innerText = total;

  setupCartActions();
}

// Quantity & Remove Button Actions
function setupCartActions() {
  // Quantity +/-
  const qtyButtons = document.querySelectorAll('.qty-btn');
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      const action = btn.getAttribute('data-action');

      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      }

      updateCartUI();
    });
  });

  // Remove Buttons
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      cart.splice(index, 1);
      updateCartUI();
    });
  });
}

// Cart Sidebar Toggle
document.getElementById('open-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.add('active');
});

document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.remove('active');
});

// Add-to-Cart Button Listeners (DOM Loaded)
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      addToCart(name, price);
    });
  });
});
