const card = require('../models/card');
const { showError, OK_CODE } = require('../helper/helper');

// получить все карточки
const getCards = (req, res) => {
  card.find({})
    .populate('user')
    .then((data) => res.status(OK_CODE).send(data))
    .catch((err) => showError(res, err));
};

// создать новую карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((cardItem) => res.status(OK_CODE).send(cardItem))
    .catch((err) => showError(res, err));
};

// удалить карточку
const deleteCard = (req, res) => {
  const { cardId } = req.params;
  card.findByIdAndRemove(cardId)
    .orFail(new Error('CastError'))
    .then((cardItem) => res.status(OK_CODE).send(cardItem))
    .catch((err) => showError(res, err));
};

// лайкнуть карточку
const likeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .then((cardData) => res.status(OK_CODE).send(cardData))
    .catch((err) => showError(res, err));
};

// убрать лайк с карточки
const dislikeCard = (req, res) => {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('CastError'))
    .then((cardData) => res.status(OK_CODE).send(cardData))
    .catch((err) => showError(res, err));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
