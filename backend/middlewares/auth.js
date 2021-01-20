require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/NotAthorizedError');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const authorization = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    const err = new NotAuthorizedError('Необходима авторизация');
    next(err);
  }
  req.user = payload;
  next();
};
