const express = require('express');
const pool = require('../../Model/db_connect');

const templateRoute = express.Router();

templateRoute.get('/', async (req, res) => {
    try {
        const allTemplates = await pool.query("SELECT template_id, template_subject, template_body FROM template");
        res.json(allTemplates.rows);
        
    } catch (err) {
        console.error(err.message);
    }
});

templateRoute.post('/', async (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = templateRoute;