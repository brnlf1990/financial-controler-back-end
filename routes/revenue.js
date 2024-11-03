
const revenueRouter = require("express").Router();


const {
    getTotalReveneueValues,
    addRevenueValue,
    deleteRevenueValue
} = require("../controlers/costs");

revenueRouter.get("/total", getTotalReveneueValues);

revenueRouter.post("/",addRevenueValue);

revenueRouter.delete("/:_id", deleteRevenueValue);


module.exports = revenueRouter;
