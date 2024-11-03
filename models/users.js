const mongoose = require("mongoose");
const { validateHash } = require("../utils/hash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: "This field is required.",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: function (link) {
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(link);
      },
    },
    message: (props) => `${props.value}`,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: "Email is required",
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email,
  password,
}) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Email ou senha inválidos."));
    }

    return validateHash(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Email ou senha inválidos."));
      }
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
