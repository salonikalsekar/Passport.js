const mysql =  require('mysql2')

const pool = mysql.createPool({
    host: '',
    user: '',
    database: '',
    password: '',
    multipleStatements: true
})

module.exports = pool.promise();