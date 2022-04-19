const express = require("express");
const pool = require('../../Model/db_connect');

const messageRoute = express.Router();

messageRoute.get('/', async (req, res) => {
    try {
        const allMessages = await pool.query("SELECT message_id, message_subject, message_body, receiver_contact FROM message");
        res.json(allMessages.rows);       
    } catch (err) {
        console.error(err.message);
    }
});

messageRoute.post('/', async (req, res) => {
    try {
        const { msgSubject, msgBody, msgReceiver} = req.body;
        const newMessage = await pool.query("INSERT INTO message(message_subject, message_body, date_time_sent, receiver_contact) VALUES ($1, $2, current_timestamp, $3) RETURNING * ", 
        [msgSubject, msgBody, msgReceiver]);
        res.json({"message": "message_sent"});
        
    } catch (err) {
        console.error(err.message)
    }

});

messageRoute.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getMessage = await pool.query("SELECT message_subject, message_body, receiver_contact FROM message WHERE message_id = $1", [id]);
        res.json(getMessage.rows);
        
    } catch (err) {
        console.error(err.message);
    }

})

module.exports = messageRoute;