const express = require("express");
const usersRouter = require("./routes/users");
const costsRouter = require("./routes/costs");
const auth = require("./middleware/auth")
const { PORT = 3001 } = process.env;
const { login } = require("./controlers/users");

const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/financialdb");
app.use(express.json());
app.post("/signin", login);

app.use("/users", usersRouter);
app.use(auth);
app.use("/costs", costsRouter);


app.use((err, req, res, next) => {
  if (!err.status){
    res.status(500).send({message:err.message})
    return
  }


 res.status(err.status).send({message:err.message})
});
app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
