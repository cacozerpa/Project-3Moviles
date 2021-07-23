const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config({path:'../.env'});

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: 'POST, PUT, GET, DELETE, OPTIONS, PATCH',
  allowedHeaders: 'Accept, Content-Type, Accept-Encoding, Content-Length, Authorization',
}))

app.use(express.json());
app.use(cookieParser(process.env.SECRET || 'Just a Secret!'))
app.use(session({
  secret: process.env.SECRET || 'Not a Secret!',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', require('./utils/strategy'));

passport.serializeUser(function(user, done) {
  console.log('User logged: ' + user.id + ' ' + user.username);
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  console.log('User ID: ' + user.id);
  return done(null, user.id);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`App Running on port: ${PORT}`);
