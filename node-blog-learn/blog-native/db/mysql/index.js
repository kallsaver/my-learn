const mysql = require('mysql')

const { MYSQL_CONFIG } = require('../../config/index')

const connection = mysql.createConnection(MYSQL_CONFIG)

connection.connect()

function execSql(sql) {
  return new Promise((resolve) => {
    connection.query(sql, (err, res) => {
      if (err) {
        resolve([err, {}])
        return
      }
      resolve([null, res])
    })
  })
}

function parseInsertSql(table, params) {
  let sql = ''
  sql += `insert into ${table} (`
  const list = Object.keys(params)
  const length = list.length
  list.forEach((key, index) => {
    const cut = index !== length - 1 ? ', ' : ') value ('
    sql += `${key}${cut}`
  })

  list.forEach((key, index) => {
    const value = params[key]
    const cut = index !== length - 1 ? ', ' : ');'
    sql += `'${value}'${cut}`
  })
  return sql
}

function parseUpdateSql(table, params, whereSql) {
  let sql = ''
  sql += `update ${table} set `
  const list = Object.keys(params)
  const length = list.length
  list.forEach((key, index) => {
    const value = params[key]
    const cut = index !== length - 1 ? ', ' : ' '
    sql += `${key} = '${value}'${cut}`
  })
  sql += whereSql
  return sql
}

function parseDeleteSql(table, whereSql, key = 'state', value = 0) {
  const sql = `update ${table} set ${key} = '${value}' ${whereSql};`
  return sql
}

module.exports = {
  execSql,
  parseInsertSql,
  parseUpdateSql,
  parseDeleteSql
}
