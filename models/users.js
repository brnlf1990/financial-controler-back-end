const mongoose = require("mongoose");
const { validateHash } = require("../utils/hash");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Esse campo deve ter pelo menos 2 caracteres.'],
    maxlength: [30, 'Esse campo deve ter no máximo 30 caracteres.'],
    required: "Este campo é necessário",
  },
  about: {
    type: String,
    minlength: [2, 'Esse campo deve ter pelo menos 2 caracteres.'],
    maxlength: [30, 'Esse campo deve ter no máximo 30 caracteres.'],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (link) {
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(link);
      },
    },
    message: (props) => `${props.value}não é um link válido. Por favor, insira uma URL válida.`,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: "Este campo é necessário",
    unique: true,
  },
  password: {
    type: String,
    required: "Este campo é necessário",
    trim: true,
  },
});
userSchema.pre('validate', function (next) {
  
  if (this.isModified('password') && this.password.length < 8) {
    return next(new Error('A senha deve ter pelo menos 8 caracteres.'));
  }
  next();
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
