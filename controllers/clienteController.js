//findAll()
const clienteService = require('../services/clienteService');
const findAll = async (request, response) => {
 const clientes = await clienteService.findAll();
 return response.status(200).json(clientes);
};
//findOne()
const findOne = async (request, response) => {
    try {
        // Extrair o ID dos parâmetros da requisição
        const { id } = request.params;
        
        // Chamar o serviço para buscar o cliente pelo ID
        const cliente = await clienteService.findOne(id);
        
        // Se o cliente não foi encontrado, retornar um erro 404
        if (!cliente) {
            return response.status(404).json({ error: 'Cliente não encontrado' });
        }
        
        // Se o cliente foi encontrado, retornar o cliente
        return response.status(200).json(cliente);
    } catch (error) {
        // Em caso de erro, retornar um erro 500
        console.error('Erro ao buscar cliente:', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};
//save()
const save = async (request, response) => {
    const result = await clienteService.save(request.body);
    return result ?
    response.status(200).json({ message: 'Cliente adicionado com sucesso' }) :
    response.status(400).json({ "[ERROR/SERVER]" : "Falha ao salvar cliente" });
};
//update()
const update = async (request, response) => {
    try {
        // Extrair o ID e os campos do cliente dos parâmetros da requisição
        const { id } = request.params;
        const cliente = request.body; // Aqui o objeto cliente contém apenas os campos que deseja atualizar

        // Chamar o serviço para atualizar o cliente
        const result = await clienteService.update(id, cliente);

        // Verificar se a atualização foi bem-sucedida
        if (result) {
            return response.status(200).json({ message: 'Cliente atualizado com sucesso' });
        } else {
            return response.status(400).json({ error: 'Falha ao atualizar cliente' });
        }
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }
};
//remove()
const remove = async (request, response) => {
    const { id } = request.params;
    const result = await clienteService.remove(id);
    return result ?
    response.status(200).json({ message: 'Cliente deletado'}) :
    response.status(400).json({ "[ERROR/SERVER]": "Falha ao remover cliente" });
};
module.exports = {
    findAll,
    save,
    remove,
    update,
    findOne
};
   
      