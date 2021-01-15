const routerusers = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

routerusers.get('/users', getUsers);

routerusers.get('/users/:id', getUser);

routerusers.post('/users', createUser);

routerusers.patch('/users/me', updateUser);

routerusers.patch('/users/me/avatar', updateAvatar);

module.exports = routerusers;
