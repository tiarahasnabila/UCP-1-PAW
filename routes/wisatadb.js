const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Mengimpor koneksi database

// Endpoint untuk mendapatkan semua pengunjung
router.get('/', (req, res) => {
    db.query('SELECT * FROM pengunjung', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

// Endpoint untuk mendapatkan pengunjung berdasarkan ID
router.get('/:id', (req, res) => {
    db.query('SELECT * FROM pengunjung WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) return res.status(404).send('Pengunjung tidak ditemukan');
        res.json(results[0]);
    });
});

// Endpoint untuk menambahkan pengunjung baru
router.post('/', (req, res) => {
    const { nama, email, noTelp } = req.body;
    if (!nama || nama.trim() === '' || !email || email.trim() === '' || !noTelp || noTelp.trim() === '') {
        return res.status(400).send('Nama, email, dan noTelp tidak boleh kosong');
    }

    db.query('INSERT INTO pengunjung (nama, email, noTelp) VALUES (?, ?, ?)', [nama.trim(), email.trim(), noTelp.trim()], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        const newPengunjung = { id: results.insertId, nama: nama.trim(), email: email.trim(), noTelp: noTelp.trim() };
        res.status(201).json(newPengunjung);
    });
});

// Endpoint untuk memperbarui pengunjung
router.put('/:id', (req, res) => {
    const { nama, email, noTelp } = req.body;

    db.query('UPDATE pengunjung SET nama = ?, email = ?, noTelp = ? WHERE id = ?', [nama, email, noTelp, req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.affectedRows === 0) return res.status(404).send('Pengunjung tidak ditemukan');
        res.json({ id: req.params.id, nama, email, noTelp });
    });
});

// Endpoint untuk menghapus pengunjung
router.delete('/:id', (req, res) => {
    db.query('DELETE FROM pengunjung WHERE id = ?', [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.affectedRows === 0) return res.status(404).send('Pengunjung tidak ditemukan');
        res.status(204).send();
    });
});