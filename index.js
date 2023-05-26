const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

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
app.use(expressLayouts);

//BodyParsing
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/assets'));

//Routes
app.use('/', require('./routes/login'));
app.use('/home', require('./routes/home'));
app.use('/room', require('./routes/room'));
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))