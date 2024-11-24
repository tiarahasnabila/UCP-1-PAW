const express = require('express');
const router = express.Router();

let pengunjung = [
    {
        id: 1,
        nama: "John Doe",
        email: "john@example.com",
        noTelp: "123456789"
    },
    {
        id: 2,
        nama: "Jane Smith",
        email: "jane@example.com",
        noTelp: "987654321"
    },
];

// Untuk mendapatkan semua pengunjung
router.get('/', (req, res) => {
    res.json(pengunjung);
});

// Untuk menambahkan pengunjung baru
router.post('/', (req, res) => {
    const newPengunjung = {
        id: pengunjung.length + 1,
        nama: req.body.nama,
        email: req.body.email,
        noTelp: req.body.noTelp
    };
    
    // Validasi input
    if (!newPengunjung.nama || !newPengunjung.email || !newPengunjung.noTelp) {
        return res.status(400).json({ message: 'Nama, email, dan noTelp tidak boleh kosong' });
    }

    pengunjung.push(newPengunjung);
    res.status(201).json(newPengunjung);
});

// Untuk menghapus pengunjung berdasarkan ID
router.delete('/:id', (req, res) => {
    const pengunjungIndex = pengunjung.findIndex(p => p.id === parseInt(req.params.id));
    if (pengunjungIndex === -1) return res.status(404).json({ message: 'Pengunjung tidak ditemukan' });

    const deletedPengunjung = pengunjung.splice(pengunjungIndex, 1)[0]; 
    res.status(200).json({ message: `Pengunjung '${deletedPengunjung.nama}' telah dihapus` });
});

// Memperbarui pengunjung berdasarkan ID
router.put('/:id', (req, res) => {
    const pengunjungToUpdate = pengunjung.find(p => p.id === parseInt(req.params.id));
    if (!pengunjungToUpdate) return res.status(404).json({ message: 'Pengunjung tidak ditemukan' }); 

    // Update data
    pengunjungToUpdate.nama = req.body.nama || pengunjungToUpdate.nama;
    pengunjungToUpdate.email = req.body.email || pengunjungToUpdate.email;
    pengunjungToUpdate.noTelp = req.body.noTelp || pengunjungToUpdate.noTelp;

    res.status(200).json({
        message: `Pengunjung dengan ID ${pengunjungToUpdate.id} telah diperbarui`,
        updatedPengunjung: pengunjungToUpdate
    });
});

module.exports = router;