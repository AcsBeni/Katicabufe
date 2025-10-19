const express = require('express');
var cors = require('cors');

const categories = require('./modules/categories');
const trafics = require('./modules/trafics');
const statistics = require('./modules/statistics')
const product = require('./modules/product');
const buyers = require('./modules/buyers');
const price = require('./modules/price');

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
app.use('/product', product);
app.use('/buyers', buyers);
app.use('/price', price);

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

app.listen(3000, () => {
    console.log(`Server listening on http://localhost:3000`);//${process.env.PORT}
});



/**
 * 
 *   http://localhost:3000/categoies/54
 */