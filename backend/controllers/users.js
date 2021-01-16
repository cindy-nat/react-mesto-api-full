const user = require('../models/user');
const { showError, OK_CODE } = require('../helper/helper');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// показать всех пользователей
const getUsers = (req, res) => user.find({})
  .then((users) => res.status(OK_CODE).send(users))
  .catch((err) => showError(res, err));

// показать пользователя по ID
const getUser = (req, res) => {
  const { id } = req.params;
  user.findById(id)
    .orFail(new Error('CastError'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch((err) => showError(res, err));
};

const login = (req, res) => {
  const {email, password} = req.body;
  user.findOne({ email }).select('+password')
    .then(user => {
      if(!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then(matched => {
          if(!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key',  { expiresIn: '7d' });
          //res.cookie('jwt',token, { httpOnly: true, maxAge: 3600000 });
          res.send ({ token });
        })
    })
    .catch(err => {
      res.status(401).send({message: err.message});
    });
}

// создать нового пользователя
const createUser = (req, res) =>
  bcrypt.hash(req.body.password, 10)
    .then (hash =>   user.create({
      ...req.body,
      password: hash
    }))
  .then((userData) => res.status(OK_CODE).send(userData))
  .catch((err) => showError(res, err));

// обновить пользователя
const updateUser = (req, res) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('CastError'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch((err) => showError(res, err));
};

// обновить аватар
const updateAvatar = (req, res) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('CastError'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch((err) => showError(res, err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login
};
