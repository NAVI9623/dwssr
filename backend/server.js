const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: '¡Servidor funcionando! 🚀' });
});

// Rutas API (ejemplo)
app.get('/api/test', (req, res) => {
    res.json({ data: 'Datos de prueba desde el backend' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});