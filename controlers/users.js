require("dotenv").config();
const { JWT_SECRET } = process.env;
const hash = require("../utils/hash");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      if (!user) {
        const error = new Error("User not found.");
        error.status = 404;
        next(error);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  const payload = jwt.verify(token, JWT_SECRET);
  req.user = payload;

  User.findById(payload._id)
    .select("-password")
    .then((currentUser) => {
      if (!currentUser) {
        const error = new Error("User not found");
        error.status = 404;
        next(error);
      }
      res.status(200).send({ user: currentUser });
    })
    .catch(next);
};

module.exports.addUsers = (req, res, next) => {
  console.log(req.body);

  const { email, password, name, about, avatar } = req.body;

  const hashedPassword = hash.createHash(password);

  User.create({ email, password: hashedPassword, name, about, avatar })
    .select("-password")
    .then((user) => {
      if (!user) {
        const error = new Error("Validation error");
        error.status = 400;
        next(error);
      }
      console.log("Enrou no addUsers");

      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const userId = req.params._id;

  User.findByIdAndUpdate(
    userId,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .select("-password")
    .then((user) => {
      if (!user) {
        const error = new Error("User Id not found");
        error.status = 404;
        next(error);
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "3d",
      });
      res.send({ data: token });
    })
    .catch((err) => {
      res.status(401).send({ message: err });
    });
};
