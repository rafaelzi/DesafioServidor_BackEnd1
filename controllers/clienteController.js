const clienteService = require('../services/clienteService');
const cache = require('../middlewares/cacheMiddleware').cache;
// findAll()
const findAll = async (req, res) => {
  const chave = req.originalUrl;
  const dadosCache = cache.get(chave);

  if (dadosCache) {
    console.log(`Cache hit: ${chave}`);
    return res.status(200).json(dadosCache);
  } else {
    console.log(`Cache miss: ${chave}`);
    try {
      const clientes = await clienteService.findAll();
      cache.set(chave, clientes, 30); // Cache por 30 segundos
      console.log(`Dados recuperados do banco de dados para a URL: ${chave}`);
      return res.status(200).json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

// findOne()
const findOne = async (req, res) => {
  const { id } = req.params;
  const chave = req.originalUrl;
  const dadosCache = cache.get(chave);

  if (dadosCache) {
    console.log(`Cache hit: ${chave}`);
    return res.status(200).json(dadosCache);
  } else {
    console.log(`Cache miss: ${chave}`);
    try {
      const cliente = await clienteService.findOne(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      cache.set(chave, cliente, 30); // Cache por 30 segundos
      console.log(`Dados recuperados do banco de dados para a URL: ${chave}`);
      return res.status(200).json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};


// save()
const save = async (request, response) => {
  const result = await clienteService.save(request.body)
  return result
    ? response.status(200).json({ message: 'Cliente adicionado com sucesso' })
    : response.status(400).json({ '[ERROR/SERVER]': 'Falha ao salvar cliente' })
}

// update()
const update = async (request, response) => {
  try {
    // Extrair o ID e os campos do cliente dos parâmetros da requisição
    const { id } = request.params
    const cliente = request.body // Aqui o objeto cliente contém apenas os campos que deseja atualizar

    // Chamar o serviço para atualizar o cliente
    const result = await clienteService.update(id, cliente)

    // Verificar se a atualização foi bem-sucedida
    if (result) {
      return response.status(200).json({ message: 'Cliente atualizado com sucesso' })
    } else {
      return response.status(400).json({ error: 'Falha ao atualizar cliente' })
    }
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return response.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// remove()
const remove = async (request, response) => {
  const { id } = request.params
  const result = await clienteService.remove(id)
  return result
    ? response.status(200).json({ message: 'Cliente deletado' })
    : response.status(400).json({ '[ERROR/SERVER]': 'Falha ao remover cliente' })
}

module.exports = {
  findAll,
  save,
  remove,
  update,
  findOne
}
