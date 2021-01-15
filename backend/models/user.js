const mongoose = require('mongoose');
const { regex } = require('../helper/helper');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Это должна быть ссылка',
    },
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
});

module.exports = mongoose.model('user', userSchema);
