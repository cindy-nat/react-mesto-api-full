const OK_CODE = 200;

const regex = /^(https|http):\/\/(www\.)*[\d-\w]{2,}(\.\w{2,})(\w*[-._~:/?#[\]@!$&'()*+,;=]?)*(#\/)*$/;

module.exports = { OK_CODE, regex };
