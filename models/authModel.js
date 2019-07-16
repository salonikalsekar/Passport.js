path = require('path')
const db = require('../db')
var bcrypt = require('bcryptjs');
const fs = require('fs')
module.exports = class Users {
    constructor(user) {
        this.userData = user;
    }
    static save(user) {
        return db.query('INSERT INTO Users (' + Object.keys(user) + ') VALUES (?,?,?);', [user.email, user.password, user.name]);
    };
    
    static fetchAll() {
        return db.execute('SELECT * FROM users')
    }
    static fetchByEmail(user) {
        console.log(user)
        return db.query('SELECT * FROM Users where email=?', [user]);
    }

    static fetchById(user) {
        return db.query('SELECT * FROM users where user_id=?', [user]);
    }
}