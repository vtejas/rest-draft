const express = require("express");
const app = express();
const connectDB = require("./utils/connect");
const router = require("./routes");
var morgan = require('morgan')
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());

app.use(morgan('tiny'))

app.use("/api", router);

app.use((err, req, res, next) => {
  res.send({
    success: false,
    message: err.message,
    status: err.status,
  });
});

app.listen(PORT, async () => {
  console.log(`server running at http://localhost:${PORT}`);
  await connectDB();
});
