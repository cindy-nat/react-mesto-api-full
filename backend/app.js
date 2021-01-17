const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cards = require('./routes/cards');
const users = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { PORT = 3000 } = process.env;
const app = express();

const corsOptions = {
  origin: ['http://localhost:3001',
    'http://cindy.students.nomoredomains.monster'
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

app.post('/signin', login);
app.post('/signup', createUser);

// авторизация
app.use(auth);

// получение данных users
app.use('/', users);
// получение данных карточек
app.use('/', cards);

// вывод ошибки, что действие осуществляется по несуществующему маршруту
app.all('/*', (req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});
