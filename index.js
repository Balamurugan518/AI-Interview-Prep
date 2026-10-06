// =========================================
// AI INTERVIEW PREP
// NODE.JS + EXPRESS + MONGODB + NODEMAILER
// =========================================

const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();


// =========================================
// MIDDLEWARE
// =========================================

app.use(cors());

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(express.static("public"));


// =========================================
// MONGODB CONNECTION
// =========================================

mongoose
    .connect("mongodb://127.0.0.1:27017/ai_interview_prep")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });


// =========================================
// USER SCHEMA
// =========================================

const userSchema = new mongoose.Schema({

    name: String,

    age: String,

    email: String,

    phno: String,

    gender: String,

    password: String

});

const User = mongoose.model("User", userSchema);


// =========================================
// NODEMAILER
// GMAIL + APP PASSWORD
// =========================================

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});


// =========================================
// TEST GMAIL CONNECTION
// =========================================

transporter.verify((error, success) => {

    if (error) {

        console.log("");
        console.log("====================================");
        console.log("GMAIL CONNECTION FAILED");
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        console.log("");

    } else {

        console.log("");
        console.log("====================================");
        console.log("GMAIL NODEMAILER READY");
        console.log("EMAIL:", process.env.EMAIL_USER);
        console.log("====================================");
        console.log("");

    }

});


// =========================================
// HOME
// =========================================

app.get("/", (req, res) => {

    res.sendFile(
        __dirname + "/public/index.html"
    );

});


// =========================================
// SIGN UP
// =========================================

app.post("/sign_up", async (req, res) => {

    try {

        const {
            name,
            age,
            email,
            phno,
            gender,
            password
        } = req.body;


        console.log("");
        console.log("====================================");
        console.log("NEW USER REGISTRATION");
        console.log("NAME:", name);
        console.log("EMAIL:", email);
        console.log("====================================");


        // =================================
        // VALIDATION
        // =================================

        if (!name || !email || !password) {

            return res.status(400).send(`

                <h2>Registration Failed</h2>

                <p>
                    Name, Email and Password are required.
                </p>

                <a href="/signup.html">
                    Go Back
                </a>

            `);

        }


        // =================================
        // CHECK EXISTING USER
        // =================================

        const existingUser =
            await User.findOne({
                email: email
            });


        if (existingUser) {

            return res.status(400).send(`

                <h2>Email Already Registered</h2>

                <p>
                    This email is already registered.
                </p>

                <a href="/login.html">
                    Go To Login
                </a>

            `);

        }


        // =================================
        // SAVE USER TO MONGODB
        // =================================

        const newUser = new User({

            name: name,

            age: age,

            email: email,

            phno: phno,

            gender: gender,

            password: password

        });


        await newUser.save();


        console.log("");
        console.log("USER SAVED TO MONGODB");
        console.log("EMAIL:", email);
        console.log("");


        // =================================
        // WELCOME EMAIL
        // SAME METHOD AS SIR'S FILE
        // =================================

        const mailOptions = {

            from: process.env.EMAIL_USER,

            to: email,

            subject: "Welcome to AI Interview Prep!",

            text:
`Hello ${name},

Welcome to AI Interview Prep!

Your account has been successfully created.

You can now use our platform to:

- Practice AI interviews
- Improve your interview skills
- Answer technical questions
- Track your interview performance

We're happy to have you with us!

Regards,
AI Interview Prep Team`

        };


        console.log("====================================");
        console.log("SENDING WELCOME EMAIL");
        console.log("FROM:", process.env.EMAIL_USER);
        console.log("TO:", email);
        console.log("====================================");


        // =================================
        // SEND EMAIL
        // =================================

        const info =
            await transporter.sendMail(
                mailOptions
            );


        // =================================
        // EMAIL RESULT
        // =================================

        console.log("");
        console.log("====================================");
        console.log("EMAIL SENT SUCCESSFULLY");
        console.log("====================================");

        console.log("Message ID:");
        console.log(info.messageId);

        console.log("");

        console.log("Accepted:");
        console.log(info.accepted);

        console.log("");

        console.log("Rejected:");
        console.log(info.rejected);

        console.log("");

        console.log("Response:");
        console.log(info.response);

        console.log("====================================");
        console.log("");


        // =================================
        // SUCCESS PAGE
        // =================================

        res.send(`

            <!DOCTYPE html>

            <html>

            <head>

                <title>Registration Successful</title>

                <style>

                    body {

                        font-family: Arial, sans-serif;

                        background: #f2f2f2;

                        display: flex;

                        justify-content: center;

                        align-items: center;

                        height: 100vh;

                    }

                    .box {

                        background: white;

                        padding: 40px;

                        border-radius: 10px;

                        box-shadow:
                            0 4px 10px
                            rgba(0,0,0,0.2);

                        text-align: center;

                        width: 400px;

                    }

                    h2 {

                        color: #28a745;

                    }

                    a {

                        display: inline-block;

                        margin-top: 20px;

                        padding: 10px 20px;

                        background: #6d28d9;

                        color: white;

                        text-decoration: none;

                        border-radius: 6px;

                    }

                </style>

            </head>


            <body>

                <div class="box">

                    <h2>
                        Registration Successful!
                    </h2>

                    <p>
                        Welcome ${name}!
                    </p>

                    <p>
                        Your account has been created successfully.
                    </p>

                    <p>
                        Welcome email sent to:
                    </p>

                    <b>
                        ${email}
                    </b>

                    <br>

                    <a href="/login.html">
                        Go To Login
                    </a>

                </div>

            </body>

            </html>

        `);

    }


    catch (error) {

        console.log("");
        console.log("====================================");
        console.log("SIGNUP / EMAIL ERROR");
        console.log("====================================");
        console.log(error);
        console.log("====================================");
        console.log("");


        // =================================
        // DUPLICATE EMAIL
        // =================================

        if (error.code === 11000) {

            return res.status(400).send(`

                <h2>
                    Email Already Registered
                </h2>

                <p>
                    Please use another email.
                </p>

                <a href="/login.html">
                    Go To Login
                </a>

            `);

        }


        // =================================
        // OTHER ERROR
        // =================================

        res.status(500).send(`

            <h2>
                Registration Failed
            </h2>

            <p>
                ${error.message}
            </p>

            <a href="/signup.html">
                Go Back
            </a>

        `);

    }

});


// =========================================
// LOGIN
// =========================================

app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({

                email: email,

                password: password

            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        console.log(
            "Login successful:",
            user.email
        );


        return res.json({

            success: true,

            message:
                "Login successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    }


    catch (error) {

        console.log(
            "Login error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Something went wrong."

        });

    }

});


// =========================================
// START SERVER
// =========================================

const PORT = 7000;


app.listen(
    PORT,
    () => {

        console.log("");

        console.log("====================================");
        console.log("AI INTERVIEW PREP SERVER STARTED");
        console.log(
            "http://localhost:" + PORT
        );
        console.log("====================================");

        console.log("");

    }
);