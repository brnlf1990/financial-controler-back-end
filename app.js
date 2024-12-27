const express = require("express");
const usersRouter = require("./routes/users");
const costsRouter = require("./routes/costs");

const revenueRouter = require("./routes/revenue");
const helmet = require("helmet");
const {limiter} = require('./middleware/rateLimit')
const auth = require("./middleware/auth");
const { PORT, MONGODB_URI } = process.env;
const { login, addUsers } = require("./controlers/users");
const cors = require("cors");

const auth = require("./middleware/auth")
const { PORT = 3001 } = process.env;
const { login } = require("./controlers/users");


const mongoose = require("mongoose");
const { requestLogger, errorLogger } = require("./middleware/logger");
const app = express();
const allowedCors = [
  "http://localhost:3001",
  "http://192.168.0.3:3001",
  "http://34.42.224.240:3001",
  "http://www.easy-bucket.online",
  "https://www.easy-bucket.online",
  "http://easy-bucket.online",
  "https://easy-bucket.online",
  "http://api.easy-bucket.online",
  "https://api.easy-bucket.online",
];
mongoose.connect(MONGODB_URI);
app.use(express.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], 
      scriptSrc: ["'self'", 'trusted-scripts.com'], 
    },
  },
  frameguard: { action: 'deny' }, 
}
))



app.use(
  cors({
    origin: allowedCors,
    methods: ["GET", "HEAD", "POST", "DELETE", "PATCH", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
    credentials: true,
  })
);
app.use(requestLogger);

app.use(limiter)
app.post("/signin", login);
app.post("/signup", addUsers);

app.use(auth);
app.use("/users", usersRouter);
app.use("/revenue", revenueRouter);
app.use("/costs", costsRouter);

app.use(errorLogger);
app.use((err, res) => {
  if (!err.status) {
    res.status(500).send({ message: err.message });
    return;
  }

  res.status(err.status).send({ message: err.message });
});
app.listen(PORT, () => {
  console.log(`O App está escutando na porta ${PORT}`);
});
