// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rute untuk halaman utama
router.get('/', userController.getUsers); // Pastikan rute ini ada dan mengarah ke controller yang benar

// Rute untuk mengambil semua pengunjung
router.get('/users', userController.getUsers);

// Rute untuk menambah pengunjung baru
router.post('/users', userController.createUser);

// Rute untuk memperbarui pengunjung
router.put('/users/:id', userController.updateUser);

// Rute untuk menghapus pengunjung
router.delete('/users/:id', userController.deleteUser);

module.exports = router;