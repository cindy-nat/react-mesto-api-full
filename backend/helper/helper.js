const GENERAL_ERROR_CODE = 500;
const VALIDATION_ERROR_CODE = 400;
const VALIDATION_ERROR_NAME = 'ValidationError';
const NODATA_ERROR_CODE = 404;
const NODATA_ERROR_NAME = 'CastError';
const OK_CODE = 200;

// обработка ошибок
const showError = (res, err) => {
  if (err.message === NODATA_ERROR_NAME) {
    return res.status(NODATA_ERROR_CODE).send({ message: 'Нет данных с таким id' });
  }
  if (err.name === VALIDATION_ERROR_NAME || err.name === NODATA_ERROR_NAME) {
    return res.status(VALIDATION_ERROR_CODE).send({ message: 'Переданы некорректные данные в метод создания/изменения' });
  }
  return res.status(GENERAL_ERROR_CODE).send({ message: 'На сервере произошла ошибка' });
};

const regex = /^(https|http):\/\/(www\.)*[\d-\w]{2,}(\.\w{2,})(\w*[-._~:/?#[\]@!$&'()*+,;=]?)*(#\/)*$/;

module.exports = { showError, OK_CODE, regex };
