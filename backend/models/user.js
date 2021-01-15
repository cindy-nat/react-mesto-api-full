const mongoose = require('mongoose');
const { regex } = require('../helper/helper');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Это должна быть ссылка',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
