const validateDescription = (request, response, next) => {
  const { body } = request

  // Verifique se o campo de descrição está presente no corpo da solicitação
  if (!body.descricao || body.descricao.trim() === '') {
    return response.status(400)
      .json({ message: 'O campo "descricao" é obrigatório' })
  }

  // Se o campo de descrição estiver presente e não estiver vazio, passe para o próximo middleware
  next()
}

module.exports = { validateDescription }
