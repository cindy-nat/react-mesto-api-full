const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { showError, OK_CODE } = require('../helper/helper');
const bcrypt = require('bcryptjs');

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
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
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
};
