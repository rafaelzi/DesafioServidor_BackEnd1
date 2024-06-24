const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');

// Middlewares
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware');
const idadeMiddleware = require('../middlewares/idadeMiddleware');
const emailMiddleware = require('../middlewares/emailMiddleware');
const cacheMiddleware = require('../middlewares/cacheMiddleware');

/* GET clientes: busca todos os clientes */
router.get('/', authMiddleware, cacheMiddleware, clienteController.findAll);

/* GET clientes/:id: busca um cliente pelo ID */
router.get('/:id', authMiddleware, cacheMiddleware, clienteController.findOne);

/* POST clientes: adiciona um novo cliente */
router.post('/', authMiddleware, 
  nomeMiddleware.validateName,
  sobrenomeMiddleware.validateFamilyName,
  idadeMiddleware.validateAge,
  emailMiddleware.validateEmail,
  clienteController.save,
  cacheMiddleware
); 

/* PUT clientes: atualiza um cliente */
router.put('/:id', authMiddleware, cacheMiddleware, clienteController.update);

/* DELETE clientes: remove um cliente pelo ID */
router.delete('/:id', authMiddleware, cacheMiddleware, clienteController.remove);

module.exports = router;
