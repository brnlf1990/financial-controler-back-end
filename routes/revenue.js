
const revenueRouter = require("express").Router();


const {
    getAllReveneue,
    getTotalReveneueValues,
    addRevenueValue,
    deleteRevenueValue
} = require("../controlers/revenue");
revenueRouter.get("/", getAllReveneue);
revenueRouter.get("/total", getTotalReveneueValues);

revenueRouter.post("/",addRevenueValue);

revenueRouter.delete("/:_id", deleteRevenueValue);


module.exports = revenueRouter;
