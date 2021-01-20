const card = require('../models/card');
const { OK_CODE } = require('../helper/helper');
const NotFoundError = require('../errors/NotFoundError');
const NotCorrectDataError = require('../errors/NotCorrectDataError');

// получить все карточки
const getCards = (req, res, next) => {
  card.find({})
    .populate('user')
    .then((data) => {
      if (!data) { throw new NotFoundError('Данные с карточками не получены'); }
      res.status(OK_CODE).send(data);
    })
    .catch(next);
};

// создать новую карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  card.create({ name, link, owner: req.user._id })
    .then((cardItem) => {
      if (!cardItem) { throw new NotCorrectDataError('Переданы некорректные данные для создания карточки'); }
      res.status(OK_CODE).send(cardItem);
    })
    .catch(next);
};

// удалить карточку
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  card.findById(cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cardItem) => {
      if (cardItem.owner.toString() !== req.user._id) {
        res.status(401).send({ message: 'Вы пытаетесь удалить чужую карточку' });
      } else {
        card.deleteOne(cardItem)
          .then((deletedCard) => res.status(OK_CODE).send(deletedCard));
      }
    })
    .catch(next);
};

// лайкнуть карточку
const likeCard = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cardData) => res.status(OK_CODE).send(cardData))
    .catch(next);
};

// убрать лайк с карточки
const dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cardData) => res.status(OK_CODE).send(cardData))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
