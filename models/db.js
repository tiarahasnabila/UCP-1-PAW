// models/db.js
const mysql = require('mysql2/promise');

// Membuat koneksi ke MySQL
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',        // Ganti dengan username MySQL Anda
    password: '',// Ganti dengan password MySQL Anda
    database: 'wisata'   // Nama database Anda
});

module.exports = db;
