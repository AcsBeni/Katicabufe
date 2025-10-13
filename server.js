const express = require('express');
var cors = require('cors');

const categories = require('./modules/categories');
const trafics = require('./modules/trafics');
const statistics = require('./modules/statistics')

const app = express();
//npm i dotenv
/*
DBHOST=localhost
DBUSER=root
DBPASS=
DBNAME=2025_katicabufe


PORT=3000
 
 */
// Middleware-ek
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.send('Backend API by Bajai SZC Türr István Technikum - 13.a Szoftverfejlesző');
});

app.use('/categories', categories);
app.use('/trafics', trafics);
app.use('/statistics', statistics)

/*
app.get('/kategories', (req, res) => {
    pool.query('SELECT * FROM kategoria', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/trafics', (req, res) => {
    pool.query(`
        SELECT * FROM forgalom
        INNER JOIN kategoria ON kategoria.id = forgalom.kategoriaId
        `, (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});
*/

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});



/**
 * 
 *   http://localhost:3000/categoies/54
 */