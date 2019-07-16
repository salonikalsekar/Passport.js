const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/authModel');
const bcrypt = require('bcryptjs')
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

//passport JWT
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('bearer'),
    secretOrKey: 'jwt_secret'
  },
  function (jwtPayload, cb) {
    return User.fetchByEmail(jwtPayload.email)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      });
  }
));

//passport-local
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, cb) {
    return User.fetchByEmail(email).then(user => {
        if (user[0][0] != undefined) {
          bcrypt.compare(password, user[0][0].password).then(isEqual => {
            if (!isEqual) {
              return cb(null, false, {
                message: 'Incorrect password'
              });
            }
            else{
              return cb(null, user[0][0], {
                message: 'Logged In Successfully'
              });
            }
          })
        } else if (user[0][0] == undefined) {
          return cb(null, false, {
            message: 'Incorrect email'
          });
        }

      })
      .catch(err => cb(err));
  }

));