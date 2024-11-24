const express = require('express');
const app = express();
const wisataRoutes = require('./routes/pengunjung.js'); 
require('dotenv').config();
const port = process.env.PORT;

const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts');

// Menggunakan express-ejs-layouts untuk layout
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/wisata', wisataRoutes);
app.set('view engine', 'ejs');

// Route tanpa autentikasi
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout'
    });
});

// Route untuk melihat daftar pengunjung
app.get('/pengunjung', (req, res) => {
    db.query('SELECT * FROM pengunjung', (err, pengunjung) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('pengunjung', {
            layout: 'layouts/main-layout',
            pengunjung: pengunjung
        });
    });
});

// Route untuk menampilkan form edit pengunjung
app.get('/editpengunjung/:id', (req, res) => {
    const pengunjungId = req.params.id;
    db.query('SELECT * FROM pengunjung WHERE id = ?', [pengunjungId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('editpengunjung', {
            layout: 'layouts/main-layout',
            pengunjung: result[0]
        });
    });
});

// Route untuk menangani form edit pengunjung
app.post('/editpengunjung/:id', (req, res) => {
    const { nama, email, noTelp } = req.body;
    const pengunjungId = req.params.id;

    // Validasi input
    if (!nama || !email || !noTelp) {
        return res.status(400).send('Nama, email, dan noTelp tidak boleh kosong');
    }

    db.query(
        'UPDATE pengunjung SET nama = ?, email = ?, noTelp = ? WHERE id = ?',
        [nama, email, noTelp, pengunjungId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
            res.redirect('/pengunjung');  // Redirect ke halaman daftar pengunjung setelah edit
        }
    );
});

// Route untuk menambahkan pengunjung baru
app.post('/pengunjung', (req, res) => {
    const { nama, email, noTelp } = req.body;

       // Validasi input
       if (!nama || !email || !noTelp) {
        return res.status(400).send('Nama, email, dan noTelp tidak boleh kosong');
    }

    const query = 'INSERT INTO pengunjung (nama, email, noTelp) VALUES (?, ?, ?)';
    
    db.query(query, [nama, email, noTelp], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding visitor');
        }
        res.status(201).json({ id: result.insertId, nama, email, noTelp }); // Send the newly created visitor
    });
});

// Route untuk menghapus pengunjung berdasarkan ID
app.delete('/pengunjung/:id', (req, res) => {
    const pengunjungId = req.params.id;
    const query = 'DELETE FROM pengunjung WHERE id = ?';

    db.query(query, [pengunjungId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting visitor');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Visitor not found');
        }
        res.status(200).send('Visitor deleted');
    });
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});