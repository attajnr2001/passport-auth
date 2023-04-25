require("dotenv").config();
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const port = process.env.port;
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

require("./config/passport")(passport);

app.set("view engine", "ejs");
app.set("layout", "./layouts/main.ejs");

const db = process.env.MongoUri;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));
app.use(layouts);

app.use(express.static("public"));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log("runnig on port", port);
});
