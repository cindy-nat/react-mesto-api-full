const routercards = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

routercards.get('/cards', getCards);

routercards.post('/cards', createCard);

routercards.delete('/cards/:cardId', deleteCard);

// работа с лайками
routercards.put('/cards/likes/:cardId', likeCard);
routercards.delete('/cards/likes/:cardId', dislikeCard);

module.exports = routercards;
