const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const { showError, OK_CODE } = require('../helper/helper');

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

// показать данные пользователя
const getUserInfo = (req, res) => {
  user.findById(req.user._id)
    .orFail(new Error('CastError'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch((err) => showError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((userInfo) => {
      const token = jwt.sign({ _id: userInfo._id }, 'some-secret-key');
      res.cookie('jwt', token, { maxAge: 3600 * 24 * 7, httpOnly: true, sameSite: true });
      res.status(200).send({ message: 'Авторизация успешна' });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: -1, httpOnly: true, sameSite: true })
    .send({ message: 'Logged out' });
};

// создать нового пользователя
const createUser = (req, res) => bcrypt.hash(req.body.password, 10)
  .then((hash) => user.create({
    ...req.body,
    password: hash,
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
  login,
  getUserInfo,
  logout,
};
