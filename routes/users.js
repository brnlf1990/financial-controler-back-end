const usersRouter = require("express").Router();
const {
  getUsers,
  updateUser,
  getCurrentUser,
} = require("../controlers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
// usersRouter.get("/:_id", getUsersById);


usersRouter.patch("/:_id", updateUser);
module.exports = usersRouter;
    