const express = require('express');
var cors = require('cors');

const categories = require('./modules/categories');
const trafics = require('./modules/trafics');

const app = express();

// Middleware-ek
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.send('Backend API by Bajai SZC Türr István Technikum - 13.a Szoftverfejlesző');
});

app.use('/categories', categories);
app.use('/trafics', trafics);

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
    console.log(`Server listening on http://localhost:3000`);
});



/**
 * 
 *   http://localhost:3000/categoies/54
 */