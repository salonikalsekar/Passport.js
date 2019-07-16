
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const uuidv1 = require('uuid/v1');
  const User = require('../models/authModel');

  exports.signup = (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (password == confirmPassword) {
      bcrypt
        .hash(password, 12)
        .then(hashedPw => {
          const user = {
            email: req.body.email,
            password: hashedPw,
            name: req.body.name
          };
          return User.save(user);
        })
        .then(result => {
          res.status(201).json({
            message: 'User created!'
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        });
    } else {
      res.status(500).json({
        error: 'Passwords do not match'
      });
    }
  };
