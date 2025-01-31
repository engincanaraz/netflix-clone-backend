const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "Kullanıcı adı en az 3 karakter olmalıdır",
    "string.max": "Kullanıcı adı en fazla 30 karakter olmalıdır",
    "any.required": "Kullanıcı adı zorunludur",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Geçerli bir email adresi giriniz",
    "any.required": "Email adresi zorunludur",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Şifre en az 6 karakter olmalıdır",
    "any.required": "Şifre zorunludur",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Geçerli bir email adresi giriniz",
    "any.required": "Email adresi zorunludur",
  }),

  password: Joi.string().required().messages({
    "any.required": "Şifre zorunludur",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
