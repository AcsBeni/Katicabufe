const express = require('express');
const router = express.Router();
const pool = require('../utils/database');
const logger = require('../utils/logger')



// Select all
router.get("/", (req, res)=>{
    pool.query('SELECT * FROM kategoria', (error, results) =>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        logger.info(`[Get /categories] ${results.length} rekord küldve válaszként`)
        res.status(200).json(results)
    });
});

// Select one category by id
router.get('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`SELECT * FROM kategoria WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    })
});

// Post new category
router.post('/', (req, res) => {
    console.log(req.body)
    const { categoryName } = req.body;
    pool.query(`INSERT INTO kategoria (categoryName) VALUES (?)`,[categoryName], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results)
    });
});

// Update category
router.patch('/:id',(req, res)=>{
    let id = req.params.id;
    const {categoryName} = req.body;
    pool.query(`UPDATE kategoria SET categoryName =? WHERE id=?`,[categoryName, id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()
    })
    
});

// Delete category
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`DELETE FROM kategoria WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()})
});

module.exports = router;