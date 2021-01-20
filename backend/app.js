require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Joi, celebrate, errors } = require('celebrate');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { logout } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { PORT = 3000 } = process.env;
const app = express();

const corsOptions = {
  origin: ['http://localhost:3001',
    'http://cindy.students.nomoredomains.monster',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'Authorization',
  ],
  credentials: true,
};

app.listen(PORT, () => {
  console.log(PORT);
});

app.use('*', cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// логгер запросов
app.use(requestLogger);

// Краш-тест сервера для ревью!
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required(),
  }),
}), createUser);

// авторизация
app.use(auth);

// получение данных users
app.use('/', users);
// получение данных карточек
app.use('/', cards);
app.get('/logout', logout);

// логгер ошибок
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

// вывод ошибки, что действие осуществляется по несуществующему маршруту
app.all('/*', (req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});
