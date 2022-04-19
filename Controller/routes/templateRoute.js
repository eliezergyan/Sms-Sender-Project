const express = require('express');
const pool = require('../../Model/db_connect');

const templateRoute = express.Router();

templateRoute.get('/', async (req, res) => {
    try {
        const allTemplates = await pool.query("SELECT template_id, template_subject, template_body FROM templates");
        res.json(allTemplates.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

templateRoute.post('/', async (req, res) => {
    try {
        const { tempSubject, tempBody, receiver_contact} = req.body;
        const newTemplate = await pool.query("INSERT INTO templates(template_subject, template_body) VALUES ($1, $2) RETURNING * ",
        [tempSubject, tempBody]);
        const contacts = await pool.query("INSERT INTO receiver(receiver_contact) VALUES $1 RETURNING *", [receiver_contact]);
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



module.exports = templateRoute;