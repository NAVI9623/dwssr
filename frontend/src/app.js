const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Conexión a MongoDB (usando el hostname del servicio en docker-compose)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/miapp';

// Middleware
app.use(express.json());

// Modelo simple
const ItemSchema = new mongoose.Schema({
  nombre: String,
  fecha: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', ItemSchema);

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Dev Container funcionando correctamente!',
    status: 'OK',
    baseDatos: mongoose.connection.readyState === 1 ? 'Conectada' : 'Desconectada'
  });
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ fecha: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const nuevoItem = new Item({ nombre: req.body.nombre });
    await nuevoItem.save();
    res.status(201).json(nuevoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Conectar a MongoDB y iniciar servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📁 Endpoints disponibles:`);
      console.log(`   GET  /          - Estado del servidor`);
      console.log(`   GET  /api/items - Listar items`);
      console.log(`   POST /api/items - Crear item (JSON: {nombre: "..."})`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
    process.exit(1);
  });
  