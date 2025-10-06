const express = require("express")
const router = express.Router()
const pool = require('../utils/database')

// GET statistics

router.get('/', (req,res) => {
    
   pool.query('SELECT(SELECT COUNT(DISTINCT vevo) as userCount FROM forgalom) AS userCount, (SELECT COUNT(DISTINCT termek) FROM forgalom) as productsCount, (SELECT SUM(mennyiseg)from forgalom) as mennyiseg', (error, results, fields) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results[0],results[1])
      });
    })


module.exports = router