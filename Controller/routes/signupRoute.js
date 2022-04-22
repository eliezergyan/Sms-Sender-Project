const express = require("express");
const { pool } = require('../../Model/db_connect');

const signupRoute = express.Router();

signupRoute.post('/', async(req, res) => {
    const { firstName, lastName, username, email, password, confirmpassword} = req.body;
    try {
        if(password === confirmpassword){
            const newUser = await pool.query("INSERT INTO users (user_first_name, user_last_name, username, user_email, user_password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [firstName, lastName, username, email, password])
            res.json({"message": "success"})
        } else {
            res.json({"message": "failed"})
        }
        
    } catch (err) {
         console.error(err.message);
    }
    
    
})

module.exports = signupRoute;