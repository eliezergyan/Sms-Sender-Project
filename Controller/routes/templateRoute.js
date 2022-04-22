const express = require('express');
const { pool } = require('../../Model/db_connect');

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



module.exports = templateRoute;