
// controllers/userController.js
const db = require('../models/db');

// Fungsi untuk mendapatkan semua pengunjung
const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM pengunjung');
        res.render('index', { users: rows });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Fungsi untuk membuat pengunjung baru
const createUser = async (req, res) => {
    const { nama, email, noTelp } = req.body;
    try {
        const [result] = await db.query('INSERT INTO pengunjung (nama, email, noTelp) VALUES (?, ?, ?)', [nama, email, noTelp]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Fungsi untuk memperbarui pengunjung
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nama, email, noTelp } = req.body;
    try {
        const [result] = await db.query('UPDATE pengunjung SET nama = ?, email = ?, noTelp = ? WHERE id = ?', [nama, email, noTelp, id]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Fungsi untuk menghapus pengunjung
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM pengunjung WHERE id = ?', [id]);
        res.redirect('/');
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
