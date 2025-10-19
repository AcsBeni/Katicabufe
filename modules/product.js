const express = require('express');
const router = express.Router();
const pool = require('../utils/database');

router.get('/', (req,res) => {
    pool.query('SELECT DISTINCT termek FROM forgalom', (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    });
})
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {termek } = req.body;
    pool.query(`UPDATE forgalom SET termek=? WHERE id = ?`, [termek, id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
        res.status(200).json({ message: "Termék updated", results });
    });
});
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`DELETE FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()}
);});
module.exports = router
