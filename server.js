const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

// keys
const { mongoURI } = require("./config/keys");

// // models
// require("./models/Booking");

// // schema
// const Booking = mongoose.model("booking");

// use public
app.use(express.static(path.join(__dirname, "public")));
// handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to DB

// mongoose
//     .connect(mongoURI, { useUnifiedTopology: "true", useNewUrlParser: "true" })
//     .then(() => {
//         console.log("MongoDB connected");
//     })
//     .catch(err => console.log(`mongoDB not connected because ${err.name}`));

const port = 4000;

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/book", (req, res) => {
    res.render("booking");
});
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
        })
        .catch(err => {
            console.log(err.name);
        });
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});