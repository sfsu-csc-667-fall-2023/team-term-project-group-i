const express = require("express");
const router = express.Router();

router.get("/sign_up", (request, response) => {
    response.render("sign_up")
}); 

module.exports = router; 