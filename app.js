const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");

//routes
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); 
require('./authentication');

//headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    next()
  });

app.use('/', authRoutes);
app.use('/user', passport.authenticate('jwt', {session: false}), protectedRoutes);

app.listen(3000, console.log("Server running on 3000"))