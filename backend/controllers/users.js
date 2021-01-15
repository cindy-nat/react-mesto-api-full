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
};
