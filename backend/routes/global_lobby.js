const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
    response.render("global_lobby")
}); 

module.exports = router; 