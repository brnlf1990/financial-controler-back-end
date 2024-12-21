const express = require("express");
const usersRouter = require("./routes/users");
const costsRouter = require("./routes/costs");
const revenueRouter = require("./routes/revenue");
const auth = require("./middleware/auth")
const { PORT = 3001 } = process.env;
const { login, addUsers } = require("./controlers/users");
const cors = require("cors");
const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require('./middleware/logger');
const app = express();
const allowedCors = [
   'http://localhost:3000',
   'http://192.168.0.3:3000',
   "http://34.42.224.240:3001"
]
mongoose.connect("mongodb://localhost:27017/financialdb");
app.use(express.json());
app.use(cors({

  origin:allowedCors,
  methods:['GET', 'HEAD', 'POST', 'DELETE', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
}))
app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", addUsers);

app.use(auth);
app.use("/users", usersRouter);
app.use("/revenue", revenueRouter);  
app.use("/costs", costsRouter);

app.use(errorLogger);
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
