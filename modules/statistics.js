const express = require("express")
const router = express.Router()
const pool = require('../utils/database')

// GET statistics

router.get('/', (req, res) => {
    pool.query(`SELECT COUNT(DISTINCT vevo) AS 'customersCount', COUNT(DISTINCT termek) AS 'productsCount', SUM(nettoar*mennyiseg) as 'priceSum', SUM(mennyiseg) as salesSum FROM forgalom`, (error, sumResults) => {
        if (error) return res.status(500).json({ msg: 'Hiba történt az adatbázis lekérdezése közben.'});
        pool.query(`SELECT termek, sum(mennyiseg) as 'count', sum(nettoar*mennyiseg) as 'price' FROM forgalom WHERE 1 GROUP BY termek;`, (error, productResults) => {
            sumResults = JSON.parse(JSON.stringify(sumResults))
            let ellenorzes = {"usersCount": sumResults[0].customersCount,
                "productsCount": sumResults[0].productsCount,
                "salesSum": sumResults[0].salesSum,
                "priceSum": sumResults[0].priceSum,
                "products": productResults
            }
            res.send(ellenorzes)
        })
   
    })
})
module.exports = router