const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');




// Select all
router.get("/", (req, res)=>{
    query('SELECT * FROM kategoria',[], (error, results) =>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
      
        res.status(200).json(results)
    },req);
});

// Select one category by id
router.get('/:id',(req, res)=>{
    let id = req.params.id;
    query(`SELECT * FROM kategoria WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    },req)
});

// Post new category
router.post('/', (req, res) => {
    console.log(req.body)
    const { categoryName } = req.body;
    query(`INSERT INTO kategoria (categoryName) VALUES (?)`,[categoryName], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results)
    });
});

// Update category
router.patch('/:id',(req, res)=>{
    let id = req.params.id;
    const {categoryName} = req.body;
    query(`UPDATE kategoria SET categoryName =? WHERE id=?`,[categoryName, id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()
    },req)
    
});

// Delete category
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM kategoria WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()} ,req)
});

module.exports = router;