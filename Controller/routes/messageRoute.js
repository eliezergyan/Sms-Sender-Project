const express = require("express");
const { pool }= require('../../Model/db_connect');
const credentials  = {
    apiKey: "8b0225c779bfa167afdabffc7ed58cc7824086720d2770ab735b84ff5a2c41f9",
    username: "octosenda" 
}


const AT = require('africastalking')(credentials);

const messageRoute = express.Router();

const sms = AT.SMS;

messageRoute.get('/', async (req, res) => {
    try {
        const allMessages = await pool.query("SELECT message_id, message_subject, message_body, receiver_contact FROM message ORDER BY message_id DESC");
        res.json(allMessages.rows);       
    } catch (err) {
        console.error(err.message);
    }
});

messageRoute.post('/', async (req, res) => {
    try {
        const { messageSubject, messageBody, messageReceiver} = req.body;
        const newMessage = await pool.query("INSERT INTO message(message_subject, message_body, date_time_sent, receiver_contact) VALUES ($1, $2, current_timestamp, $3) RETURNING * ", 
        [messageSubject, messageBody, messageReceiver]);
        res.json({"message": "message_sent"});
        
    } catch (err) {
        console.error(err.message)
    }

});

messageRoute.post('/send_message', async (req, res) => {
        const { messageBody, splitContacts} = req.body;
        const options = {
            to: splitContacts,
            message: messageBody,
            from: "OctoSenda"
        }
        sms.send(options).then(info => {
            res.json(info)
        }).catch(err => {
            console.log(err);
        });

})

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