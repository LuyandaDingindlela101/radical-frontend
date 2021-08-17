function getCart() {
    let cart = JSON.parse(localStorage.getItem("cart"))
    let container = document.querySelector(".cart-container")

    cart.forEach(item => {
        console.log(item[0]);
        // container.innerHTML += item
    });
}


getCart()