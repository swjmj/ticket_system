var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");

var indexRouter = require("./routes/api.js");
// var usersRouter = require("./routes/users");
var app = express();
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
indexRouter(app);

var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
