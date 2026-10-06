// =========================================
// AI INTERVIEW PREP
// SIGN UP JAVASCRIPT
// MONGODB + EMAIL BACKEND
// =========================================


function toggleSignupPassword() {

    const password =
        document.getElementById(
            "signupPassword"
        );


    if (!password) {
        return;
    }


    if (
        password.type === "password"
    ) {

        password.type = "text";

    } else {

        password.type = "password";

    }

}



function toggleConfirmPassword() {

    const password =
        document.getElementById(
            "confirmPassword"
        );


    if (!password) {
        return;
    }


    if (
        password.type === "password"
    ) {

        password.type = "text";

    } else {

        password.type = "password";

    }

}



async function createAccount(event) {

    event.preventDefault();


    // =====================================
    // GET FORM ELEMENTS
    // =====================================

    const nameElement =
        document.getElementById(
            "fullName"
        );


    const emailElement =
        document.getElementById(
            "signupEmail"
        );


    const passwordElement =
        document.getElementById(
            "signupPassword"
        );


    const confirmPasswordElement =
        document.getElementById(
            "confirmPassword"
        );


    const termsElement =
        document.getElementById(
            "terms"
        );


    if (
        !nameElement ||
        !emailElement ||
        !passwordElement ||
        !confirmPasswordElement ||
        !termsElement
    ) {

        alert(
            "Signup form elements are missing."
        );

        return;

    }


    // =====================================
    // GET VALUES
    // =====================================

    const name =
        nameElement.value.trim();


    const email =
        emailElement.value.trim();


    const password =
        passwordElement.value;


    const confirmPassword =
        confirmPasswordElement.value;


    const terms =
        termsElement.checked;


    // =====================================
    // VALIDATION
    // =====================================

    if (name === "") {

        alert(
            "Please enter your full name."
        );

        return;

    }


    if (email === "") {

        alert(
            "Please enter your email."
        );

        return;

    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;

    }


    if (
        password !== confirmPassword
    ) {

        alert(
            "Passwords do not match."
        );

        return;

    }


    if (!terms) {

        alert(
            "Please accept the Terms & Conditions."
        );

        return;

    }


    // =====================================
    // OPTIONAL FIELDS
    // =====================================

    const ageElement =
        document.getElementById(
            "age"
        );


    const phnoElement =
        document.getElementById(
            "phno"
        );


    const genderElement =
        document.getElementById(
            "gender"
        );


    const age =
        ageElement
            ? ageElement.value.trim()
            : "";


    const phno =
        phnoElement
            ? phnoElement.value.trim()
            : "";


    const gender =
        genderElement
            ? genderElement.value
            : "";


    // =====================================
    // USER DATA
    // =====================================

    const userData = {

        name: name,

        age: age,

        email: email,

        phno: phno,

        gender: gender,

        password: password

    };


    // =====================================
    // SUBMIT BUTTON
    // =====================================

    const submitButton =
        document.querySelector(
            'button[type="submit"], input[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Creating Account...";

    }


    // =====================================
    // SEND TO NODE.JS BACKEND
    // =====================================

    try {

        const response =
            await fetch(
                "/sign_up",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            userData
                        )

                }
            );


        const responseText =
            await response.text();


        // =================================
        // FAILED
        // =================================

        if (!response.ok) {

            alert(
                "Registration failed."
            );


            console.log(
                "Server response:",
                responseText
            );


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Create Account";

            }


            return;

        }


        // =================================
        // SUCCESS
        // =================================

        alert(
            "Account created successfully! 🎉\n\n" +
            "A welcome email has been sent to " +
            email
        );


        // =================================
        // SAVE BASIC LOGIN INFORMATION
        // =================================

        localStorage.setItem(
            "loggedInUserName",
            name
        );


        localStorage.setItem(
            "loggedInEmail",
            email
        );


        localStorage.setItem(
            "isLoggedIn",
            "true"
        );


        localStorage.setItem(
            "aiInterviewUser",
            JSON.stringify({

                name: name,

                email: email

            })
        );


        // =================================
        // GO TO LOGIN
        // =================================

        window.location.href =
            "login.html";

    }

    catch (error) {

        console.error(
            "Signup error:",
            error
        );


        alert(
            "Could not connect to the server.\n\n" +
            "Please make sure your Node.js server is running."
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Create Account";

        }

    }

}



function signupWithGoogle() {

    alert(
        "Google Sign Up will be connected to the backend later."
    );

}