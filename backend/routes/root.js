const express = require("express");
const router = express.Router();

// router.get("/", (request, response) => {
//     response.send("Hello world from within a route!");
// })


//here the 'get' can be adjusted to display specific statements based on name
router.get("/:name", (request, response) => {
    const { name } = request.params;
    
    response.render('root', { name })
}); 



module.exports = router; 
