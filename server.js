const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

// middlewares
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

// keys
const { mongoURI } = require("./config/keys");

// models
require("./models/Booking");

// schema
const Booking = mongoose.model("booking");

// use public
app.use(express.static(path.join(__dirname, "public")));

const { formatDate } = require("./helpers/hbs");

// handlebars middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      formatDate,
    },
  })
);
app.set("view engine", "handlebars");
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  next();
});

// connect to DB
mongoose
  .connect(mongoURI, { useUnifiedTopology: "true", useNewUrlParser: "true" })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(`mongoDB not connected because ${err}`));

// home page
app.get("/", (req, res) => {
  res.render("index");
});
// about page
app.get("/about", (req, res) => {
  res.render("about");
});
// services..
app.get("/services", (req, res) => {
  res.render("services");
});
// contact us page
app.get("/contact", (req, res) => {
  res.render("contact");
});
// booking page
app.get("/book", (req, res) => {
  res.render("booking");
});
// booking post
app.post("/booking", (req, res) => {
  const {
    firstname,
    lastname,
    email,
    contact,
    work,
    other,
    expectations,
  } = req.body;

  const newBooking = {
    firstname,
    lastname,
    email,
    contact,
    work,
    other,
    expectations,
  };

  new Booking(newBooking)
    .save()
    .then((booking) => {
      req.flash("success_msg", "Book successful return to home page");
      res.redirect("/");
    })
    .catch((err) => {
      req.flash("error_msg", `Could not make book. Try again`);
      res.redirect("/book");
    });
});

// admin

app.get("/admin", (req, res) => {
  Booking.find({})
    .lean()
    .sort({ _id: -1 })
    .then((book) => {
      res.render("admin", { book });
    });
});

const Port = process.env.PORT || 4000;

app.listen(Port, () => {
  console.log(`server running on port ${Port}`);
});
