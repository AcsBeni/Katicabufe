const express = require('express');
const router = express.Router();
const pool = require('../utils/database');
// Select all
router.get("/", (req, res)=>{
    pool.query('SELECT * FROM forgalom', (error, results) =>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    });
});

// Select one trafics by id
router.get('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`SELECT * FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    })
});

// Post new trafics
router.post('/', (req, res) => {
    const {termek, vevo,kategoriaId,egyeseg,mennyiseg,kiadva } = req.body;
    pool.query(`INSERT INTO forgalom (termek, vevo, kategoriaId, egyeseg, mennyiseg, kiadva) 
     VALUES (?, ?, ?, ?, ?, ?)`,[termek,vevo,kategoriaId,egyeseg,mennyiseg,kiadva], (error, results) => {
        if (error) return res.status(500).json({ error: error.message });
        res.status(200).json(results);
    });
});

// Update trafics
router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {termek, vevo,kategoriaId,egyeseg,mennyiseg,kiadva } = req.body; // consistent naming
    pool.query(`UPDATE forgalom SET termek=?,vevo = ?, kategoriaId=?, egyseg=?, mennyiseg=?, kiadva=? WHERE id = ?`, [termek,vevo,kategoriaId,egyeseg,mennyiseg,kiadva], (error, results) => {
      if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
      res.status(200).json({ message: "Forgalom updated", results });
    });
  });

// Delete trafics
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    pool.query(`DELETE FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()})
});
module.exports = router






