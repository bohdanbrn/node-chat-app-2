const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// DB config
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

// Mustache
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, '/views'));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/login'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is run on port ${PORT}!`);
})
