const jwt = require('jsonwebtoken');
const NotAthorizedError = require('../errors/NotAthorizedError');

module.exports = (req, res, next) => {
  const authorization = req.cookies.jwt;
  if (!authorization) { throw new NotAthorizedError('Необходима авторизация'); }
  let payload;
  try {
    payload = jwt.verify(authorization, 'some-secret-key');
  } catch (e) {
    next(e);
  }
  req.user = payload;
};
