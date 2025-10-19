const express = require('express');
const router = express.Router();
const pool = require('../utils/database');

router.get('/', (req,res) => {
    pool.query('SELECT nettoar, id FROM forgalom', (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    });
})


module.exports = router;