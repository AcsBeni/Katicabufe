const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');
// Select all
router.get('/', (req,res) => {
    query('SELECT forgalom.id, forgalom.termek, forgalom.vevo, forgalom.kategoriaId, forgalom.egyseg, forgalom.nettoar, forgalom.mennyiseg, forgalom.kiadva, kategoria.categoryName FROM forgalom INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId',[], (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
      },req);
})


// Select one trafics by id
router.get('/:id',(req, res)=>{
    let id = req.params.id;
    query(`SELECT * FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    },req)
});

// Post new trafics
router.post('/', (req, res) => {
    const {termek, vevo,kategoriaId,egyseg,mennyiseg,kiadva,nettoar } = req.body;
    query(`INSERT INTO forgalom (termek, vevo, kategoriaId, egyseg, mennyiseg, kiadva, nettoar) 
     VALUES (?, ?, ?, ?, ?, ?,?)`,[termek,vevo,kategoriaId,egyseg,mennyiseg,kiadva,nettoar], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    },req);
});


// Update trafics
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {termek, vevo,kategoriaId,egyseg,mennyiseg,kiadva, nettoar } = req.body; // consistent naming
    query(`UPDATE forgalom SET termek=?,vevo = ?, kategoriaId=?, egyseg=?, mennyiseg=?, kiadva=?, nettoar=? WHERE id = ?`, [termek,vevo,kategoriaId,egyseg,mennyiseg,kiadva, nettoar, id], (error, results) => {
      if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
      res.status(200).json({ message: "Forgalom updated", results });
    },req);
    
  });

// Delete trafics
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()},req)
       
});


module.exports = router






