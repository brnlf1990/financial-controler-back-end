const Revenue = require("../models/revenue");

module.exports.getAllReveneue = (req, res, next) => {
  const userId = req.user._id;
  Revenue.find({ owner: userId })
    .then((items) => {
      if (!items) {
        const error = new Error("Valores não encontrados.");
        error.status = 404;
        next(error);
      }
      res.status(200).send({ data: items });
    })
    .catch(next);
};

module.exports.getTotalReveneueValues = (req, res, next) => {
  const userId = req.user._id;

  Revenue.find({ owner: userId }, "value")
    .then((values) => {
      if (!values) {
        const error = new Error("Valores não econtrados");
        error.status = 404;
        next(error);
      }
      
      let totalRevenueValue = 0;
      values.forEach((value) => (totalRevenueValue += value.value));

      res.status(200).send({ totalRevenueValue });
    })
    .catch(next);
};

module.exports.addRevenueValue = (req, res, next) => {
  const {date, value, category, description } = req.body;
  const userId = req.user._id;

  Revenue.create({ date, description, category, value, owner: userId })
    .then((value) => {
      if (!value) {
        const error = new Error(
          "Não foi possivel acrescentar o valor, verifique se é um número."
        );
        error.status = 400;
        next(error);
      }
      res.send({ data: value });
    })
    .catch(next);
};

module.exports.deleteRevenueValue = (req, res, next) => {
  const currentUserId = req.user._id;

  Revenue.findById(req.params._id)
    .then((values) => {
      if (!values) {
        const error = new Error("Valor não encontrado.");
        error.status = 404;
        return next(error);
      }
      if (currentUserId !== values.owner.toString()) {
        const error = new Error("Permissão negada.");
        error.status = 403;
        return next(error);
      }
      return Revenue.findByIdAndDelete(req.params._id).then((deletedValue) => {
        res.send({ data: deletedValue });
      });
    })
    .catch(next);
};
