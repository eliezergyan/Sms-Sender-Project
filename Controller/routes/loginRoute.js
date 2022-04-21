const express = require('express');
const pool = require('../../Model/db_connect');

const loginRouter = express.Router();


loginRouter.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = await pool.query("SELECT user_password FROM users WHERE username=$1 ", [username]);
        if(users.rows[0].user_password === password){
            res.json({"message": "success"});
        }
        else {
            res.json({"message": "failed"});
        }
        
    } catch (err) {
        console.error(err.message);
    }
  
});

module.exports = loginRouter;