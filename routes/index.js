const express = require('express')

const router = express.Router()

router.get('/', function (req, res, next) {
  // Defina a variável title
  res.render('index', { title: 'Página Inicial' })
})

module.exports = router
