const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const messageRouter = require("./routers/message");
const replyRouter = require("./routers/reply");

const app = express();
const port = process.env.PORT || 3900;

app.use(express.json());
app.use(userRouter);
app.use(messageRouter);
app.use(replyRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "abc123" }, "thisismynewcourse");
  console.log(token);

  const data = jwt.verify(token, "thisismynewcourse");
  console.log(data);
};
