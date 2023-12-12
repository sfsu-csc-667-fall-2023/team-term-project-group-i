const express = require("express");
const router = express.Router();
const { createHash } = require("crypto");

const handler = (request, response) => {
    const { id } = request.params;
    const { message } = request.body;
    const { email } = request.session.user;

    const io = request.app.get("io");

    io.emit(`chat:message:${id === undefined ? 0 : id}`, {
        hash: createHash('sha256').update(email).digest('hex'),
        from: email,
        timestamp: Date.now(),
        message, 
    });
    
    response.status(200);
};

router.post("/chat", handler);
router.post("/:id/chat", handler); 

module.exports = router; 