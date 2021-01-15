const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cards = require('./routes/cards');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { PORT = 3000 } = process.env;
const app = express();

app.listen(PORT, () => {
  console.log(PORT);
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '5fd314bfd3011c141cbb20f8',
  };
  next();
});

// получение данных users
app.use('/', users);

// получение данных карточек
app.use('/', cards);

// вывод ошибки, что действие осуществляется по несуществующему маршруту
app.all('/*', (req, res) => {
  res.status(404);
  res.json({ message: 'Запрашиваемый ресурс не найден' });
});
