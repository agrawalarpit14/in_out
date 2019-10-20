const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const ideasRoutes = require("./routes/ideas");
const userRoutes = require("./routes/user");
const bidRoutes = require("./routes/bids");
const bountyRoutes = require("./routes/bounty");
const app = express();
// mongodb+srv://agrawalarpit14:<password>@in-out-hbqjd.mongodb.net/test?retryWrites=true&w=majority
mongoose
  .connect(
    "mongodb+srv://agrawalarpit14:M694Ut48Ndbu07oc@in-out-hbqjd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/ideas", ideasRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bid", bidRoutes);
app.use("/api/bounty", bountyRoutes);
app.use((req, res , next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
module.exports = app;
