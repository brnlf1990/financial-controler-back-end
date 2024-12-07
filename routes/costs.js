
const costsRouter = require("express").Router();


const {
    getAllCosts,
    getTotalCostValues,
    addCostValue,
    editCostValue,
    deleteCostValue
} = require("../controlers/costs");

costsRouter.get("/", getAllCosts);
costsRouter.get("/total", getTotalCostValues);
costsRouter.post("/",addCostValue);
costsRouter.patch("/:_id", editCostValue);
costsRouter.delete("/:_id", deleteCostValue);


module.exports = costsRouter;
