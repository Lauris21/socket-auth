const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { connect } = require("./src/utils/database");
connect();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

const app = express();

app.use(express.static("public"));
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: false }));

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  return next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.disable("x-powered-by");

server.listen(PORT, () => {
  console.log(`Listening on PORT ${BASE_URL}${PORT}`);
});
