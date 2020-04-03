const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

// keys
const { mongoURI } = require("./config/keys");

// models
require("./models/Booking");

// schema
const Booking = mongoose.model("booking");

// use public
app.use(express.static(path.join(__dirname, "public")));
// handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to DB
mongoose
    .connect(mongoURI, { useUnifiedTopology: "true", useNewUrlParser: "true" })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => console.log(`mongoDB not connected because ${err}`));

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
    const { firstname, lastname, email, contact, work, expectations } = req.body;

    const newBooking = {
        firstname,
        lastname,
        email,
        contact,
        work,
        expectations
    };

    new Booking(newBooking)
        .save()
        .then(booking => {
            console.log(booking);
            res.redirect("/");
        })
        .catch(err => {
            console.log(err.name);
        });
});

// admin

app.get("/admin", (req, res) => {
    Booking.find({})
        .lean()
        .sort({ _id: -1 })
        .then(book => {
            res.render("admin", { book });
        });
});

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});