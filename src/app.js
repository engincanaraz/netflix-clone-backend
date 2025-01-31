const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const sequelize = require('./config/database');
const User = require('./models/user.model');

require('dotenv').config();

const app = express();

// Güvenlik ayarları
app.use(helmet());
app.use(cors());
app.use(express.json());

// Statik dosyaları servis et
app.use(express.static(path.join(__dirname, '..')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // her IP için maksimum istek sayısı
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Veritabanı senkronizasyonu ve sunucuyu başlatma
sequelize.sync({ alter: true }).then(() => {
  console.log('Veritabanı tabloları oluşturuldu');
  app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
    console.log(`Test sayfasına http://localhost:${PORT}/test.html adresinden erişebilirsiniz`);
  });
}).catch(error => {
  console.error('Veritabanı senkronizasyonu başarısız:', error);
}); 