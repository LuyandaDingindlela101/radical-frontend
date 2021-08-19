let total_btn = document.querySelector(".total-btn")
let clear_btn = document.querySelector(".clear-btn")

// total_btn.addEventListener("click", getTotal);1
clear_btn.addEventListener("click", clearCart);


function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let container = document.querySelector(".cart-container")

    container.innerHTML = "";
    cart.forEach(item => {
        let product = item[0]
        container.innerHTML += renderCart(product);
    });
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let updated_cart = cart.filter(item => item[0].id != id);

    localStorage.setItem("cart", JSON.stringify(updated_cart));

    getCart();
}

function renderCart(product) {
    return `
            <div class="item" >
                <div class="image-container">
                    <img src="./images/product_1.jpg" alt="">
                </div>
                <div class="product-details">
                    <h2>${product.name}</h2>
                    <h3>${product.description}</h3>
                    <p>${product.price}</p>
                    <button onclick="removeFromCart(${product.id})">Remove item</button>
                </div>
            </div>
            `
}

function getCartById(id) {
    let cart_items = JSON.parse(localStorage.getItem("cart"));
    return cart_items.filter(product => product[0].id == id );
}

function getTotal() {
    let total = 0
    let cart = JSON.parse(localStorage.getItem("cart"))

    cart.forEach(item => total += parseInt(item[0].price))

    document.querySelector(".total").innerHTML = `(R${total})`
}

function clearCart() {
    localStorage.removeItem("cart");
}

getCart();
getTotal();