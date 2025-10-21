const express = require('express');
const router = express.Router();
const pool = require('../utils/database');


/*


new file
INSERT INTO termekek (termekID, categoryID, nev, egyseg, ar)
SELECT f.id, f.kategoriaId, f.termek, f.egyseg, f.nettoar
FROM forgalom f
WHERE f.id NOT IN (SELECT termekID FROM termekek); */
/*
INSERT INTO termekek (termekID, categoryID, nev, egyseg, ar)
SELECT id, kategoriaId, termek, egyseg, nettoar
FROM forgalom; */
router.get('/', (req,res) => {
    pool.query('SELECT * FROM termekek', (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    });
})
router.post('/', (req, res) => {
    const { categoryID,nev,  egyseg,ar } = req.body;
    pool.query(`INSERT INTO termekek (categoryID, nev, egyseg, ar) 
     VALUES (?, ?, ?, ?)`,[categoryID, nev, egyseg,ar], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    });
});

router.get('/:id', (req,res) => {
    let id = req.params.id;
    pool.query(`SELECT * FROM termekek WHERE termekID=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    })
})
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {nev, egyseg, categoryID, ar } = req.body;
    pool.query(`UPDATE termekek SET nev=?, egyseg=?, categoryID=?, ar=? WHERE termekID =?`, [nev,egyseg,categoryID, ar, id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" +error });
        res.status(200).json({ message: "Termék updated", results });
    });
});
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`DELETE FROM termekek WHERE termekID=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()}
);});
module.exports = router
