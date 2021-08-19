let edit_form = document.querySelector(".edit-product-form");
let add_form = document.querySelector(".add-product-form");

add_form.addEventListener("submit", e => {
    //  PREVENT THE DEFAULT ACTION OF THE FORM 
    e.preventDefault();
    
    //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
    let new_item = {
        name: document.querySelector(".add-name").value,
        price: document.querySelector(".add-price").value, 
        category: document.querySelector(".add-category").value,
        review: document.querySelector(".add-review").value, 
        description: document.querySelector(".add-description").value
    }

    console.log(new_item);
    
    //  CALL THE addProduct FUNCTION AND PASS IN THE new_item
    addProduct(new_item);
})

//  ON SUBMISSION OF THE edit_form, RUN THE FOLLOWING CODE
edit_form.addEventListener("submit", e => {
    //  PREVENT THE DEFAULT ACTION OF THE FORM 
    e.preventDefault();
    
    //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
    let updated_item = {
        name: document.querySelector(".edit-name").value,
        price: document.querySelector(".edit-price").value, 
        category: document.querySelector(".edit-category").value,
        review: document.querySelector(".edit-review").value, 
        description: document.querySelector(".edit-description").value
    }

    console.log(updated_item);
    
    //  CALL THE updateProduct FUNCTION AND PASS IN THE updated_item
    updateProduct(updated_item);
})

//  FUNCTION WILL MAKE AN API CALL AND GET THE PRODUCTS
function getProducts() {
    fetch("https://radical-store.herokuapp.com/show-products/")
    .then(responce => responce.json())
    .then(data => {
        console.log(data);

        if (data.status_code == 201) {
            let products_list = [];
            let products = data.products;
            let products_container = document.querySelector(".products-container");

            products.forEach(product => {
                let product_object = {
                    id: product[0],
                    name: product[1],
                    description: product[2],
                    price: product[3],
                    category: product[4],
                    review: product[5]
                }

                products_list.push(product_object)
            })

            // SAVE INCOMMING products TO LOCALSTORAGE TO MINIMIZE API CALLS
            localStorage.setItem("products", JSON.stringify(products_list));
    
            //  CLEAR THE CONTENTS OF THE products_container BEFORE POPULATING IT
            products_container.innerHTML = " ";
    
            // LOOP THROUGH THE products AND CREATE A PRODUCT CARD FOR EACH PRODUCT AND WRITE IT TO THE products_container
            products_list.forEach(product => {
                products_container.innerHTML += renderProducts(product);
            });
        } 
    });
}

// FUNCTION WILL RENDER THE PRODUCT CARDS
function renderProducts(product) {
    return `
            <div class="product">
                <div class="buttons-container">
                    <button class="edit-btn" onclick="getProductToEdit(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="product-image" onclick="viewProduct(${product.id})">
                    <img src="./images/product_1.jpg" alt="">
                </div>
                <div class="product-body">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <button class="cart-btn" onclick="addToCart(${product.id})">Add to cart</button>
                </div>
            </div>
            `
}

//  FUNCTION WILL RENDER A SINGE PRODUCT
function renderProduct(product) {
    console.log(product[0]);
    return `
                <div class="product-container">
                    <div class="product-image">
                        <img src="./images/product_1.jpg" alt="">
                    </div>
                    <div class="product-description">
                        <h2>${product[0].name}</h2>
                        <h3>${product[0].price}</h3>
                        <p>
                            ${product[0].description}
                        </p>
                        <div class="quantity-container">
                            <form class="quantity-form">
                                <input type="number" name="quantity" class="quantity">
                                <input type="submit" value="add to cart" class="cart-btn">
                            </form>
                        </div>
                        <h4>Reviews</h4>
                        <p>
                            ${product[0].review}
                        </p>
                    </div>
                </div>
                <div class="product-info">
                    <div class="tabs-container">
                        <button class="tab description active">description</button>
                        <button class="tab reviews">reviews</button>
                    </div>
                    <div class="tab-info">
                        <h4>Description</h4>
                        <p>
                            ${product[0].description}
                        </p>
                    </div>
                </div>
            `
}

//  FUNCTION WILL RENDER THE EDIT PRODUCT FORM 
function renderEditForm(product) {
    return `
                <form class="product-form">
                    <div class="row">
                        <div class="column">
                            <label for="name">name</label>
                            <input type="text" name="name" value="${product.name}">
                        </div>
                        <div class="column">
                            <label for="price">price</label>
                            <input type="text" name="price" value="${product.price}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="column">
                            <label for="category">category</label>
                            <select name="category">
                                <option value="VASES">VASES</option>
                                <option value="LIGHTING">LIGHTING</option>
                                <option value="HOME DECORE">HOME DECORE</option>
                                <option value="DECORATION">DECORATION</option>
                            </select>
                        </div>
                        <div class="column">
                            <label for="reviews">reviews</label>
                            <input type="text" name="reviews" value="${product.review}">
                        </div>
                    </div>
                    <label for="description">description</label>
                    <textarea name="description" value="${product.description}"></textarea>
                    <button type="submit">edit product</button>
                </form>
            `
}

function addProduct(new_item) {
    fetch("https://radical-store.herokuapp.com/add-product/", {
        method: 'POST',
        //  PASS IN A JSON VERSION OF THE new_item
        body: JSON.stringify(new_item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(responce => responce.json())
    .then(data => console.log(data))

    getProducts();
}

//  FUNCTION WILL SHOW A PRODUCT BASED ON THE id PROVIDED
function viewProduct(id) {
    console.log(id);
    //  GET THE PRODUCT WITH A MATCHING id AS THE ONE PROVIDED
    let product = getProductById(id);
    let product_container = document.querySelector(".view-product-section");

    //  REMOVE THE active CLASS FROM ALL THE sections
    sections.forEach(section => section.classList.remove("active"));
    //  ADD THE active CLASS TO THE view-product-section ELEMENT
    document.querySelector(".view-product-section").classList.add("active");

    //  CLEAR THE CONTENTS OF THE product_container BEFORE POPULATING IT
    product_container.innerHTML = " ";
    //  RENDER THE PRODUCT INSIDE THE product_container
    product_container.innerHTML = renderProduct(product);
}

//  FUNCTION WILL GET THE PRODUCT TO BE EDITED BASED ON THE GIVEN id AND RENDER THE EDIT FORM
function getProductToEdit(id) {
    //  GET THE PRODUCT WITH A MATCHING id AS THE ONE PROVIDED
    let product = getProductById(id);

    //  REMOVE THE active CLASS FROM ALL THE sections
    sections.forEach(section => section.classList.remove("active"));
    //  ADD THE active CLASS TO THE edit-product-section ELEMENT
    document.querySelector(".edit-product-secton").classList.add("active");

    //  CLEAR THE CONTENTS OF THE product_container BEFORE POPULATING IT
    product_container.innerHTML = " ";
    //  RENDER THE PRODUCT INSIDE THE product_container
    product_container.innerHTML = renderEditForm(product);
}

//  FUNCTION WILL UPDATE A PRODUCT WITH THE PROVIDED DETAILS USING THE PUT METHOD
function updateProduct(updated_item) {
    fetch(`https://radical-store.herokuapp.com/edit-product/${id}`, {
        method: 'PUT',
        //  PASS IN A JSON VERSION OF THE updated_item
        body: JSON.stringify(updated_item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

//  FUNCTION WILL DELETE A PRODUCT WITH THE PROVIDED id
function deleteProduct(id) {
    fetch(`https://radical-store.herokuapp.com/delete-product/${id}`)
    .then(response => response.json())
    .then(data => console.log(data));

    renderProducts();
}

function addToCart(id) {
    let product = getProductById(id);
    let cart_items = JSON.parse(localStorage.getItem("cart"));

    if (cart_items == null) { cart_items = [] }
    
    cart_items.push(product)
    localStorage.setItem("cart", JSON.stringify(cart_items));
}

function getProductById(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.filter(product => product.id == id );
}

getProducts();