// findAll()
const connection = require('../configs/dbConfiguration')
const findAll = async () => {
  const produtos = await (await connection)
    .execute('SELECT * FROM produtos')
  return produtos[0]
}

// findOne()
const findOne = async (id) => {
  const query = 'SELECT * FROM produtos WHERE id = ?'
  const [rows] = await (await connection).execute(query, [id])
  if (rows.length === 0) {
    return null
  }
  return rows[0]
}

// update()
const update = async (id, produtos) => {
  let query = 'UPDATE produtos SET '
  const values = []
  const fields = Object.keys(produtos)
  fields.forEach((field, index) => {
    query += `${field} = ?`
    values.push(produtos[field])
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
const save = async (produtos) => {
  const query = 'INSERT INTO produtos(nome, descricao, data_atualizado, preco) VALUES (?, ?, ?, ?)'
  const isOk = await (await connection).execute(query,
    [produtos.nome, produtos.descricao, produtos.data_atualizado,
      produtos.preco])
  return isOk[0].affectedRows === 1
}

// remove()
const remove = async (id) => {
  const query = 'DELETE FROM produtos WHERE id = ?'
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
