// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Mengimpor rute
const userRoutes = require('./routes/userRoutes');

// Menyajikan folder public sebagai statis
app.use(express.static(path.join(__dirname, 'public')));

// Menentukan view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Menggunakan bodyParser untuk menangani data POST
app.use(bodyParser.urlencoded({ extended: true }));

// Menggunakan rute untuk mengelola pengunjung
app.use('/', userRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});


userRoutes

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


