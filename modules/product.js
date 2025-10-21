const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');


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
    query('SELECT * FROM termekek', [],(error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    },req);
})
router.post('/', (req, res) => {
    const { categoryID,nev,  egyseg,ar } = req.body;
    query(`INSERT INTO termekek (categoryID, nev, egyseg, ar) 
     VALUES (?, ?, ?, ?)`,[categoryID, nev, egyseg,ar], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    },req);
});

router.get('/:id', (req,res) => {
    let id = req.params.id;
    query(`SELECT * FROM termekek WHERE termekID=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    },req)
})
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {nev, egyseg, categoryID, ar } = req.body;
    query(`UPDATE termekek SET nev=?, egyseg=?, categoryID=?, ar=? WHERE termekID =?`, [nev,egyseg,categoryID, ar, id], (error, results) => {
        if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" +error });
        res.status(200).json({ message: "Termék updated", results });
    },req);
});
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM termekek WHERE termekID=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()},req
);});
module.exports = router
