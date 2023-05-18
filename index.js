const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const { loginCheck } = require("./auth/passport");
loginCheck(passport);

// Mongo DB connection
const database = process.env.MONGOLAB_URI;
mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Connected to the Database successfully'))
.catch(err => console.log(err));

app.set('view engine', 'ejs');

//BodyParsing
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/login'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))