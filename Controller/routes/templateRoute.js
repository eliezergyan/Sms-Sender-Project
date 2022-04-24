const express = require('express');
const pool = require('../../Model/db_connect');

const credentials  = {
    apiKey: "8b0225c779bfa167afdabffc7ed58cc7824086720d2770ab735b84ff5a2c41f9",
    username: "octosenda" 
}

const AT = require('africastalking')(credentials);

const sms = AT.SMS;

const templateRoute = express.Router();

templateRoute.get('/', async (req, res) => {
    try {
        const allTemplates = await pool.query("SELECT template_id, template_subject, template_body, template_contacts FROM templates ORDER BY template_id DESC");
        res.json(allTemplates.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

templateRoute.post('/', async (req, res) => {
    try {
        const { messageSubject, messageBody, contacts} = req.body;
        const newTemplate = await pool.query("INSERT INTO templates(template_subject, template_body, template_contacts) VALUES ($1, $2, $3) RETURNING * ",
        [messageSubject, messageBody, contacts]);
        res.json(newTemplate.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

templateRoute.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getTemplate = await pool.query("SELECT template_subject, template_body FROM templates WHERE template_id = $1", [id]);
        res.json(getTemplate.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

templateRoute.post('/send_message', async (req, res) => {
    const { templateBody, splitContacts} = req.body;
    const options = {
        to: splitContacts,
        message: templateBody,
        from: "OctoSenda"
    }
    sms.send(options).then(info => {
        res.json(info)
    }).catch(err => {
        console.log(err);
    });

})

templateRoute.post('/message', async (req, res) => {
    try {
        const { templateSubject, templateBody, messageReceiver} = req.body;
        const newMessage = await pool.query("INSERT INTO message(message_subject, message_body, date_time_sent, receiver_contact) VALUES ($1, $2, current_timestamp, $3) RETURNING * ", 
        [templateSubject, templateBody, messageReceiver]);
        res.json({"message": "message_sent"});
        
    } catch (err) {
        console.error(err.message)
    }

});

module.exports = templateRoute;