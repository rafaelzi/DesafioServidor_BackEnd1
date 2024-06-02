const produtosService = require('../services/produtosService');
const cache = require('../middlewares/cacheMiddleware').cache;// findAll()
const findAll = async (req, res) => {
  const chave = req.originalUrl;
  const dadosCache = cache.get(chave);

  if (dadosCache) {
    console.log(`Cache hit: ${chave}`);
    return res.status(200).json(dadosCache);
  } else {
    console.log(`Cache miss: ${chave}`);
    try {
      const produtos = await produtosService.findAll();
      cache.set(chave, produtos, 30); // Cache por 30 segundos
      console.log(`Dados recuperados do banco de dados para a URL: ${chave}`);
      return res.status(200).json(produtos);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
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
      const produto = await produtosService.findOne(id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      cache.set(chave, produto, 30); // Cache por 30 segundos
      console.log(`Dados recuperados do banco de dados para a URL: ${chave}`);
      return res.status(200).json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};

// save()
const save = async (request, response) => {
  const result = await produtosService.save(request.body)
  return result
    ? response.status(200).json({ message: 'Produto atualizado com sucesso' })
    : response.status(400).json({ '[ERROR/SERVER]': 'Falha ao salvar produto' })
}

// update()
const update = async (request, response) => {
  try {
    // Extrair o ID e os campos do produtos dos parâmetros da requisição
    const { id } = request.params
    const produtos = request.body // Aqui o objeto produtos contém apenas os campos que deseja atualizar

    // Chamar o serviço para atualizar o produtos
    const result = await produtosService.update(id, produtos)

    // Verificar se a atualização foi bem-sucedida
    if (result) {
      return response.status(200).json({ message: 'Produto atualizado com sucesso' })
    } else {
      return response.status(400).json({ error: 'Falha ao atualizar produto' })
    }
  } catch (error) {
    console.error('Erro ao atualizar produtos:', error)
    return response.status(500).json({ error: 'Erro interno do servidor' })
  }
}

// remove()
const remove = async (request, response) => {
  const { id } = request.params
  const result = await produtosService.remove(id)
  return result
    ? response.status(200).json({ message: 'Produto deletado' })
    : response.status(400).json({ '[ERROR/SERVER]': 'Falha ao remover produto' })
}

module.exports = {
  findAll,
  save,
  remove,
  update,
  findOne
}
