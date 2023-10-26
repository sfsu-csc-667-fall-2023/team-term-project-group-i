const express = require("express");
const router = express.Router();

router.get("/:name", (request, response) => {
    const { name } = request.params;

    response.render('root', { name });
});

module.exports = router;