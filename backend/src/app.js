const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const pgSession = require("connect-pg-simple")(session);


require('dotenv').config({path:'../.env'});

const UserRoutes = require('./routes/user');
const AuthRoutes = require('./routes/auth.user');
const LoginRoute = require('./routes/user.login');
const CommerceRoutes = require('./routes/commerce');
const AuthCommerceRoutes = require('./routes/auth.commerce');
const ProductRoutes = require('./routes/product');
const AuthProductRoutes = require('./routes/auth.product');
const AuthAdminRoute = require('./routes/auth.admin');
const AdminLoginRoute = require('./routes/admin.login');
const AuthPaymentRoute = require('./routes/auth.payment');
const CarRoute = require('./routes/car');

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
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 30*24*60*60*1000}
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', require('./utils/strategy'));

passport.serializeUser(function(user, done) {
  console.log('User logged: ' + user.id + ' ');
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  console.log('User ID: ' + user.id);
  return done(null, user.id);
})

app.use(UserRoutes);
app.use(AuthRoutes);
app.use(LoginRoute);
app.use(CommerceRoutes);
app.use(AuthCommerceRoutes);
app.use(ProductRoutes);
app.use(AuthProductRoutes);
app.use(AuthPaymentRoute);
app.use(CarRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`App Running on port: ${PORT}`);
