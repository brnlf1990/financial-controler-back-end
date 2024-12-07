const usersRouter = require("express").Router();
const {
  addUsers,
  getUsers,
  getUsersById,
  updateUser,
  getCurrentUser,
  updateAvatar,
} = require("../controlers/users");

usersRouter.get("/", getUsers);
usersRouter.get("/me", getCurrentUser);
// usersRouter.get("/:_id", getUsersById);


usersRouter.patch("/:_id", updateUser);
module.exports = usersRouter;
    