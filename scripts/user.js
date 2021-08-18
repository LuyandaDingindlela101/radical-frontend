function getUser() {
    let container = document.querySelector(".user-container");
    let current_user = JSON.parse(localStorage.getItem("current_user"));

    container.innerHTML = renderUser(current_user)
}

function renderUser(user) {
    return `
            <div class="item" >
                <h2>Name: ${user[1]} ${user[2]} | username: ${user[3]}</h2>
                <h3>Address: ${user[4]}</h3>
                <p>Phone number: ${user[5]}</p>
                <p>Email address: ${user[6]}</p>
            </div>
            `
}

getUser();

