const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { AppError } = require('../middleware/errorHandler');
const User = require('../models/user.model');
const { registerSchema, loginSchema } = require('../utils/validation.schemas');

const register = async (req, res, next) => {
  try {
    // Validasyon
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const { username, email, password } = req.body;

    // Kullanıcı kontrolü
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      throw new AppError('Bu email veya kullanıcı adı zaten kullanılıyor', 409);
    }

    // Yeni kullanıcı oluşturma
    const user = await User.create({
      username,
      email,
      password
    });

    // Token oluşturma
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Validasyon
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400);
    }

    const { email, password } = req.body;

    // Kullanıcı kontrolü
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError('Email veya şifre hatalı', 401);
    }

    // Şifre kontrolü
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Email veya şifre hatalı', 401);
    }

    // Token oluşturma
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      status: 'success',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login
}; 