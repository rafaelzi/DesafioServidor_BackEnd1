// findAll()
const produtosService = require('../services/produtosService')
const findAll = async (request, response) => {
  const produtos = await produtosService.findAll()
  return response.status(200).json(produtos)
}

// findOne()
const findOne = async (request, response) => {
  try {
    // Extrair o ID dos parâmetros da requisição
    const { id } = request.params
        
    // Chamar o serviço para buscar o produtos pelo ID
    const produtos = await produtosService.findOne(id)
        
    // Se o produtos não foi encontrado, retornar um erro 404
    if (!produtos) {
      return response.status(404).json({ error: 'produto não encontrado' })
    }
        
    // Se o produtos foi encontrado, retornar o produtos
    return response.status(200).json(produtos)
  } catch (error) {
    // Em caso de erro, retornar um erro 500
    console.error('Erro ao buscar produtos:', error)
    return response.status(500).json({ error: 'Erro interno do servidor' })
  }
}

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
