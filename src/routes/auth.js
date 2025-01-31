const express = require('express');
const router = express.Router();
const User = require('../models/user');

/**
 * Kullanıcı girişi
 * @param {string} email - Kullanıcı emaili
 * @param {string} password - Kullanıcı şifresi
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email ve şifre gereklidir'
            });
        }

        const user = await User.findOne({ email });
        // ...devamı
    } catch (error) {
        console.error('Login hatası:', error);
        res.status(500).json({
            error: 'Bir hata oluştu'
        });
    }
}); 