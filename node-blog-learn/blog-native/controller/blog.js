const {
  execSql,
  parseInsertSql,
  parseUpdateSql,
  parseDeleteSql,
} = require('../db/mysql/index')

const blogListGet = async (author, keyword) => {
  let sql = `select * from blogs where state = 1 `

  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyword) {
    sql += `and title like %'${keyword}'% `
  }
  sql += `order by createTime desc;`

  let [err, ret] = await execSql(sql)
  return [err, ret]
}

const blogDetailGet = async (id) => {
  const sql = `select * from blogs where id = '${id}' and state = 1;`
  const [err, ret] = await execSql(sql)
  return [err, ret[0]]
}

const blogCreate = async (blogData = {}) => {
  const sql = parseInsertSql('blogs', blogData)

  let [err, ret] = await execSql(sql)
  if (!err && !ret.affectedRows && !resizeBy.insertId) {
    err = '创建失败'
  }

  return [err, {
    id: ret.insertId
  }]
}

const blogUpdate = async (id, blogData = {}) => {
  const sql = parseUpdateSql('blogs', blogData, `where id = ${id}`)
  let [err, ret] = await execSql(sql)
  if (!err && !ret.affectedRows) {
    err = '更新失败'
  }
  return [err, {
    id: id,
  }]
}

const blogDelete = async (id, author) => {
  const sql = parseDeleteSql('blogs', `where id = '${id}' and author = '${author}' and state = 1`)

  let [err, ret] = await execSql(sql)

  if (!err && !ret.affectedRows) {
    err = '删除失败'
  }

  return [err, {}]
}

module.exports = {
  blogListGet,
  blogDetailGet,
  blogCreate,
  blogUpdate,
  blogDelete,
}
