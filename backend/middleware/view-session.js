const viewSessionData = (request, response, next) => {
    console.log(request.session);
    next();
}

module.exports = { viewSessionData }