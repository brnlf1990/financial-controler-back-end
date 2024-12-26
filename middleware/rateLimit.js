const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Muitas requisições feitas a partir deste IP. Tente novamente mais tarde.",
  });

  module.exports = {limiter}