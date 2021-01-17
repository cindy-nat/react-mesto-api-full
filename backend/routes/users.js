const routerusers = require('express').Router();
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

routerusers.get('/users', getUsers);

routerusers.get('/users/me', getUserInfo);

routerusers.get('/users/:id', getUser);

routerusers.patch('/users/me', updateUser);

routerusers.patch('/users/me/avatar', updateAvatar);

module.exports = routerusers;
