const express = require('express');

const loginRouter = express.Router();


loginRouter.get('/', (req, res) => {
    res.json({"login": "Welcome"});
});

module.exports = loginRouter;