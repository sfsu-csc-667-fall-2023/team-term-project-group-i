const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const SALT_ROUNDS = 10;

const { Users } = require("../db");

router.get("/sign_up", (_request, response) => {
    response.render("sign_up");
});

router.post("/sign_up", async (request, response) => {
    // Given a clear text password, encrypt and check for credentials
    const { email, password } = request.body;

    //First check if they exist and redirect to sign in
    const user_exists = await Users.email_exists(email);
    if(user_exists) {
        response.redirect("/");
        return;
    }
    //Encrypt the clear text password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    //Store in the DB
    const { id } = Users.create(email, hash);

    // TODO: Store in session

    //Redirect to lobby
    response.redirect("/lobby");
});

router.post("/sign_in", async (request, response) => {
    // Given data, add user to Users table; redirect to global lobby
    const { email, password } = request.body;

    try {
        const user = await Users.find_by_email(email);
        const isValidUser = await bcrypt.compare(password, user.password);

        if(isValidUser) {
            //TODO: Store in session
            
            response.redirect("/lobby");
            return;
        } else {
            response.render("landing", { error: "The credentials you supplied are invalid.", });
        }
    } catch (error) {
        console.log(error);
        response.render("landing", { error: "The credentials you supplied are invalid.", });
    }
    


});

module.exports = router; 