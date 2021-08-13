let login_form = document.querySelector(".login-form");
let reg_form = document.querySelector(".register-form");

if (login_form != null) {
    login_form.addEventListener("submit", e => {
        e.preventDefault();

        let user_details = {
            username: document.querySelector("input[name='username']").value, 
            password: document.querySelector("input[name='password']").value
        }

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
    })
}

if (reg_form != null) {
    reg_form.addEventListener("submit", e => {
        //  PREVENT THE DEFAULT ACTION OF THE FORM 
        e.preventDefault();
        
        //  CREATE AN OBJECT CONTAINING ALL THE INPUTS VALUES
        let new_user = {
            first_name: document.querySelector("input[name='first_name']").value,
            last_name: document.querySelector("input[name='last_name']").value, 
            username: document.querySelector("input[name='username']").value,
            email_address: document.querySelector("input[name='email_address']").value,
            address: document.querySelector("input[name='address']").value, 
            password: document.querySelector("input[name='password']").value
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
