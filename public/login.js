// =========================================
// AI INTERVIEW PREP
// LOGIN - MONGODB CONNECTION
// =========================================

async function loginUser(event) {

    event.preventDefault();

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    if (!emailInput || !passwordInput) {

        alert("Login form fields not found.");
        return;

    }

    const email =
        emailInput.value.trim().toLowerCase();

    const password =
        passwordInput.value;

    if (email === "") {

        alert("Please enter your email.");
        return;

    }

    if (password === "") {

        alert("Please enter your password.");
        return;

    }


    const button =
        document.querySelector(
            'button[type="submit"]'
        );

    if (button) {

        button.disabled = true;
        button.textContent = "Logging in...";

    }


    try {

        const response =
            await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            });


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            alert(
                data.message ||
                "Login failed."
            );

            if (button) {

                button.disabled = false;
                button.textContent = "Login";

            }

            return;

        }


        // =====================================
        // USER DATA FROM MONGODB
        // =====================================

        const user =
            data.user;


        const userName =
            user.name;

        const userEmail =
            user.email;


        // =====================================
        // SAVE LOGIN INFORMATION
        // =====================================

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "userLoggedIn",
            "true"
        );

        localStorage.setItem(
            "loggedInUserName",
            userName
        );

        localStorage.setItem(
            "loggedInEmail",
            userEmail
        );

        localStorage.setItem(
            "userName",
            userName
        );


        // =====================================
        // SAVE USER OBJECT
        // =====================================

        localStorage.setItem(
            "aiInterviewUser",
            JSON.stringify({

                name: userName,

                email: userEmail

            })
        );


        // =====================================
        // SESSION STORAGE
        // =====================================

        sessionStorage.setItem(
            "isLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "loggedIn",
            "true"
        );

        sessionStorage.setItem(
            "userLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "loggedInUserName",
            userName
        );

        sessionStorage.setItem(
            "loggedInEmail",
            userEmail
        );

        sessionStorage.setItem(
            "userName",
            userName
        );


        // =====================================
        // SUCCESS
        // =====================================

        alert(
            "Login successful! Welcome " +
            userName +
            " 👋"
        );


        window.location.href =
            "index.html";

    }

    catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Cannot connect to the server."
        );


        if (button) {

            button.disabled = false;
            button.textContent = "Login";

        }

    }

}


// =========================================
// SHOW / HIDE PASSWORD
// =========================================

function toggleLoginPassword() {

    const password =
        document.getElementById(
            "loginPassword"
        );

    if (!password) {
        return;
    }


    if (
        password.type === "password"
    ) {

        password.type = "text";

    }

    else {

        password.type = "password";

    }

}


// =========================================
// FORGOT PASSWORD
// =========================================

function forgotPassword() {

    alert(
        "Password recovery will be added later."
    );

}


// =========================================
// GOOGLE LOGIN
// =========================================

function loginWithGoogle() {

    alert(
        "Google Login will be connected later."
    );

}