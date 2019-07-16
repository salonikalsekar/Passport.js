const express = require('express');
const User = require('../models/authModel');
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const router = express.Router();

router.post(
    '/signup',
    authController.signup
);

router.post('/login',
    function (req, res) {
        passport.authenticate('local', {
            session: false
        }, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info,
                    user: user
                });
            }
            req.login(user, {
                session: true
            }, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign({
                        userid: user.id,
                        email: user.email
                    },
                    'jwt_secret', {
                        expiresIn: '2h'
                    }
                );
                res.send({
                    token
                });
            });
        })(req, res);
    });

module.exports = router;