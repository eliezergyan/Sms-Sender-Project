const express = require("express");
const pool = require('../../Model/db_connect');

const signupRoute = express.Router();

signupRoute.post('/', async(req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword} = req.body;
    try {
        if(password === confirmPassword){
            const newUser = await pool.query("INSERT INTO users (user_first_name, user_last_name, username, user_email, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, lastName, username, email, password])
            res.send(newUser.rows[0]);
        } else {
            res.send("Check details and try again");
        }
        
    } catch (err) {
        console.error(err.message);
    }
    
    
})

module.exports = signupRoute;