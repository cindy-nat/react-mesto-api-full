require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const { OK_CODE } = require('../helper/helper');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');
const NotAthorizedError = require('../errors/NotAthorizedError');

// показать всех пользователей
const getUsers = (req, res, next) => user.find({})
  .then((users) => {
    if (!users) { throw new NotFoundError('Пользователи не найдены'); }
    res.status(OK_CODE).send(users);
  })
  .catch(next);

// показать пользователя по ID
const getUser = (req, res, next) => {
  const { id } = req.params;
  user.findById(id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch(next);
};

// показать данные пользователя
const getUserInfo = (req, res, next) => {
  user.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => res.status(OK_CODE).send(userData))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  return user.findUserByCredentials(email, password)
    .then((userInfo) => {
      if (!userInfo) { throw new NotAthorizedError('Пользователь не авторизирован'); }
      const token = jwt.sign({ _id: userInfo._id }, NODE_ENV === 'production' ? JWT_SECRET:'some-secret-key');
      res.cookie('jwt', token, { maxAge: 3600 * 24 * 7, httpOnly: true, sameSite: true });
      res.status(200).send({ message: 'Авторизация успешна' });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: -1, httpOnly: true, sameSite: true })
    .send({ message: 'Logged out' });
};

// создать нового пользователя
const createUser = (req, res, next) => bcrypt.hash(req.body.password, 10)
  .then((hash) => user.create({
    ...req.body,
    password: hash,
  }))
  .then((userData) => {
    if (!userData) { throw new NotCorrectDataError('Переданые некорректные данные для создания позьзователя'); }
    res.status(OK_CODE).send(userData);
  })
  .catch(next);

// обновить пользователя
const updateUser = (req, res, next) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => {
      if (!userData) { throw new NotCorrectDataError('Переданы некорретные данные для обновления'); }
      res.status(OK_CODE).send(userData);
    })
    .catch(next);
};

// обновить аватар
const updateAvatar = (req, res, next) => {
  user.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((userData) => {
      if (!userData) { throw new NotCorrectDataError('Переданы некорретные данные для обновления'); }
      res.status(OK_CODE).send(userData);
    })
    .catch(next);
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
