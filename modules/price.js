const express = require('express');
const router = express.Router();
const {query} = require('../utils/database');
const { route } = require('./trafics');



router.get('/', (req,res) => {
    query('SELECT nettoar, id FROM forgalom',[], (error, results) => {
        if (error) return res.status(500).json({error: error.message})
        res.status(200).json(results)
    },req);
})
router.get('/:id',(req, res)=>{
    let id = req.params.id;
    query(`SELECT nettoar, id FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json(results)
    },req
);});

router.patch('/:id', (req, res) => {
    let id = req.params.id;
    const {nettoar } = req.body;
    query(`UPDATE forgalom SET nettoar=? WHERE id = ?`, [nettoar, id], (error, results) => {
      if (error) return res.status(500).json({ errno: error.errno, msg: "Hiba történt :(" });
      res.status(200).json({ message: "Nettoár updated", results });
    },req
    );
});
router.delete('/:id',(req, res)=>{
    let id = req.params.id;
    query(`DELETE FROM forgalom WHERE id=?`,[id], (error, results)=>{
        if(error) return res.status(500).json({errno: error.errno, msg: "Hiba történt :("}) ;
        res.status(200).json()},req
);});

module.exports = router;