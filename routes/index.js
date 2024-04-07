const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise');
/* GET home page. */
router.get('/', function (req, res, next) {
 mysql.createConnection({host: 'localhost',user: 'root',password: '',
 database: 'backend-I-express-mysql-RafaelCabral',port: 3306
 }).then((connection) => {connection.query('SELECT * FROM clientes;')
 .then((result) => {res.send(result[0]);});
 });
});
module.exports = router;