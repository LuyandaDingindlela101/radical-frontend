let login_form = document.querySelector(".login-form");
let reg_form = document.querySelector(".register-form");

if (login_form != null) {
    login_form.addEventListener("submit", e => {
        e.preventDefault();

        let user_details = {
            username: document.querySelector("input[name='username']").value, 
            password: document.querySelector("input[name='password']").value
        }

        console.log(user_details);

        fetch("https://radical-store.herokuapp.com/user-login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_details)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if(data.status_code == 201) {
                localStorage.setItem("current_user", JSON.stringify(data.current_user))
                getToken(user_details);

                window.location.href = "main.html";
            }
        })
    })
}

if (reg_form != null) {
    reg_form.addEventListener("submit", e => {
        //  PREVENT THE DEFAULT ACTION OF THE FORM 
        e.preventDefault();
        
        //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
        let new_user = {
            address: document.querySelector("input[name='address']").value, 
            password: document.querySelector("input[name='password']").value,
            username: document.querySelector("input[name='username']").value,
            last_name: document.querySelector("input[name='last_name']").value, 
            first_name: document.querySelector("input[name='first_name']").value,
            email_address: document.querySelector("input[name='email_address']").value
        }
        
        console.log(new_user);
        
        fetch("https://radical-store.herokuapp.com/user-registration/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_user)
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data); 
            
            let current_user = res.current_user;
            localStorage.setItem("current_user", JSON.stringify(current_user))
        });
    })
}

function getToken(user_details) {
        fetch("https://radical-store.herokuapp.com/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user_details)
        })
        .then(response => response.json())
        .then(data => { 
            console.log(data); 
            
            if (data["access_token"]) {
                console.log(data);
                localStorage.setItem("jwt_token", data["access_token"]);

            }
        });
}