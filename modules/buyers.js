const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');


/*
INSERT INTO `vevo`(`vevoID`, `name`) SELECT forgalom.id,forgalom.vevo FROM forgalom */
// Get buyers
router.get('/', (req,res) => {
    query('SELECT vevo FROM forgalom',[], (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    });
})
// Buyer name update if it's the same name
router.patch('/:vevo', (req, res) => {
    let searchedvevo = req.params.vevo;
    
    const {vevo } = req.body;
    query(`UPDATE forgalom SET vevo=? WHERE vevo=?`, [vevo, searchedvevo], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
        res.status(200).json({ message: "Vevő updated", results , hello: `hello ${searchedvevo}`});
    });
});
// Delete buyer
router.delete('/:vevo',(req, res)=>{
    let vevo = req.params.vevo;
    query(`DELETE FROM forgalom WHERE vevo=?`,[vevo], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()}
);});

//patch buyer by id
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const { vevo } = req.body;
    query(`UPDATE forgalom SET vevo=? WHERE id=?`, [vevo, id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
        res.status(200).json({ message: "Vevő updated", results });
    });
});

module.exports = router