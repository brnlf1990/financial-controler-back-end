const Costs = require("../models/costs");

module.exports.getAllCosts = (req, res, next) => {
  const userId = req.user._id;
  Costs.find({ owner: userId })
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
module.exports.getTotalCostValues = (req, res, next) => {
  const userId = req.user._id;

  Costs.find({ owner: userId }, "value")
    .then((values) => {
      if (!values) {
        const error = new Error("Valores não econtrados");
        error.status = 404;
        next(error);
      }

      let totalCostValue = 0;
      values.forEach((value) => (totalCostValue += value.value));

      res.status(200).send({ totalCostValue });
    })
    .catch(next);
};

module.exports.addCostValue = (req, res, next) => {
  const {date, description, value, category } = req.body;
  const userId = req.user._id;
  if (!category) {
    return res.status(400).send({
      message: "Valor e categoria são obrigatórios.",
    });
  }
  Costs.create({ date, description, value, category, owner: userId })
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

module.exports.editCostValue = (req, res, next) => {
  const { description, category, value } = req.body;
  const valueId = req.params._id;

  Costs.findByIdAndUpdate(
    valueId,
    { description, category, value },
    { new: true, runValidators: true }
  )
    .then((items) => {
      if (!items) {
        const error = new Error(
          "Não foi possivel modificar o valor, preencha os campos corretamente."
        );
        error.status = 400;
        next(error);
      }
      res.status(200).send({ items });
    })
    .catch(next);
};

module.exports.deleteCostValue = (req, res, next) => {
  const currentUserId = req.user._id;

  Costs.findById(req.params._id)
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
      return Costs.findByIdAndDelete(req.params._id).then((deletedValue) => {
        res.send({ data: deletedValue });
      });
    })
    .catch(next);
};
