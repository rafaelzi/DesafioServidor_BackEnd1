// findAll()
const connection = require('../configs/dbConfiguration')
const findAll = async () => {
  const clientes = await (await connection)
    .execute('SELECT * FROM clientes')
  return clientes[0]
}

// findOne()
const findOne = async (id) => {
  // Consulta SQL para buscar um cliente pelo ID
  const query = 'SELECT * FROM clientes WHERE id = ?'
  // Executar a consulta com o ID fornecido
  const [rows] = await (await connection).execute(query, [id])
  // Verificar se algum cliente foi encontrado
  if (rows.length === 0) {
    return null // Retorna null se nenhum cliente for encontrado
  }
  // Retorna o cliente encontrado
  return rows[0]
}

// update()
const update = async (id, cliente) => {
  let query = 'UPDATE clientes SET '
  const values = []
  const fields = Object.keys(cliente)
        
  fields.forEach((field, index) => {
    query += `${field} = ?`
    values.push(cliente[field])
    if (index < fields.length - 1) {
      query += ', '
    }
  })

  query += ' WHERE id = ?'
  values.push(id)

  const [result] = await (await connection).execute(query, values)
  return result.affectedRows === 1
}

// save()
const save = async (cliente) => {
  const query = 'INSERT INTO clientes(nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)'
  const isOk = await (await connection).execute(query,
    [cliente.nome, cliente.sobrenome, cliente.email,
      cliente.idade])
  return isOk[0].affectedRows === 1
}

// remove()
const remove = async (id) => {
  const query = 'DELETE FROM clientes WHERE id = ?'
  const isOk = await (await connection).execute(query, [id])
  return isOk[0].affectedRows === 1
}

module.exports = {
  findAll,
  save,
  remove,
  update,
  findOne
}
